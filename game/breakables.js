// ===== PARTIR COISAS — blocos que se partem + objetivo que tranca a porta =====
//
// Cada nível pode ter `breakables: [{kind, x, y, goal?}]` (ver data-levels.js).
// Os blocos pairam um pouco acima de uma plataforma e partem-se de 3 maneiras:
//   1) CABEÇADA — saltar por baixo do bloco;
//   2) PISÃO     — estar em cima do bloco e carregar em ↓ (agachar);
//   3) FORÇA     — com o cravo dourado ou o punho cerrado ativos, basta tocar-lhe.
// Os tipos «barricada», «grade» e «muro» aguentam 2 pancadas (racham à 1.ª).
// Os blocos com `goal:true` formam o OBJETIVO do nível: a porta fica trancada até todos
// serem partidos (aparece «🔒 Faltam N…» ao chegar à porta e um contador no ecrã).
//
// Não mexe no motor de física: usa um grupo estático próprio + um collider com o jogador.
// Os restantes níveis (sem `breakables`) ficam exatamente como estavam.

import { beep, ensureAudio, SFX } from "../audio.js?v=20261110v7";
import { showFloat } from "./feedback.js?v=20261110v7";
import {
  awaitingQuiz, door, inSecretRoom, isCrouching, itemsGroup, player, powered,
  score, scoreText, set__hudDirty, set_score, starPower
} from "./state.js?v=20261110v7";

// Tipos: vida (nº de pancadas), pontos, textos e cores dos estilhaços.
export const BREAK_KINDS = {
  caixa:     { hp: 1, pts: 15, label: "caixas",        emoji: "📦", msg: "📦 Caixa partida!",         bits: [0xd9a05a, 0x8a5420, 0x5a3412] },
  carimbo:   { hp: 1, pts: 25, label: "carimbos",      emoji: "🟥", msg: "🟥 Carimbo partido!",       bits: [0xee4a46, 0xb01d22, 0xffffff] },
  escuta:    { hp: 1, pts: 25, label: "escutas",       emoji: "🎙️", msg: "🎙️ Escuta destruída!",     bits: [0x8a95a6, 0x4e5868, 0x12161d] },
  interf:    { hp: 1, pts: 25, label: "interferências", emoji: "📡", msg: "📡 Interferência eliminada!", bits: [0x3b4660, 0xffe14a, 0x9fc0ff] },
  barricada: { hp: 2, pts: 35, label: "barricadas",    emoji: "🚧", msg: "🚧 Barricada derrubada!",   bits: [0xcdb583, 0x9a8250, 0x4a4a52] },
  grade:     { hp: 2, pts: 35, label: "grades",        emoji: "⛓️", msg: "🔓 Preso libertado!",       bits: [0xc3cad6, 0x59606c, 0xf2d36a] },
  muro:      { hp: 2, pts: 35, label: "muros",         emoji: "🧱", msg: "🧱 Muro do esquecimento caiu!", bits: [0xc9743a, 0x8f4620, 0x3a1a08] }
};

let group = null;            // grupo estático com os blocos do nível atual
let hitCollider = null;      // collider jogador↔blocos (removido ao sair do nível)
let goal = null;             // { total, broken, label, emoji } — null se o nível não tem objetivo
let hud = null;              // texto do contador (fixo no ecrã)
let lockMsgAt = 0;           // limita a mensagem «porta trancada» (não repetir a cada frame)
let hiddenInRoom = false;    // blocos escondidos enquanto o jogador está numa sala secreta

function kindInfo(k) { return BREAK_KINDS[k] || BREAK_KINDS.caixa; }

function hudAlive() { return !!(hud && hud.scene && hud.active); }

function refreshHud(scene) {
  if (!hudAlive()) return;
  if (!goal) { hud.setText(""); return; }
  const done = goal.broken >= goal.total;
  hud.setText(done ? `🔓 ${goal.emoji} ${goal.label}: ${goal.broken}/${goal.total} — a porta abriu!`
                   : `🔒 ${goal.emoji} ${goal.label}: ${goal.broken}/${goal.total}`);
  hud.setColor(done ? "#9dff9d" : "#ffd36a");
}

/** Chamado por loadLevel() em cada nível (e ao reiniciar). */
export function spawnBreakables(scene, L) {
  clearBreakables();
  const list = (L && L.breakables) || [];
  if (!list.length) return;

  group = scene.physics.add.staticGroup();
  const goalKinds = new Set();
  let total = 0, customLabel = null;
  list.forEach((b, i) => {
    const info = kindInfo(b.kind);
    const s = group.create(b.x, b.y, "brk_" + (BREAK_KINDS[b.kind] ? b.kind : "caixa"));
    s.setDepth(3);
    s.refreshBody();
    s.setData("kind", b.kind); s.setData("hp", info.hp); s.setData("goal", !!b.goal);
    s.setData("lastHit", 0);
    // Pequeno brilho a «pedir» para ser partido
    scene.tweens.add({ targets: s, scaleX: { from: 1, to: 1.04 }, scaleY: { from: 1, to: 1.04 }, duration: 900 + (i % 3) * 120, yoyo: true, repeat: -1, ease: "Sine.easeInOut" });
    if (b.goal) { total++; goalKinds.add(b.kind); if (b.goalLabel) customLabel = b.goalLabel; }
  });
  hitCollider = scene.physics.add.collider(player, group, onTouch, null, scene);

  if (total > 0) {
    const k = kindInfo([...goalKinds][0]);
    goal = { total, broken: 0, label: customLabel || k.label, emoji: k.emoji };
    if (!hudAlive()) {
      hud = scene.add.text(14, 108, "", { fontSize: "13px", fontStyle: "800", color: "#ffd36a", stroke: "#07210f", strokeThickness: 3 })
        .setScrollFactor(0).setDepth(100);
    }
    refreshHud(scene);
    lockDoor(true);
  } else if (hudAlive()) { hud.setText(""); }
}

/** Limpa tudo (mudança de nível, arena de boss, recomeçar). */
export function clearBreakables() {
  try { if (hitCollider) hitCollider.destroy(); } catch {}
  hitCollider = null;
  try { if (group) group.clear(true, true); } catch {}
  try { if (group) group.destroy(true); } catch {}
  group = null; goal = null; hiddenInRoom = false;
  try { if (hudAlive()) hud.setText(""); } catch {}
}

function lockDoor(locked) {
  try {
    if (!door || !door.active) return;
    if (locked) door.setTint(0x6c7a70); else door.clearTint();
  } catch {}
}

/** A porta pode abrir? Se houver objetivo por cumprir, avisa e devolve false. */
export function canOpenDoor(scene) {
  if (!goal || goal.broken >= goal.total) return true;
  const now = scene.time.now;
  if (now - lockMsgAt > 1800) {
    lockMsgAt = now;
    const left = goal.total - goal.broken;
    showFloat(scene, door ? door.x : player.x, (door ? door.y : player.y) - 84,
      `🔒 Faltam ${left} ${goal.label}!`, "#ff9a9a");
    try { ensureAudio(); beep({ freq: 220, dur: 0.12, type: "square", vol: 0.05, slideTo: 170 }); } catch {}
  }
  return false;
}

function onTouch(p, b) {
  if (!b.active || awaitingQuiz) return;
  const body = p.body;
  const head = body.touching.up || body.blocked.up;                 // cabeçada
  const stomp = body.touching.down && isCrouching;                  // pisão: em cima + ↓
  const power = starPower || powered;                               // cravo dourado / punho
  const side = power && (body.touching.left || body.touching.right || body.touching.down);
  if (!(head || stomp || side)) return;
  const now = sceneNow(p.scene);
  if (now - (b.getData("lastHit") || 0) < 280) return;              // 1 pancada de cada vez
  b.setData("lastHit", now);
  hit(p.scene, b);
}

function sceneNow(scene) { return scene.time.now; }

function hit(scene, b) {
  const info = kindInfo(b.getData("kind"));
  let hp = (b.getData("hp") || 1) - 1;
  b.setData("hp", hp);
  ensureAudio();
  if (hp > 0) {
    // 1.ª pancada: racha, treme e solta uns estilhaços
    const crKey = "brk_" + b.getData("kind") + "_cr";
    if (scene.textures.exists(crKey)) b.setTexture(crKey);
    scene.tweens.add({ targets: b, x: b.x + 4, duration: 40, yoyo: true, repeat: 3 });
    debris(scene, b.x, b.y, info.bits, 5);
    beep({ freq: 200, dur: 0.07, type: "sawtooth", vol: 0.06, slideTo: 120 });
    showFloat(scene, b.x, b.y - 34, "💥 Rachou!", "#ffb347");
    return;
  }
  // Partiu
  debris(scene, b.x, b.y, info.bits, 12);
  beep({ freq: 170, dur: 0.09, type: "sawtooth", vol: 0.07, slideTo: 70 });
  setTimeout(() => beep({ freq: 420, dur: 0.08, type: "square", vol: 0.05, slideTo: 880 }), 70);
  const wasGoal = !!b.getData("goal"), kind = b.getData("kind"), bx = b.x, by = b.y;
  try { b.destroy(); } catch {}
  set_score(score + info.pts); scoreText.setText(`🌟 Pontos: ${score}`); set__hudDirty(true);
  showFloat(scene, bx, by - 30, info.msg, "#ffd36a");
  if (kind === "grade") freePrisoner(scene, bx, by);
  if (wasGoal && goal) {
    goal.broken++;
    refreshHud(scene);
    if (goal.broken >= goal.total) {
      lockDoor(false);
      try { SFX.doorOpen(); } catch {}
      showFloat(scene, player.x, player.y - 100, "🔓 A porta abriu!", "#9dff9d");
    }
  }
}

// Estilhaços: pequenos retângulos que saltam e caem
function debris(scene, x, y, colors, n) {
  for (let i = 0; i < n; i++) {
    const c = colors[i % colors.length];
    const w = 5 + Math.random() * 7, h = 4 + Math.random() * 6;
    const r = scene.add.rectangle(x + (Math.random() - 0.5) * 26, y + (Math.random() - 0.5) * 26, w, h, c).setDepth(50);
    r.setStrokeStyle(1, 0x2a1500, 0.7);
    scene.tweens.add({
      targets: r,
      x: r.x + (Math.random() - 0.5) * 120,
      y: { value: r.y + 60 + Math.random() * 60, ease: "Quad.easeIn" },
      angle: (Math.random() - 0.5) * 540,
      alpha: 0,
      duration: 480 + Math.random() * 260,
      onComplete: () => r.destroy()
    });
  }
}

// Um preso que sai da cela e agradece (só decorativo + pontos já dados)
function freePrisoner(scene, x, y) {
  const t = scene.add.text(x, y + 6, "🧑", { fontSize: "30px" }).setOrigin(0.5).setDepth(60);
  scene.tweens.add({ targets: t, y: y - 70, alpha: { from: 1, to: 0 }, duration: 1300, ease: "Sine.easeOut", onComplete: () => t.destroy() });
  const h = scene.add.text(x, y - 40, "Liberdade!", { fontSize: "16px", fontStyle: "900", color: "#fff", stroke: "#0a5a2a", strokeThickness: 4 }).setOrigin(0.5).setDepth(61);
  scene.tweens.add({ targets: h, y: y - 100, alpha: 0, duration: 1300, onComplete: () => h.destroy() });
}

/** Por frame: esconde os blocos enquanto o jogador está numa sala secreta. */
export function updateBreakables() {
  if (!group) return;
  if (inSecretRoom !== hiddenInRoom) {
    hiddenInRoom = inSecretRoom;
    group.getChildren().forEach(s => {
      s.setVisible(!hiddenInRoom);
      if (s.body) s.body.enable = !hiddenInRoom;
    });
  }
}

/** Estado para testes/depuração. */
export function breakablesState() {
  return { count: group ? group.countActive(true) : 0, goal: goal ? { ...goal } : null };
}

/** Só para testes automáticos: cumpre o objetivo do nível (parte tudo o que tranca a porta). */
export function forceCompleteGoal() {
  if (!goal) return false;
  if (group) group.getChildren().filter(b => b.getData("goal")).forEach(b => { try { b.destroy(); } catch {} });
  goal.broken = goal.total;
  refreshHud(null);
  lockDoor(false);
  return true;
}
