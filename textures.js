// ===== Geração de texturas Phaser/canvas — VanBerto's · A Revolução dos Cravos =====
// Extraído de abril.js. Ficheiro 100% autocontido: cada função só
// depende do parâmetro `scene` (instância Phaser) e de constantes locais.
// Não lê nem escreve nenhum estado partilhado do jogo (score, player, etc.).
// Só makeTextures() e makePlatformTextureThemed() são chamadas a partir de
// abril.js — as restantes (makePlatformTexture, makeDoorTexture,
// makeVilaosTextures, makeBossTextures, makeSparkTexture, makeItemTextures,
// makeVanBertoTexture, rrPath, rrVan, cVan, cfVan, lVan) são de uso interno
// deste módulo, por isso não são exportadas.

// ===== TEXTURAS =====

function rrPath(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y);
  ctx.lineTo(x+w-r,y); ctx.arcTo(x+w,y,x+w,y+r,r);
  ctx.lineTo(x+w,y+h-r); ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
  ctx.lineTo(x+r,y+h); ctx.arcTo(x,y+h,x,y+h-r,r);
  ctx.lineTo(x,y+r); ctx.arcTo(x,y,x+r,y,r);
  ctx.closePath();
}
export function makeTextures(scene){
  makePlatformTexture(scene);
  makeDoorTexture(scene);
  makeVilaosTextures(scene);
  makeBossTextures(scene);
  makeSparkTexture(scene);
  makeItemTextures(scene);
  makeVanBertoTexture(scene,"vanberto_open",false,-1);
  makeVanBertoTexture(scene,"vanberto_blink",true,-1);
  makeVanBertoTexture(scene,"vanberto_wink","wink",-1);
  makeVanBertoTexture(scene,"vanberto_happy","happy",-1);
  makeVanBertoTexture(scene,"vanberto_sad","sad",-1);
  makeVanBertoTexture(scene,"vanberto_walk1",false,0);
  makeVanBertoTexture(scene,"vanberto_walk2",false,1);
  makeVanBertoTexture(scene,"vanberto_jump",false,-1,true);
}

// Plataforma colorida estilo cartoon
function makePlatformTexture(scene){
  if(scene.textures.exists("platform_grass")) return;
  makePlatformTextureThemed(scene,"platform_grass",0);
}

// Cano à Mario (pedido: "atalhos ou áreas secretas") — rebordo largo em
// cima + corpo mais estreito a descer, em verde, ao estilo clássico.
export function makePipeTexture(scene){
  if (scene.textures.exists("pipe_mario")) return;
  const RIMW=76, RIMH=20, BODYW=64, BODYH=44;
  const totalW=RIMW, totalH=RIMH+BODYH;
  const bx=(RIMW-BODYW)/2;
  const g=scene.make.graphics({x:0,y:0,add:false});
  // corpo
  g.fillStyle(0x0d5c1e,1); g.fillRect(bx,RIMH,BODYW,BODYH);
  g.fillStyle(0x1e8c34,1); g.fillRect(bx+7,RIMH,BODYW-14,BODYH);
  g.fillStyle(0x5cd873,0.55); g.fillRect(bx+10,RIMH+3,7,BODYH-6);
  // rebordo (mais largo, dá o aspeto de "boca" do cano)
  g.fillStyle(0x0d5c1e,1); g.fillRoundedRect(0,0,RIMW,RIMH+8,6);
  g.fillStyle(0x1e8c34,1); g.fillRoundedRect(4,3,RIMW-8,RIMH,5);
  g.fillStyle(0x5cd873,0.6); g.fillRoundedRect(8,4,RIMW-16,5,3);
  // contornos
  g.lineStyle(3,0x063610,1);
  g.strokeRoundedRect(0,0,RIMW,RIMH+8,6);
  g.strokeRect(bx,RIMH,BODYW,BODYH);
  g.generateTexture("pipe_mario",totalW,totalH); g.destroy();
}

// Gera uma textura de plataforma para cada tema
const PLAT_COLORS=[
  [0x0d3878,0x1e5cb8,0x6aa8ff], // tema0 azul rico
  [0x6a1800,0xc04018,0xff8850], // tema1 crepúsculo
  [0x004858,0x0090a0,0x60e8f0], // tema2 aqua profundo
  [0x780840,0xc03070,0xffa0c8], // tema3 rosa
  [0x200060,0x4810a0,0xc080ff], // tema4 lilás noturno
  [0x003a3a,0x008888,0x40e8e0], // tema5 turquesa
  [0x6a1800,0xb84010,0xff9050], // tema6 laranja quente
  [0x001040,0x0848a0,0x60b8f8], // tema7 azul noturno
  [0x580020,0xa01060,0xff80b8], // tema8 magenta rico
  [0x081808,0x185c28,0x70d870], // tema9 floresta
  [0x7a4a00,0xd9921a,0xffd86a], // tema10 final dourado
];
export function makePlatformTextureThemed(scene, key, themeIdx){
  if(scene.textures.exists(key)) return;
  // Plataforma «relva sobre tijolo», a condizer com a arte dos mundos.
  // Tem de aguentar ser esticada na horizontal (até 12x), por isso só tem faixas horizontais.
  // Níveis com fundo noturno (9, 10 e 11) ficam mais escuros.
  const night = (themeIdx===8 || themeIdx===9 || themeIdx===10);
  const tex=scene.textures.createCanvas(key,100,32), ctx=tex.getContext();
  ctx.clearRect(0,0,100,32);
  // sombra
  ctx.fillStyle="rgba(0,0,0,0.38)"; rrPath(ctx,3,25,95,7,3.5); ctx.fill();
  // tijolo (corpo)
  const b=ctx.createLinearGradient(0,8,0,25);
  b.addColorStop(0,"#d98a4c"); b.addColorStop(0.55,"#bf6a33"); b.addColorStop(1,"#8f4a22");
  ctx.fillStyle=b; rrPath(ctx,0,7,100,18,4); ctx.fill();
  ctx.fillStyle="rgba(60,25,8,0.38)";
  ctx.fillRect(0,14,100,1.6); ctx.fillRect(0,20,100,1.6);
  ctx.fillStyle="rgba(255,210,150,0.22)"; ctx.fillRect(0,9,100,1.4);
  // relva
  const g=ctx.createLinearGradient(0,0,0,13);
  g.addColorStop(0,"#8be04a"); g.addColorStop(0.6,"#55b82c"); g.addColorStop(1,"#3a8c20");
  ctx.fillStyle=g; rrPath(ctx,0,0,100,11,4); ctx.fill();
  // franja de relva (tufos)
  ctx.fillStyle="#3f9a24";
  for(let x=1;x<100;x+=5){ ctx.beginPath(); ctx.moveTo(x,9); ctx.lineTo(x+2.5,15); ctx.lineTo(x+5,9); ctx.closePath(); ctx.fill(); }
  ctx.fillStyle="rgba(255,255,255,0.30)"; ctx.fillRect(3,1,94,1.8);
  // contorno
  ctx.strokeStyle="rgba(40,22,8,0.85)"; ctx.lineWidth=2; rrPath(ctx,1,1,98,23,5); ctx.stroke();
  if(night){ ctx.fillStyle="rgba(10,20,60,0.38)"; rrPath(ctx,0,0,100,25,5); ctx.fill(); }
  tex.refresh();
}

function makeDoorTexture(scene){
  if(scene.textures.exists("door_party")) return;
  // Porta do quartel — arco de pedra, folhas verde e vermelha (as cores da bandeira)
  // e um cravo vermelho por cima. Mesmas dimensões e mesma chave de sempre.
  const w=88, h=104, tex=scene.textures.createCanvas("door_party",w,h), ctx=tex.getContext();
  ctx.clearRect(0,0,w,h);
  // brilho
  const halo=ctx.createRadialGradient(44,60,6,44,60,46);
  halo.addColorStop(0,"rgba(255,230,140,0.55)"); halo.addColorStop(1,"rgba(255,230,140,0)");
  ctx.fillStyle=halo; ctx.fillRect(0,0,w,h);
  // moldura de pedra em arco
  const st=ctx.createLinearGradient(0,0,w,0);
  st.addColorStop(0,"#d9c9a6"); st.addColorStop(0.5,"#f1e5c8"); st.addColorStop(1,"#c9b88f");
  ctx.fillStyle=st;
  ctx.beginPath(); ctx.moveTo(8,h-3); ctx.lineTo(8,40); ctx.arc(44,40,36,Math.PI,0); ctx.lineTo(80,h-3); ctx.closePath(); ctx.fill();
  ctx.strokeStyle="#6e5a36"; ctx.lineWidth=2.5; ctx.stroke();
  // vão da porta
  ctx.fillStyle="#2a1a0c";
  ctx.beginPath(); ctx.moveTo(15,h-3); ctx.lineTo(15,42); ctx.arc(44,42,29,Math.PI,0); ctx.lineTo(73,h-3); ctx.closePath(); ctx.fill();
  // folha esquerda (verde) e direita (vermelha)
  ctx.save(); ctx.beginPath(); ctx.moveTo(17,h-4); ctx.lineTo(17,43); ctx.arc(44,43,27,Math.PI,Math.PI*1.5); ctx.lineTo(43,h-4); ctx.closePath(); ctx.clip();
  const gl=ctx.createLinearGradient(17,0,43,0); gl.addColorStop(0,"#1c7a3a"); gl.addColorStop(1,"#2fa04f"); ctx.fillStyle=gl; ctx.fillRect(10,10,40,100); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.moveTo(45,h-4); ctx.lineTo(45,16); ctx.arc(44,43,27,Math.PI*1.5,0); ctx.lineTo(71,h-4); ctx.closePath(); ctx.clip();
  const gr=ctx.createLinearGradient(45,0,71,0); gr.addColorStop(0,"#e0322c"); gr.addColorStop(1,"#b61e1c"); ctx.fillStyle=gr; ctx.fillRect(44,10,40,100); ctx.restore();
  // tábuas e pregos
  ctx.strokeStyle="rgba(0,0,0,0.28)"; ctx.lineWidth=1.4;
  for(const x of [26,35,53,62]){ ctx.beginPath(); ctx.moveTo(x,24+Math.abs(44-x)*0.25); ctx.lineTo(x,h-4); ctx.stroke(); }
  ctx.fillStyle="#f2d36a";
  for(const [x,y] of [[24,50],[24,78],[64,50],[64,78]]){ ctx.beginPath(); ctx.arc(x,y,1.8,0,Math.PI*2); ctx.fill(); }
  // esfera armilar simplificada ao centro
  ctx.strokeStyle="#f2d36a"; ctx.lineWidth=2.6; ctx.beginPath(); ctx.arc(44,66,10,0,Math.PI*2); ctx.stroke();
  ctx.lineWidth=1.6; ctx.beginPath(); ctx.ellipse(44,66,10,4,0,0,Math.PI*2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(44,56); ctx.lineTo(44,76); ctx.stroke();
  // fecho da porta
  ctx.fillStyle="#f2d36a"; ctx.beginPath(); ctx.arc(38,84,2.4,0,Math.PI*2); ctx.arc(50,84,2.4,0,Math.PI*2); ctx.fill();
  // cravo no fecho do arco
  drawCarnation(ctx,44,9,9,{hi:"#ff6a7a",lo:"#d9102a",stroke:"#7a0014"},true);
  // luzinhas de festa
  ctx.fillStyle="rgba(255,240,170,0.9)";
  for(const [x,y,r] of [[10,22,2],[78,24,2.2],[6,52,1.6],[82,56,1.8]]){ ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill(); }
  tex.refresh();
}

// Cravo desenhado em canvas: pétalas franjadas em duas voltas + miolo. Usado nos itens, na porta e no VanBerto's.
function drawCarnation(ctx,cx,cy,r,col,calyx){
  ctx.save();
  if(calyx){
    ctx.fillStyle="#2d8a40"; ctx.strokeStyle="#175a28"; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(cx-r*0.45,cy+r*0.55); ctx.lineTo(cx+r*0.45,cy+r*0.55); ctx.lineTo(cx+r*0.28,cy+r*1.25); ctx.lineTo(cx-r*0.28,cy+r*1.25); ctx.closePath(); ctx.fill(); ctx.stroke();
  }
  const ring=(n,rad,pet,fill,lw)=>{
    for(let i=0;i<n;i++){
      const a=(i/n)*Math.PI*2+rad*0.01;
      const px=cx+Math.cos(a)*rad, py=cy+Math.sin(a)*rad*0.9;
      ctx.beginPath(); ctx.ellipse(px,py,pet,pet*0.85,a,0,Math.PI*2);
      ctx.fillStyle=fill; ctx.fill(); ctx.strokeStyle=col.stroke; ctx.lineWidth=lw; ctx.stroke();
    }
  };
  ring(10,r*0.62,r*0.42,col.lo,0.9);
  ring(8,r*0.42,r*0.36,col.hi,0.7);
  // franjas (recortes no rebordo)
  ctx.strokeStyle=col.stroke; ctx.lineWidth=0.8;
  for(let i=0;i<14;i++){ const a=(i/14)*Math.PI*2; ctx.beginPath(); ctx.moveTo(cx+Math.cos(a)*r*0.82,cy+Math.sin(a)*r*0.74); ctx.lineTo(cx+Math.cos(a)*r*1.02,cy+Math.sin(a)*r*0.92); ctx.stroke(); }
  const core=ctx.createRadialGradient(cx-r*0.1,cy-r*0.1,0.5,cx,cy,r*0.4);
  core.addColorStop(0,col.hi); core.addColorStop(1,col.lo);
  ctx.fillStyle=core; ctx.beginPath(); ctx.arc(cx,cy,r*0.34,0,Math.PI*2); ctx.fill();
  ctx.fillStyle="rgba(255,255,255,0.35)"; ctx.beginPath(); ctx.ellipse(cx-r*0.2,cy-r*0.22,r*0.16,r*0.1,-0.6,0,Math.PI*2); ctx.fill();
  ctx.restore();
}

// Vilões — três «censores» com personalidade própria (64×64, mesmas chaves de sempre):
//  vilao_round → o Carimbo (vermelho, lento)         vilao_spike → o Lápis Azul (azul, saltitão)
//  vilao_bug   → o Informador (verde, persegue-te)
function makeVilaosTextures(scene){
  function angryEyes(ctx,cx,cy,gap,col){
    ctx.lineCap="round";
    ctx.strokeStyle="#111"; ctx.lineWidth=3;
    ctx.beginPath(); ctx.moveTo(cx-gap-6,cy-9); ctx.lineTo(cx-gap+5,cy-4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx+gap+6,cy-9); ctx.lineTo(cx+gap-5,cy-4); ctx.stroke();
    for(const sx of [-1,1]){
      ctx.fillStyle="#fff"; ctx.beginPath(); ctx.ellipse(cx+sx*gap,cy,5.4,6.4,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle=col; ctx.beginPath(); ctx.ellipse(cx+sx*gap,cy+1,3.3,4.3,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="#000"; ctx.beginPath(); ctx.ellipse(cx+sx*gap,cy+1.6,1.7,2.3,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="rgba(255,255,255,0.8)"; ctx.beginPath(); ctx.arc(cx+sx*gap-1,cy-0.8,1.2,0,Math.PI*2); ctx.fill();
    }
  }
  function grimace(ctx,cx,cy,w){
    ctx.fillStyle="#1a0000"; ctx.beginPath(); ctx.moveTo(cx-w,cy); ctx.quadraticCurveTo(cx,cy+w*0.9,cx+w,cy); ctx.closePath(); ctx.fill();
    ctx.fillStyle="#fffbe8";
    for(let i=-1;i<=1;i++){ ctx.fillRect(cx+i*w*0.55-2,cy,4,4); }
  }

  // ── Carimbo: selo redondo vermelho com um X de «CENSURADO» ──
  if(!scene.textures.exists("vilao_round")){
    const tex=scene.textures.createCanvas("vilao_round",64,64), ctx=tex.getContext();
    ctx.fillStyle="rgba(0,0,0,0.28)"; ctx.beginPath(); ctx.ellipse(32,58,20,5,0,0,Math.PI*2); ctx.fill();
    // cabo do carimbo
    ctx.fillStyle="#7a4a24"; rrPath(ctx,27,3,10,10,4); ctx.fill(); ctx.strokeStyle="#3b2210"; ctx.lineWidth=1.6; ctx.stroke();
    const g=ctx.createRadialGradient(26,26,3,32,34,28);
    g.addColorStop(0,"#ff6a5a"); g.addColorStop(0.6,"#d9262a"); g.addColorStop(1,"#8f0f18");
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(32,35,23,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle="#4a0408"; ctx.lineWidth=2.5; ctx.stroke();
    ctx.strokeStyle="rgba(255,255,255,0.35)"; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(32,35,19,Math.PI*0.9,Math.PI*1.6); ctx.stroke();
    // X de censura por trás da cara
    ctx.strokeStyle="rgba(60,0,6,0.35)"; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(18,22); ctx.lineTo(46,50); ctx.moveTo(46,22); ctx.lineTo(18,50); ctx.stroke();
    angryEyes(ctx,32,31,7.5,"#ffd23a"); grimace(ctx,32,43,7);
    tex.refresh();
  }

  // ── Lápis Azul: lápis em pé, com a ponta afiada para baixo ──
  if(!scene.textures.exists("vilao_spike")){
    const tex=scene.textures.createCanvas("vilao_spike",64,64), ctx=tex.getContext();
    ctx.fillStyle="rgba(0,0,0,0.26)"; ctx.beginPath(); ctx.ellipse(32,60,14,3.5,0,0,Math.PI*2); ctx.fill();
    // borracha + virola
    ctx.fillStyle="#ff8fb0"; rrPath(ctx,19,2,26,8,4); ctx.fill(); ctx.strokeStyle="#7a2a44"; ctx.lineWidth=1.6; ctx.stroke();
    const vg=ctx.createLinearGradient(19,0,45,0); vg.addColorStop(0,"#9aa4b2"); vg.addColorStop(0.5,"#eef1f6"); vg.addColorStop(1,"#8892a0");
    ctx.fillStyle=vg; ctx.fillRect(19,9,26,7); ctx.strokeStyle="#4a5260"; ctx.lineWidth=1.4; ctx.strokeRect(19,9,26,7);
    // corpo azul
    const bg=ctx.createLinearGradient(19,0,45,0); bg.addColorStop(0,"#2a5fd0"); bg.addColorStop(0.5,"#5a9bff"); bg.addColorStop(1,"#1d45a0");
    ctx.fillStyle=bg; ctx.fillRect(19,16,26,30); ctx.strokeStyle="#0f2a6a"; ctx.lineWidth=2; ctx.strokeRect(19,16,26,30);
    ctx.strokeStyle="rgba(255,255,255,0.22)"; ctx.lineWidth=1.4;
    for(const x of [26,32,38]){ ctx.beginPath(); ctx.moveTo(x,17); ctx.lineTo(x,45); ctx.stroke(); }
    // madeira e grafite (espinho)
    ctx.fillStyle="#efc890"; ctx.beginPath(); ctx.moveTo(19,46); ctx.lineTo(45,46); ctx.lineTo(32,60); ctx.closePath(); ctx.fill();
    ctx.strokeStyle="#7a5530"; ctx.lineWidth=1.8; ctx.stroke();
    ctx.fillStyle="#333a48"; ctx.beginPath(); ctx.moveTo(28.5,55); ctx.lineTo(35.5,55); ctx.lineTo(32,61); ctx.closePath(); ctx.fill();
    angryEyes(ctx,32,28,5.6,"#9be0ff"); grimace(ctx,32,38,4.6);
    tex.refresh();
  }

  // ── Informador: figura de gabardine e chapéu, sempre a espreitar ──
  if(!scene.textures.exists("vilao_bug")){
    const tex=scene.textures.createCanvas("vilao_bug",64,64), ctx=tex.getContext();
    ctx.fillStyle="rgba(0,0,0,0.28)"; ctx.beginPath(); ctx.ellipse(32,60,19,4.5,0,0,Math.PI*2); ctx.fill();
    // gabardine
    const cg=ctx.createLinearGradient(14,0,50,0); cg.addColorStop(0,"#3f5a3a"); cg.addColorStop(0.5,"#5f8a55"); cg.addColorStop(1,"#35502f");
    ctx.fillStyle=cg; ctx.beginPath(); ctx.moveTo(18,30); ctx.lineTo(46,30); ctx.lineTo(54,58); ctx.lineTo(10,58); ctx.closePath(); ctx.fill();
    ctx.strokeStyle="#1c3318"; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle="#2a4025"; ctx.fillRect(30,32,4,26);  // abertura frontal
    ctx.fillStyle="#d8c8a0"; ctx.fillRect(14,46,36,3);  // cinto
    // gola subida
    ctx.fillStyle="#4a7040"; ctx.beginPath(); ctx.moveTo(18,30); ctx.lineTo(24,22); ctx.lineTo(30,32); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(46,30); ctx.lineTo(40,22); ctx.lineTo(34,32); ctx.closePath(); ctx.fill(); ctx.stroke();
    // cabeça
    ctx.fillStyle="#efc9a0"; ctx.beginPath(); ctx.arc(32,22,11,0,Math.PI*2); ctx.fill(); ctx.strokeStyle="#6a4a30"; ctx.lineWidth=1.6; ctx.stroke();
    // chapéu
    ctx.fillStyle="#22262e"; ctx.beginPath(); ctx.ellipse(32,14,19,4.5,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle="#2c313b"; rrPath(ctx,21,3,22,13,4); ctx.fill();
    ctx.fillStyle="#c0252a"; ctx.fillRect(21,11,22,3);
    // olhos zangados e sobrancelhas
    angryEyes(ctx,32,22,4.4,"#7dff9a");
    ctx.fillStyle="#1a0000"; ctx.beginPath(); ctx.ellipse(32,31,4,2.4,0,0,Math.PI); ctx.fill();
    // caderneta
    ctx.fillStyle="#fff8e0"; ctx.fillRect(40,42,10,12); ctx.strokeStyle="#6a5a3a"; ctx.lineWidth=1.2; ctx.strokeRect(40,42,10,12);
    ctx.strokeStyle="#9a8a6a"; for(let i=0;i<3;i++){ ctx.beginPath(); ctx.moveTo(42,45+i*3.4); ctx.lineTo(48,45+i*3.4); ctx.stroke(); }
    tex.refresh();
  }
}

// ── Bosses — silhuetas próprias, uma por boss, para deixarem de ser o
//    vilão normal aumentado. Cada textura é desenhada uma única vez. ────
function makeBossTextures(scene){
  const S = 116, C = 58;

  function bossShadow(ctx){
    ctx.fillStyle="rgba(0,0,0,0.28)";
    ctx.beginPath(); ctx.ellipse(C,S-14,34,8,0,0,Math.PI*2); ctx.fill();
  }
  function glowEye(ctx,x,y,r,color){
    ctx.shadowColor=color; ctx.shadowBlur=10;
    ctx.fillStyle=color;
    ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
    ctx.shadowBlur=0;
    ctx.fillStyle="rgba(255,255,255,0.85)";
    ctx.beginPath(); ctx.arc(x-r*0.3,y-r*0.3,r*0.32,0,Math.PI*2); ctx.fill();
  }

  // ── Os 4 bosses de «A Revolução dos Cravos» — símbolos, não pessoas ────────
  //   censura      → o Lápis Azul gigante            pide         → o agente de gabardine e óculos escuros
  //   regime       → o general de medalhas do regime  esquecimento → a névoa que apaga a memória
  // Cada um tem as mesmas 7 variantes de sempre (normal/armsdown/blink/ouch/laugh/angry/sad),
  // desenhadas a partir de «corpo + braços + cara» para as variantes só diferirem no que devem.
  const BOSS_STATES = [
    ["",          "wave", "normal"],
    ["_armsdown", "rest", "normal"],
    ["_blink",    "wave", "blink"],
    ["_ouch",     "rest", "ouch"],
    ["_laugh",    "wave", "laugh"],
    ["_angry",    "wave", "angry"],
    ["_sad",      "rest", "sad"]
  ];
  function makeBossSet(id, body, arms, face){
    for(const [suf, armMode, faceMode] of BOSS_STATES){
      const key = "boss_" + id + suf;
      if(scene.textures.exists(key)) continue;
      const tex = scene.textures.createCanvas(key, S, S), ctx = tex.getContext();
      ctx.lineJoin = "round"; ctx.lineCap = "round";
      body(ctx, faceMode); arms(ctx, armMode, faceMode); face(ctx, faceMode);
      tex.refresh();
    }
  }
  function ln(ctx,x1,y1,x2,y2,w,col){ ctx.strokeStyle=col; ctx.lineWidth=w; ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke(); }
  function glove(ctx,x,y,r){ ctx.fillStyle="#fafafa"; ctx.strokeStyle="#333"; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill(); ctx.stroke(); }
  function stars(ctx,x,y){ ctx.fillStyle="#ffe14a"; ctx.strokeStyle="#7a5a00"; ctx.lineWidth=1;
    for(const [dx,dy,s] of [[-10,-4,4],[10,-8,5],[0,-14,3.5]]){ ctx.beginPath(); for(let i=0;i<10;i++){ const a=-Math.PI/2+i*Math.PI/5, r=(i%2?s*0.45:s); ctx.lineTo(x+dx+Math.cos(a)*r, y+dy+Math.sin(a)*r); } ctx.closePath(); ctx.fill(); ctx.stroke(); } }
  // Olhos e boca genéricos — cx,cy = centro entre os olhos; gap = metade da distância entre eles
  function eyes(ctx,cx,cy,gap,mode,irisCol){
    const R=5.6;
    for(const sx of [-1,1]){
      const x=cx+sx*gap;
      if(mode==="blink" || mode==="laugh"){
        ctx.strokeStyle="#111"; ctx.lineWidth=2.6; ctx.beginPath();
        if(mode==="laugh") ctx.arc(x,cy+1,R*0.9,Math.PI*1.1,Math.PI*1.9); else { ctx.moveTo(x-R,cy+1); ctx.lineTo(x+R,cy+1); }
        ctx.stroke(); continue;
      }
      const big = mode==="ouch" ? 1.25 : 1;
      ctx.fillStyle="#fff"; ctx.beginPath(); ctx.ellipse(x,cy,R*big,R*1.15*big,0,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle="#222"; ctx.lineWidth=1.6; ctx.stroke();
      const py = mode==="sad" ? cy+2.4 : cy+0.8;
      ctx.fillStyle=irisCol||"#222"; ctx.beginPath(); ctx.ellipse(x,py,R*0.58*(mode==="ouch"?0.6:1),R*0.72*(mode==="ouch"?0.6:1),0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="#000"; ctx.beginPath(); ctx.arc(x,py+0.4,R*0.3,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="rgba(255,255,255,0.85)"; ctx.beginPath(); ctx.arc(x-1.4,py-1.6,1.3,0,Math.PI*2); ctx.fill();
    }
    brows(ctx,cx,cy-8,gap,mode);
  }
  function brows(ctx,cx,y,gap,mode){
    if(mode==="normal"||mode==="blink") return;
    ctx.strokeStyle="#151515"; ctx.lineWidth=3; ctx.lineCap="round";
    for(const sx of [-1,1]){
      const x=cx+sx*gap; ctx.beginPath();
      if(mode==="angry") { ctx.moveTo(x-sx*6,y+1); ctx.lineTo(x+sx*7,y-5); }   // ponta de dentro mais baixa = zangado
      else if(mode==="sad") { ctx.moveTo(x-sx*6,y-5); ctx.lineTo(x+sx*6,y+1); } // ponta de dentro mais alta = triste
      else if(mode==="ouch") { ctx.moveTo(x-6,y-3); ctx.lineTo(x+6,y-3); }
      else return;
      ctx.stroke();
    }
  }
  function mouth(ctx,cx,cy,w,mode){
    ctx.lineCap="round";
    if(mode==="laugh"){
      ctx.fillStyle="#2a0008"; ctx.beginPath(); ctx.moveTo(cx-w,cy-2); ctx.quadraticCurveTo(cx,cy+w*1.1,cx+w,cy-2); ctx.closePath(); ctx.fill();
      ctx.fillStyle="#fffbe8"; ctx.fillRect(cx-w*0.8,cy-2,w*1.6,3.2);
      ctx.fillStyle="#d8445a"; ctx.beginPath(); ctx.ellipse(cx,cy+w*0.5,w*0.4,w*0.22,0,0,Math.PI*2); ctx.fill();
    } else if(mode==="ouch"){
      ctx.fillStyle="#2a0008"; ctx.beginPath(); ctx.ellipse(cx,cy+2,w*0.32,w*0.42,0,0,Math.PI*2); ctx.fill();
    } else if(mode==="angry"){
      ctx.fillStyle="#2a0008"; ctx.beginPath(); ctx.moveTo(cx-w,cy+3); ctx.quadraticCurveTo(cx,cy-w*0.55,cx+w,cy+3); ctx.lineTo(cx+w*0.6,cy+5); ctx.lineTo(cx-w*0.6,cy+5); ctx.closePath(); ctx.fill();
      ctx.fillStyle="#fffbe8"; for(let i=-2;i<=2;i++) ctx.fillRect(cx+i*w*0.32-1.4,cy+1.4,2.8,3);
    } else if(mode==="sad"){
      ctx.strokeStyle="#2a0008"; ctx.lineWidth=2.8; ctx.beginPath(); ctx.arc(cx,cy+w*0.9,w*0.9,Math.PI*1.2,Math.PI*1.8); ctx.stroke();
    } else {
      ctx.strokeStyle="#2a0008"; ctx.lineWidth=2.6; ctx.beginPath(); ctx.moveTo(cx-w*0.8,cy+1); ctx.quadraticCurveTo(cx,cy+w*0.55,cx+w*0.8,cy-1); ctx.stroke();
    }
  }

  // ── 1) A Censura — um Lápis Azul gigante, de ponta afiada em cima (a «cabeça») ──
  function bodyCensura(ctx,mode){
    bossShadow(ctx);
    // borracha rosa a servir de base
    ctx.fillStyle="#ff8fb0"; rrPath(ctx,34,98,48,10,5); ctx.fill(); ctx.strokeStyle="#7a2a44"; ctx.lineWidth=2; ctx.stroke();
    // virola metálica
    const vg=ctx.createLinearGradient(34,0,82,0); vg.addColorStop(0,"#8f99a8"); vg.addColorStop(0.5,"#f1f4f9"); vg.addColorStop(1,"#7e8896");
    ctx.fillStyle=vg; ctx.fillRect(34,88,48,11); ctx.strokeStyle="#434b59"; ctx.lineWidth=2; ctx.strokeRect(34,88,48,11);
    ctx.strokeStyle="rgba(0,0,0,0.25)"; ctx.lineWidth=1.2; for(const y of [92,95.5]){ ctx.beginPath(); ctx.moveTo(35,y); ctx.lineTo(81,y); ctx.stroke(); }
    // corpo azul
    const bg=ctx.createLinearGradient(34,0,82,0); bg.addColorStop(0,"#2455c8"); bg.addColorStop(0.45,"#5c9cff"); bg.addColorStop(1,"#1b3f9c");
    ctx.fillStyle=bg; ctx.fillRect(34,38,48,51); ctx.strokeStyle="#0d2766"; ctx.lineWidth=2.4; ctx.strokeRect(34,38,48,51);
    ctx.strokeStyle="rgba(255,255,255,0.20)"; ctx.lineWidth=1.6; for(const x of [46,58,70]){ ctx.beginPath(); ctx.moveTo(x,39); ctx.lineTo(x,88); ctx.stroke(); }
    // madeira + grafite (a cabeça afiada)
    ctx.fillStyle="#efc890"; ctx.beginPath(); ctx.moveTo(34,39); ctx.lineTo(82,39); ctx.lineTo(58,6); ctx.closePath(); ctx.fill();
    ctx.strokeStyle="#7a5530"; ctx.lineWidth=2.2; ctx.stroke();
    ctx.fillStyle="#2c3240"; ctx.beginPath(); ctx.moveTo(52,15); ctx.lineTo(64,15); ctx.lineTo(58,6); ctx.closePath(); ctx.fill();
    ctx.fillStyle="rgba(255,255,255,0.28)"; ctx.beginPath(); ctx.moveTo(40,38); ctx.lineTo(54,17); ctx.lineTo(52,38); ctx.closePath(); ctx.fill();
    if(mode==="angry"){ ctx.fillStyle="rgba(255,40,40,0.20)"; ctx.fillRect(34,38,48,51); }
  }
  function armsCensura(ctx,m){
    // braço esquerdo (para o lado) e braço direito com o carimbo «CENSURADO»
    const up = m==="wave";
    ln(ctx,34,62,up?18:20,up?46:76,4,"#222"); glove(ctx,up?16:19,up?43:79,5.5);
    const hx=up?100:98, hy=up?44:80;
    ln(ctx,82,62,hx-4,hy+2,4,"#222"); glove(ctx,hx,hy,5.5);
    // carimbo
    ctx.save(); ctx.translate(hx,hy-12); ctx.rotate(up?-0.25:0.15);
    ctx.fillStyle="#7a4a24"; rrPath(ctx,-3,6,6,8,2); ctx.fill();
    ctx.fillStyle="#d9262a"; rrPath(ctx,-13,-6,26,13,3); ctx.fill(); ctx.strokeStyle="#5a080c"; ctx.lineWidth=2; ctx.stroke();
    ctx.strokeStyle="#fff"; ctx.lineWidth=2.2; ctx.beginPath(); ctx.moveTo(-7,-3); ctx.lineTo(7,4); ctx.moveTo(7,-3); ctx.lineTo(-7,4); ctx.stroke();
    ctx.restore();
  }
  function faceCensura(ctx,m){ eyes(ctx,58,60,11,m,"#2b6cff"); mouth(ctx,58,76,8,m); if(m==="ouch") stars(ctx,58,38); }
  makeBossSet("censura", bodyCensura, armsCensura, faceCensura);

  // ── 2) A PIDE — agente de gabardine, chapéu e óculos escuros, com um dossiê ──
  function bodyPide(ctx,mode){
    bossShadow(ctx);
    // sapatos
    ctx.fillStyle="#14161c"; ctx.beginPath(); ctx.ellipse(44,106,12,5,0,0,Math.PI*2); ctx.ellipse(72,106,12,5,0,0,Math.PI*2); ctx.fill();
    // gabardine
    const cg=ctx.createLinearGradient(24,0,92,0); cg.addColorStop(0,"#2a303c"); cg.addColorStop(0.5,"#4a5262"); cg.addColorStop(1,"#262b36");
    ctx.fillStyle=cg; ctx.beginPath(); ctx.moveTo(34,52); ctx.lineTo(82,52); ctx.lineTo(94,106); ctx.lineTo(22,106); ctx.closePath(); ctx.fill();
    ctx.strokeStyle="#10131a"; ctx.lineWidth=2.4; ctx.stroke();
    ctx.fillStyle="#171a22"; ctx.fillRect(56,56,4,50);
    ctx.fillStyle="#8a6a3a"; ctx.fillRect(26,80,64,5); ctx.fillStyle="#d9b26a"; ctx.fillRect(54,79,8,7);
    // gola subida
    ctx.fillStyle="#3b4352"; ctx.beginPath(); ctx.moveTo(34,52); ctx.lineTo(42,38); ctx.lineTo(56,56); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(82,52); ctx.lineTo(74,38); ctx.lineTo(60,56); ctx.closePath(); ctx.fill(); ctx.stroke();
    // cabeça
    ctx.fillStyle="#e8c39c"; ctx.beginPath(); ctx.arc(58,40,17,0,Math.PI*2); ctx.fill(); ctx.strokeStyle="#6a4a30"; ctx.lineWidth=2; ctx.stroke();
    // chapéu
    ctx.fillStyle="#1b1e26"; ctx.beginPath(); ctx.ellipse(58,28,32,7,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle="#262a34"; rrPath(ctx,38,5,40,24,8); ctx.fill(); ctx.strokeStyle="#0c0e12"; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle="#c0252a"; ctx.fillRect(38,21,40,5);
    if(mode==="angry"){ ctx.fillStyle="rgba(255,40,40,0.18)"; ctx.beginPath(); ctx.arc(58,40,17,0,Math.PI*2); ctx.fill(); }
  }
  function armsPide(ctx,m){
    const up = m==="wave";
    ln(ctx,32,58,20,up?76:84,6,"#2a303c"); glove(ctx,19,up?78:86,5);
    const hx=up?102:98, hy=up?48:86;
    ln(ctx,84,58,hx-4,hy+2,6,"#2a303c"); glove(ctx,hx,hy,5);
    // dossiê
    ctx.save(); ctx.translate(hx,hy-10); ctx.rotate(up?-0.2:0.1);
    ctx.fillStyle="#d9b26a"; rrPath(ctx,-12,-9,24,18,2); ctx.fill(); ctx.strokeStyle="#6a4a1a"; ctx.lineWidth=1.8; ctx.stroke();
    ctx.fillStyle="#c49a50"; ctx.fillRect(-12,-12,10,4);
    ctx.strokeStyle="#6a4a1a"; ctx.lineWidth=1.2; for(let i=0;i<3;i++){ ctx.beginPath(); ctx.moveTo(-8,-3+i*4.5); ctx.lineTo(7,-3+i*4.5); ctx.stroke(); }
    ctx.restore();
  }
  function facePide(ctx,m){
    // óculos escuros
    const tilt = m==="ouch" ? 0.18 : 0;
    ctx.save(); ctx.translate(58,41); ctx.rotate(tilt);
    ctx.fillStyle="#0b0d12"; rrPath(ctx,-17,-5,14,10,4); ctx.fill(); rrPath(ctx,3,-5,14,10,4); ctx.fill();
    ctx.fillRect(-4,-2,8,2.4);
    ctx.fillStyle="rgba(120,200,255,0.55)"; ctx.fillRect(-14,-3,5,2); ctx.fillRect(6,-3,5,2);
    if(m==="blink"){ ctx.fillStyle="#e8c39c"; ctx.fillRect(-18,-6,36,12); ctx.strokeStyle="#111"; ctx.lineWidth=2.6; ctx.beginPath(); ctx.moveTo(-16,0); ctx.lineTo(-4,0); ctx.moveTo(4,0); ctx.lineTo(16,0); ctx.stroke(); }
    ctx.restore();
    brows(ctx,58,40,10,m);
    mouth(ctx,58,52,6,m);
    if(m==="ouch") stars(ctx,58,16);
  }
  makeBossSet("pide", bodyPide, armsPide, facePide);

  // ── 3) O Regime — general de uniforme e medalhas, com um decreto ──
  function bodyRegime(ctx,mode){
    bossShadow(ctx);
    ctx.fillStyle="#14161c"; rrPath(ctx,36,98,18,10,4); ctx.fill(); rrPath(ctx,62,98,18,10,4); ctx.fill();
    // túnica
    const tg=ctx.createLinearGradient(26,0,90,0); tg.addColorStop(0,"#566040"); tg.addColorStop(0.5,"#7d8a5c"); tg.addColorStop(1,"#4a5436");
    ctx.fillStyle=tg; ctx.beginPath(); ctx.ellipse(58,80,32,28,0,0,Math.PI*2); ctx.fill(); ctx.strokeStyle="#262e18"; ctx.lineWidth=2.6; ctx.stroke();
    // banda diagonal verde e vermelha
    ctx.save(); ctx.beginPath(); ctx.ellipse(58,80,31,27,0,0,Math.PI*2); ctx.clip();
    ctx.strokeStyle="#c8231f"; ctx.lineWidth=8; ctx.beginPath(); ctx.moveTo(30,56); ctx.lineTo(86,104); ctx.stroke();
    ctx.strokeStyle="#1f7a3a"; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(26,60); ctx.lineTo(82,108); ctx.stroke();
    ctx.restore();
    // cinto
    ctx.fillStyle="#3a2a14"; ctx.fillRect(28,86,60,6); ctx.fillStyle="#f2d36a"; ctx.fillRect(54,85,8,8);
    // medalhas
    ctx.fillStyle="#f2d36a"; ctx.strokeStyle="#7a5a10"; ctx.lineWidth=1.2;
    for(const [x,y] of [[40,70],[46,74],[34,76],[40,80]]){ ctx.beginPath(); ctx.arc(x,y,3.4,0,Math.PI*2); ctx.fill(); ctx.stroke(); }
    ctx.fillStyle="#c8231f"; ctx.beginPath(); ctx.arc(46,74,1.6,0,Math.PI*2); ctx.fill();
    // dragonas (ombros)
    ctx.fillStyle="#f2d36a"; ctx.strokeStyle="#7a5a10"; ctx.lineWidth=1.6;
    rrPath(ctx,24,56,16,8,3); ctx.fill(); ctx.stroke(); rrPath(ctx,76,56,16,8,3); ctx.fill(); ctx.stroke();
    // cabeça
    ctx.fillStyle="#e8c3a0"; ctx.beginPath(); ctx.arc(58,44,18,0,Math.PI*2); ctx.fill(); ctx.strokeStyle="#6a4a30"; ctx.lineWidth=2; ctx.stroke();
    // boné de pala
    ctx.fillStyle="#3b4426"; rrPath(ctx,37,14,42,19,7); ctx.fill(); ctx.strokeStyle="#1a2010"; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle="#1a1d12"; ctx.beginPath(); ctx.ellipse(58,33,27,5.5,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle="#f2d36a"; ctx.beginPath(); ctx.arc(58,23,5.2,0,Math.PI*2); ctx.fill(); ctx.fillStyle="#c8231f"; ctx.beginPath(); ctx.arc(58,23,2.4,0,Math.PI*2); ctx.fill();
    if(mode==="angry"){ ctx.fillStyle="rgba(255,40,40,0.18)"; ctx.beginPath(); ctx.arc(58,44,18,0,Math.PI*2); ctx.fill(); }
  }
  function armsRegime(ctx,m){
    const up = m==="wave";
    ln(ctx,28,70,16,up?54:88,7,"#566040"); glove(ctx,15,up?51:91,5.5);
    const hx=up?102:98, hy=up?44:88;
    ln(ctx,88,70,hx-4,hy+3,7,"#566040"); glove(ctx,hx,hy,5.5);
    // decreto (pergaminho)
    ctx.save(); ctx.translate(hx,hy-12); ctx.rotate(up?-0.3:0.12);
    ctx.fillStyle="#f6ecc8"; rrPath(ctx,-11,-9,22,18,3); ctx.fill(); ctx.strokeStyle="#7a6a3a"; ctx.lineWidth=1.6; ctx.stroke();
    ctx.strokeStyle="#9a8a5a"; ctx.lineWidth=1; for(let i=0;i<3;i++){ ctx.beginPath(); ctx.moveTo(-7,-4+i*4.5); ctx.lineTo(7,-4+i*4.5); ctx.stroke(); }
    ctx.fillStyle="#c8231f"; ctx.beginPath(); ctx.arc(5,6,3.4,0,Math.PI*2); ctx.fill();
    ctx.restore();
  }
  function faceRegime(ctx,m){
    eyes(ctx,58,43,8.5,m,"#4a3a2a");
    // bigode
    ctx.fillStyle="#d9d9d4"; ctx.strokeStyle="#7a7a74"; ctx.lineWidth=1.2;
    ctx.beginPath(); ctx.moveTo(58,52); ctx.quadraticCurveTo(46,49,41,55); ctx.quadraticCurveTo(50,57,58,55); ctx.quadraticCurveTo(66,57,75,55); ctx.quadraticCurveTo(70,49,58,52); ctx.closePath(); ctx.fill(); ctx.stroke();
    mouth(ctx,58,59,6,m);
    if(m==="ouch") stars(ctx,58,12);
  }
  makeBossSet("regime", bodyRegime, armsRegime, faceRegime);

  // ── 4) O Esquecimento — névoa escura de páginas de calendário a cair ──
  function bodyEsq(ctx,mode){
    ctx.fillStyle="rgba(0,0,0,0.25)"; ctx.beginPath(); ctx.ellipse(C,106,30,6,0,0,Math.PI*2); ctx.fill();
    const g=ctx.createRadialGradient(52,48,4,58,66,52);
    g.addColorStop(0,"#9d88d8"); g.addColorStop(0.55,"#5b4a96"); g.addColorStop(1,"#2a2150");
    ctx.fillStyle=g; ctx.beginPath();
    ctx.moveTo(26,104);
    ctx.bezierCurveTo(16,84,18,52,34,32); ctx.bezierCurveTo(44,14,72,14,82,32);
    ctx.bezierCurveTo(98,52,100,84,90,104);
    for(let i=0;i<5;i++){ const x1=90-i*16.4, x2=x1-8.2, x3=x1-16.4; ctx.quadraticCurveTo(x2,i%2?96:112,x3,104); }
    ctx.closePath(); ctx.fill(); ctx.strokeStyle="#150f33"; ctx.lineWidth=2.6; ctx.stroke();
    // puffs de névoa
    ctx.fillStyle="rgba(190,170,240,0.28)";
    for(const [x,y,r] of [[40,44,9],[78,50,10],[52,84,12],[72,90,9]]){ ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill(); }
    // páginas de calendário a cair
    ctx.fillStyle="#f4f0e0"; ctx.strokeStyle="#6a6040"; ctx.lineWidth=1.2;
    for(const [x,y,rot] of [[18,24,-0.5],[98,36,0.5],[12,70,0.3],[104,78,-0.4]]){
      ctx.save(); ctx.translate(x,y); ctx.rotate(rot); ctx.fillRect(-6,-7,12,14); ctx.strokeRect(-6,-7,12,14);
      ctx.fillStyle="#c8231f"; ctx.fillRect(-6,-7,12,4); ctx.fillStyle="#f4f0e0"; ctx.restore();
    }
    if(mode==="angry"){ ctx.fillStyle="rgba(255,60,200,0.16)"; ctx.fillRect(18,16,80,92); }
  }
  function armsEsq(ctx,m){
    const up = m==="wave";
    ctx.strokeStyle="rgba(200,180,255,0.75)"; ctx.lineWidth=8; ctx.lineCap="round";
    ctx.beginPath(); ctx.moveTo(26,66); ctx.quadraticCurveTo(10,up?44:80,up?12:16,up?30:92); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(90,66); ctx.quadraticCurveTo(106,up?44:80,up?104:100,up?30:92); ctx.stroke();
    ctx.fillStyle="rgba(230,215,255,0.9)";
    for(const [x,y] of [[up?12:16,up?28:92],[up?104:100,up?28:92]]){ ctx.beginPath(); ctx.arc(x,y,6,0,Math.PI*2); ctx.fill(); }
  }
  function faceEsq(ctx,m){
    // órbitas escuras com brilho
    for(const sx of [-1,1]){
      const x=58+sx*13, y=54;
      ctx.fillStyle="#120c2a"; ctx.beginPath(); ctx.ellipse(x,y,9,m==="ouch"?11:9,0,0,Math.PI*2); ctx.fill();
      if(m==="blink"||m==="laugh"){ ctx.strokeStyle="#d8ccff"; ctx.lineWidth=2.6; ctx.beginPath(); ctx.arc(x,y+2,6,Math.PI*1.1,Math.PI*1.9); ctx.stroke(); }
      else glowEye(ctx,x,m==="sad"?y+2:y,m==="ouch"?3.4:4.4,m==="angry"?"#ff4fe6":"#fff2a0");
    }
    brows(ctx,58,48,13,m);
    mouth(ctx,58,74,9,m);
    if(m==="ouch") stars(ctx,58,26);
  }
  makeBossSet("esquecimento", bodyEsq, armsEsq, faceEsq);
  // ── Projéteis do Monstro da Ignorância — livro bom vs. livro mau ────
  // Muito diferentes ao olhar: dourado/brilhante vs. escuro/rabiscado com X vermelho.
  if(!scene.textures.exists("boss_proj_book")){
    const w=34,h=28,tex=scene.textures.createCanvas("boss_proj_book",w,h), ctx=tex.getContext();
    ctx.shadowColor="rgba(255,220,80,0.8)"; ctx.shadowBlur=9;
    // capa
    const gr=ctx.createLinearGradient(2,2,w-2,h-2);
    gr.addColorStop(0,"#fff2b0"); gr.addColorStop(0.5,"#ffd23f"); gr.addColorStop(1,"#e08a00");
    ctx.fillStyle=gr; rrPath(ctx,2,2,w-4,h-4,4); ctx.fill();
    ctx.shadowBlur=0;
    ctx.strokeStyle="#8a5200"; ctx.lineWidth=2; ctx.stroke();
    // lombada
    ctx.strokeStyle="rgba(138,82,0,0.6)"; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(w/2,3); ctx.lineTo(w/2,h-3); ctx.stroke();
    // páginas
    ctx.fillStyle="#fffdf0";
    ctx.fillRect(5,6,w/2-6,h-12); ctx.fillRect(w/2+1,6,w/2-6,h-12);
    // brilho de "conhecimento"
    ctx.fillStyle="rgba(255,255,255,0.55)";
    ctx.beginPath(); ctx.ellipse(9,8,4,3,Math.PI/4,0,Math.PI*2); ctx.fill();
    tex.refresh();
  }
  if(!scene.textures.exists("boss_proj_badbook")){
    const w=34,h=28,tex=scene.textures.createCanvas("boss_proj_badbook",w,h), ctx=tex.getContext();
    const gr=ctx.createLinearGradient(2,2,w-2,h-2);
    gr.addColorStop(0,"#5a4a5c"); gr.addColorStop(0.5,"#3a2a3c"); gr.addColorStop(1,"#1a0e1c");
    ctx.fillStyle=gr; rrPath(ctx,2,2,w-4,h-4,4); ctx.fill();
    ctx.strokeStyle="#0a050a"; ctx.lineWidth=2; ctx.stroke();
    // rabiscos confusos
    ctx.strokeStyle="rgba(180,160,190,0.5)"; ctx.lineWidth=1;
    for(let i=0;i<3;i++){ ctx.beginPath(); ctx.moveTo(6,9+i*5); ctx.lineTo(16,7+i*6); ctx.stroke(); }
    // aviso — X vermelho bem visível
    ctx.shadowColor="rgba(255,40,40,0.7)"; ctx.shadowBlur=6;
    ctx.strokeStyle="#ff3030"; ctx.lineWidth=3.5; ctx.lineCap="round";
    ctx.beginPath(); ctx.moveTo(w-15,7); ctx.lineTo(w-3,19); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(w-3,7); ctx.lineTo(w-15,19); ctx.stroke();
    ctx.shadowBlur=0;
    tex.refresh();
  }
  // ── Bola ❓ do Monstro da Ignorância (redesenho) — rola devagar pelo chão,
  // saltitando um pouco, em vez de voar direto à cabeça. Lenta e fácil de
  // ver/evitar de propósito — nada de "aviso vermelho" agressivo aqui.
  if(!scene.textures.exists("boss_proj_qmark")){
    const w=30,h=30,tex=scene.textures.createCanvas("boss_proj_qmark",w,h), ctx=tex.getContext();
    const gr=ctx.createRadialGradient(w/2-4,h/2-4,2,w/2,h/2,15);
    gr.addColorStop(0,"#c8aeff"); gr.addColorStop(0.6,"#8a5cff"); gr.addColorStop(1,"#5228b0");
    ctx.fillStyle=gr;
    ctx.beginPath(); ctx.arc(w/2,h/2,13,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle="#2a1060"; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle="#fff8ff"; ctx.font="bold 15px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="middle";
    ctx.fillText("?", w/2, h/2+1);
    ctx.textBaseline="alphabetic";
    tex.refresh();
  }

  // ── Carimbo «CENSURADO» da Censura (chave antiga: boss_proj_germ) ──
  if(!scene.textures.exists("boss_proj_germ")){
    const w=30,h=30,tex=scene.textures.createCanvas("boss_proj_germ",w,h), ctx=tex.getContext();
    ctx.save(); ctx.translate(15,15); ctx.rotate(-0.22);
    ctx.shadowColor="rgba(255,40,40,0.8)"; ctx.shadowBlur=6;
    ctx.fillStyle="#d9262a"; rrPath(ctx,-13,-9,26,18,3); ctx.fill(); ctx.shadowBlur=0;
    ctx.strokeStyle="#5a080c"; ctx.lineWidth=2; ctx.stroke();
    ctx.strokeStyle="#fff"; ctx.lineWidth=1.4; rrPath(ctx,-10,-6,20,12,2); ctx.stroke();
    ctx.lineWidth=2.6; ctx.lineCap="round"; ctx.beginPath(); ctx.moveTo(-6,-3); ctx.lineTo(6,3); ctx.moveTo(6,-3); ctx.lineTo(-6,3); ctx.stroke();
    ctx.restore(); tex.refresh();
  }
  // ── Dossiê da PIDE (chave antiga: boss_proj_hook) ──
  if(!scene.textures.exists("boss_proj_hook")){
    const w=30,h=30,tex=scene.textures.createCanvas("boss_proj_hook",w,h), ctx=tex.getContext();
    ctx.save(); ctx.translate(15,15); ctx.rotate(0.18);
    ctx.shadowColor="rgba(255,220,120,0.7)"; ctx.shadowBlur=5;
    ctx.fillStyle="#d9b26a"; rrPath(ctx,-12,-9,24,19,2); ctx.fill(); ctx.shadowBlur=0;
    ctx.strokeStyle="#6a4a1a"; ctx.lineWidth=1.8; ctx.stroke();
    ctx.fillStyle="#c49a50"; ctx.fillRect(-12,-12,10,4); ctx.strokeRect(-12,-12,10,4);
    ctx.fillStyle="#fffdf0"; ctx.fillRect(-8,-5,16,11);
    ctx.strokeStyle="#7a6a4a"; ctx.lineWidth=1; for(let i=0;i<3;i++){ ctx.beginPath(); ctx.moveTo(-6,-2+i*3.6); ctx.lineTo(6,-2+i*3.6); ctx.stroke(); }
    ctx.fillStyle="#c8231f"; ctx.beginPath(); ctx.arc(7,8,3,0,Math.PI*2); ctx.fill();
    ctx.restore(); tex.refresh();
  }

  // ── Orbe sombrio do Guardião das Sombras — antes era só um círculo liso
  // com um traço fino (não lia como "nuvem" nenhuma, parecia só uma bolinha
  // igual às outras). Agora é um aglomerado de bolhas sobrepostas (silhueta
  // tipo nuvenzinha), com 2 caudas de fumo a espiralar para os lados e um
  // par de "olhos" ténues — dá logo a ideia de nuvem/sombra com alguma
  // presença assombrada, sem símbolo nenhum. Desenhada quase branca (o tint
  // em data-bosses.js é que lhe dá a cor roxo-escura final).
  if(!scene.textures.exists("boss_proj_shadow")){
    const w=30,h=30,tex=scene.textures.createCanvas("boss_proj_shadow",w,h), ctx=tex.getContext();
    const cx=w/2, cy=h/2;
    ctx.shadowColor="#e8e0ff"; ctx.shadowBlur=6;
    const gr=ctx.createRadialGradient(cx-2,cy-2,1,cx,cy,13);
    gr.addColorStop(0,"#ffffff"); gr.addColorStop(0.45,"#d8ccf5"); gr.addColorStop(1,"#9a86d0");
    ctx.fillStyle=gr;
    // Várias bolhas sobrepostas em vez de um único círculo perfeito — é isto
    // que dá a silhueta irregular e "fofa" de nuvem, em vez de uma bola lisa.
    [[0,-2,7],[-6,1,5.5],[6,1,5.5],[-3,5,5],[3,5,5],[0,0,8]].forEach(([dx,dy,r])=>{
      ctx.beginPath(); ctx.arc(cx+dx,cy+dy,r,0,Math.PI*2); ctx.fill();
    });
    ctx.shadowBlur=0;
    // Duas caudas de fumo/sombra a espiralar para os lados opostos — reforça
    // a sensação de algo imaterial (nem espigões de vírus, nem contorno reto
    // de porca/parafuso).
    ctx.strokeStyle="rgba(255,255,255,0.5)"; ctx.lineWidth=1.4;
    ctx.beginPath(); ctx.moveTo(cx-9,cy-1); ctx.quadraticCurveTo(cx-13,cy-6,cx-11,cy-11); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx+9,cy+2); ctx.quadraticCurveTo(cx+13,cy+7,cx+10,cy+12); ctx.stroke();
    // Par de "olhos" bem ténues — presença ligeiramente assombrada, sem
    // exagerar (isto continua a ser um jogo do 4º ano).
    ctx.fillStyle="rgba(230,220,255,0.9)";
    ctx.beginPath(); ctx.ellipse(cx-2.5,cy-1,1.1,1.6,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx+2.5,cy-1,1.1,1.6,0,0,Math.PI*2); ctx.fill();
    tex.refresh();
  }

  // ── Decreto do Regime (chave antiga: boss_proj_spam) — pergaminho com selo de lacre ──
  if(!scene.textures.exists("boss_proj_spam")){
    const w=32,h=24,tex=scene.textures.createCanvas("boss_proj_spam",w,h), ctx=tex.getContext();
    ctx.shadowColor="rgba(255,230,160,0.7)"; ctx.shadowBlur=5;
    ctx.fillStyle="#f6ecc8"; rrPath(ctx,4,3,24,17,3); ctx.fill(); ctx.shadowBlur=0;
    ctx.strokeStyle="#7a6a3a"; ctx.lineWidth=1.8; ctx.stroke();
    ctx.fillStyle="#d8c690"; ctx.beginPath(); ctx.ellipse(4,11.5,2.6,8.4,0,0,Math.PI*2); ctx.fill(); ctx.strokeStyle="#7a6a3a"; ctx.lineWidth=1.4; ctx.stroke();
    ctx.beginPath(); ctx.ellipse(28,11.5,2.6,8.4,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.strokeStyle="#9a8a5a"; ctx.lineWidth=1; for(let i=0;i<3;i++){ ctx.beginPath(); ctx.moveTo(8,7+i*3.4); ctx.lineTo(21,7+i*3.4); ctx.stroke(); }
    ctx.fillStyle="#c8231f"; ctx.beginPath(); ctx.arc(21,16,3.2,0,Math.PI*2); ctx.fill(); ctx.strokeStyle="#6a0e0c"; ctx.lineWidth=1; ctx.stroke();
    tex.refresh();
  }
}

function makeSparkTexture(scene){
  if(scene.textures.exists("spark_item")) return;
  const g=scene.make.graphics({x:0,y:0,add:false});
  g.fillStyle(0xffd700,1);
  g.beginPath();
  for(let _i=0;_i<5;_i++){
    const _o=Math.PI*2*_i/5-Math.PI/2, _in=_o+Math.PI/5;
    _i===0?g.moveTo(8+Math.cos(_o)*8,8+Math.sin(_o)*8):g.lineTo(8+Math.cos(_o)*8,8+Math.sin(_o)*8);
    g.lineTo(8+Math.cos(_in)*3,8+Math.sin(_in)*3);
  }
  g.closePath(); g.fillPath();
  g.generateTexture("spark_item",16,16); g.destroy();
}

function makeItemTextures(scene){
  // Estrela
  // ── Cravo dourado (power-up «estrela» — super modo) ──
  if(!scene.textures.exists("item_estrela")){
    const tex=scene.textures.createCanvas("item_estrela",36,36), ctx=tex.getContext();
    const halo=ctx.createRadialGradient(18,16,2,18,16,18); halo.addColorStop(0,"rgba(255,225,110,0.65)"); halo.addColorStop(1,"rgba(255,225,110,0)");
    ctx.fillStyle=halo; ctx.fillRect(0,0,36,36);
    ctx.save(); ctx.shadowColor="rgba(255,210,60,0.9)"; ctx.shadowBlur=7;
    drawCarnation(ctx,18,15,12,{hi:"#fff2a8",lo:"#f0b400",stroke:"#8a5a00"},true);
    ctx.restore();
    // brilhos
    ctx.fillStyle="#fff"; for(const [x,y,r] of [[5,6,1.6],[31,9,1.3],[29,28,1.1]]){ ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill(); }
    tex.refresh();
  }
  // ── Cravos flutuantes — 6 tons de vermelho/rosa (chaves item_cadeado_0..5, usadas como «balões») ──
  const CARN_COLORS=[
    {hi:"#ff6a7a", lo:"#d9102a", stroke:"#7a0014"},
    {hi:"#ff8a96", lo:"#e0243c", stroke:"#80001c"},
    {hi:"#ff5468", lo:"#b8001e", stroke:"#600010"},
    {hi:"#ff9aa8", lo:"#f03a58", stroke:"#8a0a28"},
    {hi:"#ff7a62", lo:"#d93a1c", stroke:"#7a1400"},
    {hi:"#ffb0bc", lo:"#e8506c", stroke:"#8a1030"},
  ];
  CARN_COLORS.forEach((bc,ci)=>{
    const key="item_cadeado_"+ci;
    if(scene.textures.exists(key)) return;
    const tex=scene.textures.createCanvas(key,32,36), ctx=tex.getContext();
    ctx.save(); ctx.shadowColor=bc.lo; ctx.shadowBlur=6;
    ctx.strokeStyle="#2d8a40"; ctx.lineWidth=2.4; ctx.beginPath(); ctx.moveTo(16,22); ctx.quadraticCurveTo(14,29,17,35); ctx.stroke();
    ctx.restore();
    ctx.fillStyle="#3aa04e"; ctx.beginPath(); ctx.ellipse(21,29,5,2.2,-0.6,0,Math.PI*2); ctx.fill();
    drawCarnation(ctx,16,13,11,bc,true);
    tex.refresh();
  });
  // ── Jornal da liberdade (item «balão» → chave item_chave, 52×56) ──
  if(!scene.textures.exists("item_chave")){
    const tex=scene.textures.createCanvas("item_chave",52,56), ctx=tex.getContext();
    const halo=ctx.createRadialGradient(26,28,3,26,28,26); halo.addColorStop(0,"rgba(255,240,170,0.55)"); halo.addColorStop(1,"rgba(255,240,170,0)");
    ctx.fillStyle=halo; ctx.fillRect(0,0,52,56);
    ctx.save(); ctx.translate(26,28); ctx.rotate(-0.12);
    ctx.shadowColor="rgba(0,0,0,0.35)"; ctx.shadowBlur=4; ctx.shadowOffsetY=2;
    ctx.fillStyle="#f4ecd2"; rrPath(ctx,-18,-22,36,44,3); ctx.fill(); ctx.shadowBlur=0; ctx.shadowOffsetY=0;
    ctx.strokeStyle="#6a5a3a"; ctx.lineWidth=2; ctx.stroke();
    // cabeçalho
    ctx.fillStyle="#1a1a1a"; ctx.fillRect(-14,-18,28,7);
    ctx.fillStyle="#f4ecd2"; ctx.fillRect(-12,-16.5,24,1.6); ctx.fillRect(-9,-13.6,18,1.2);
    ctx.fillStyle="#c8231f"; ctx.fillRect(-14,-10,28,2);
    // fotografia e texto
    ctx.fillStyle="#8a8a80"; ctx.fillRect(-14,-6,15,13); ctx.fillStyle="#c8231f"; ctx.beginPath(); ctx.arc(-6.5,0.5,3,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle="#3a3a34"; ctx.lineWidth=1.3;
    for(let i=0;i<4;i++){ ctx.beginPath(); ctx.moveTo(4,-5+i*3.6); ctx.lineTo(14,-5+i*3.6); ctx.stroke(); }
    for(let i=0;i<4;i++){ ctx.beginPath(); ctx.moveTo(-14,10+i*3); ctx.lineTo(14,10+i*3); ctx.stroke(); }
    ctx.restore(); tex.refresh();
  }
  // ── Rádio (item «brinquedo» → chave item_chip, 44×44) ──
  if(!scene.textures.exists("item_chip")){
    const tex=scene.textures.createCanvas("item_chip",44,44), ctx=tex.getContext();
    const halo=ctx.createRadialGradient(22,24,3,22,24,22); halo.addColorStop(0,"rgba(255,200,120,0.5)"); halo.addColorStop(1,"rgba(255,200,120,0)");
    ctx.fillStyle=halo; ctx.fillRect(0,0,44,44);
    // antena
    ctx.strokeStyle="#c9c2b0"; ctx.lineWidth=1.8; ctx.beginPath(); ctx.moveTo(30,12); ctx.lineTo(38,3); ctx.stroke(); ctx.fillStyle="#c9c2b0"; ctx.beginPath(); ctx.arc(38,3,1.8,0,Math.PI*2); ctx.fill();
    // caixa
    const g=ctx.createLinearGradient(0,12,0,38); g.addColorStop(0,"#b8742c"); g.addColorStop(1,"#7a4a18");
    ctx.fillStyle=g; rrPath(ctx,5,12,34,26,5); ctx.fill(); ctx.strokeStyle="#3b2210"; ctx.lineWidth=2; ctx.stroke();
    // altifalante
    ctx.fillStyle="#2a1a0c"; rrPath(ctx,8,16,14,18,3); ctx.fill();
    ctx.strokeStyle="#c9a050"; ctx.lineWidth=1.1; for(let i=0;i<5;i++){ ctx.beginPath(); ctx.moveTo(9.5,19+i*3.2); ctx.lineTo(20.5,19+i*3.2); ctx.stroke(); }
    // mostrador e botões
    ctx.fillStyle="#f6e9b8"; rrPath(ctx,25,16,11,8,2); ctx.fill(); ctx.strokeStyle="#3b2210"; ctx.lineWidth=1.2; ctx.stroke();
    ctx.strokeStyle="#c8231f"; ctx.lineWidth=1.4; ctx.beginPath(); ctx.moveTo(29,17); ctx.lineTo(29,23); ctx.stroke();
    ctx.fillStyle="#f2d36a"; ctx.beginPath(); ctx.arc(28,31,3.4,0,Math.PI*2); ctx.arc(35,31,3.4,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle="#3b2210"; ctx.lineWidth=1.2; ctx.stroke();
    // ondas
    ctx.strokeStyle="rgba(255,240,170,0.8)"; ctx.lineWidth=1.6;
    for(const r of [5,9]){ ctx.beginPath(); ctx.arc(38,3,r,Math.PI*0.55,Math.PI*0.95); ctx.stroke(); }
    tex.refresh();
  }
  // ── Punho cerrado (power-up «medalha» — proteção, 52×58) ──
  if(!scene.textures.exists("item_medalha")){
    const tex=scene.textures.createCanvas("item_medalha",52,58), ctx=tex.getContext();
    const halo=ctx.createRadialGradient(26,30,4,26,30,27); halo.addColorStop(0,"rgba(255,90,90,0.55)"); halo.addColorStop(1,"rgba(255,90,90,0)");
    ctx.fillStyle=halo; ctx.fillRect(0,0,52,58);
    ctx.save(); ctx.shadowColor="rgba(255,60,60,0.8)"; ctx.shadowBlur=7;
    // pulso (faixa vermelha)
    ctx.fillStyle="#d9262a"; rrPath(ctx,14,42,24,10,3); ctx.fill(); ctx.restore();
    ctx.strokeStyle="#5a080c"; ctx.lineWidth=2; rrPath(ctx,14,42,24,10,3); ctx.stroke();
    // punho
    const sk=ctx.createLinearGradient(12,0,40,0); sk.addColorStop(0,"#e8b07a"); sk.addColorStop(0.5,"#f6c892"); sk.addColorStop(1,"#d99a62");
    ctx.fillStyle=sk; ctx.strokeStyle="#7a4a24"; ctx.lineWidth=2.2;
    rrPath(ctx,12,22,28,24,6); ctx.fill(); ctx.stroke();
    // dedos (4 nós)
    for(let i=0;i<4;i++){ const x=15+i*7.2; ctx.beginPath(); ctx.arc(x,18,4.4,0,Math.PI*2); ctx.fill(); ctx.stroke(); }
    ctx.fillStyle=sk; rrPath(ctx,12,19,28,10,4); ctx.fill();
    ctx.strokeStyle="rgba(122,74,36,0.7)"; ctx.lineWidth=1.4; for(let i=1;i<4;i++){ ctx.beginPath(); ctx.moveTo(14.5+i*7.2,24); ctx.lineTo(14.5+i*7.2,32); ctx.stroke(); }
    // polegar
    ctx.fillStyle=sk; ctx.strokeStyle="#7a4a24"; ctx.lineWidth=2; rrPath(ctx,10,30,16,8,4); ctx.fill(); ctx.stroke();
    ctx.fillStyle="rgba(255,255,255,0.35)"; ctx.beginPath(); ctx.ellipse(20,22,5,2,-0.3,0,Math.PI*2); ctx.fill();
    tex.refresh();
  }
  // Livro do saber — 46×44, item de recolha do Monstro da Ignorância (fase "collect").
  // Reaproveita a paleta dourada/brilhante do projétil "boss_proj_book", mas maior
  // e com mais detalhe (páginas abertas), para não parecer um projétil a voar.
  if(!scene.textures.exists("item_livro")){
    const w=46,h=44,tex=scene.textures.createCanvas("item_livro",w,h), ctx=tex.getContext();
    ctx.save(); ctx.translate(w/2,h/2+2);
    ctx.shadowColor="rgba(255,220,80,0.75)"; ctx.shadowBlur=9;
    // capa de trás (levemente rodada, dá volume ao livro aberto)
    ctx.fillStyle="#c07a10";
    ctx.beginPath(); ctx.ellipse(0,2,19,13,0,0,Math.PI*2); ctx.fill();
    ctx.shadowBlur=0;
    // página esquerda
    const grL=ctx.createLinearGradient(-19,-10,0,10);
    grL.addColorStop(0,"#fffdf0"); grL.addColorStop(1,"#ffe9a0");
    ctx.fillStyle=grL;
    ctx.beginPath();
    ctx.moveTo(0,-11); ctx.quadraticCurveTo(-20,-14,-19,0); ctx.quadraticCurveTo(-20,14,0,11); ctx.closePath(); ctx.fill();
    // página direita
    const grR=ctx.createLinearGradient(0,-10,19,10);
    grR.addColorStop(0,"#ffe9a0"); grR.addColorStop(1,"#fffdf0");
    ctx.fillStyle=grR;
    ctx.beginPath();
    ctx.moveTo(0,-11); ctx.quadraticCurveTo(20,-14,19,0); ctx.quadraticCurveTo(20,14,0,11); ctx.closePath(); ctx.fill();
    // lombada central
    ctx.strokeStyle="#8a5200"; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(0,-11); ctx.lineTo(0,11); ctx.stroke();
    // linhas de texto simuladas em cada página
    ctx.strokeStyle="rgba(138,82,0,0.45)"; ctx.lineWidth=1;
    for(let i=0;i<3;i++){
      ctx.beginPath(); ctx.moveTo(-15,-5+i*5); ctx.lineTo(-3,-5+i*5); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(3,-5+i*5); ctx.lineTo(15,-5+i*5); ctx.stroke();
    }
    // contorno geral
    ctx.strokeStyle="#8a5200"; ctx.lineWidth=1.6;
    ctx.beginPath();
    ctx.moveTo(0,-11); ctx.quadraticCurveTo(-20,-14,-19,0); ctx.quadraticCurveTo(-20,14,0,11);
    ctx.quadraticCurveTo(20,14,19,0); ctx.quadraticCurveTo(20,-14,0,-11); ctx.stroke();
    // brilho de "conhecimento" a saltar do livro
    ctx.fillStyle="rgba(255,255,255,0.6)";
    ctx.beginPath(); ctx.ellipse(-9,-8,3,2.2,Math.PI/4,0,Math.PI*2); ctx.fill();
    ctx.restore();
    tex.refresh();
  }
  // Ícones de "conhecimento" — lápis, diploma, lâmpada — desenhados a partir do
  // próprio emoji (glow por trás), para dar variedade rápida ao Monstro da
  // Ignorância sem ter de desenhar 3 ícones vetoriais à mão. Junta-se ao
  // item_livro já existente para formar o conjunto de 4 usado nesse combate.
  function makeEmojiItemTexture(scene, key, emoji, size = 44, glow = "rgba(255,220,80,0.75)") {
    if (scene.textures.exists(key)) return;
    const tex = scene.textures.createCanvas(key, size, size), ctx = tex.getContext();
    ctx.save();
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.font = `${Math.round(size*0.78)}px sans-serif`;
    ctx.shadowColor = glow; ctx.shadowBlur = 10;
    ctx.fillText(emoji, size/2, size/2+2);
    ctx.restore();
    tex.refresh();
  }
  makeEmojiItemTexture(scene, "item_lapis",   "✏️", 44, "rgba(255,180,80,0.75)");
  makeEmojiItemTexture(scene, "item_diploma", "🎓", 46, "rgba(160,140,255,0.75)");
  makeEmojiItemTexture(scene, "item_lampada", "💡", 44, "rgba(255,240,120,0.85)");
  // ── Cartas de emigrantes (as antigas «pacotes de dados», chaves item_pacote_0..4, 48×36) ──
  const LETTER_COLORS=[
    {a:"#d9262a", b:"#2a5fd0"},
    {a:"#2a5fd0", b:"#d9262a"},
    {a:"#1f7a3a", b:"#d9262a"},
    {a:"#d9262a", b:"#1f7a3a"},
    {a:"#2a5fd0", b:"#1f7a3a"},
  ];
  LETTER_COLORS.forEach((bc,ci)=>{
    const key="item_pacote_"+ci;
    if(scene.textures.exists(key)) return;
    const tex=scene.textures.createCanvas(key,48,36), ctx=tex.getContext();
    const halo=ctx.createRadialGradient(24,18,2,24,18,22); halo.addColorStop(0,"rgba(255,245,200,0.5)"); halo.addColorStop(1,"rgba(255,245,200,0)");
    ctx.fillStyle=halo; ctx.fillRect(0,0,48,36);
    ctx.save(); ctx.translate(24,18); ctx.rotate(-0.08);
    ctx.fillStyle="#fffaf0"; ctx.strokeStyle="#6a5a3a"; ctx.lineWidth=1.8; rrPath(ctx,-17,-11,34,22,2.5); ctx.fill(); ctx.stroke();
    // riscas «por avião» à volta
    ctx.save(); rrPath(ctx,-17,-11,34,22,2.5); ctx.clip();
    for(let i=-6;i<10;i++){ ctx.fillStyle=(i%2?bc.a:bc.b); ctx.beginPath(); ctx.moveTo(-20+i*6,-12); ctx.lineTo(-14+i*6,-12); ctx.lineTo(-18+i*6,-8); ctx.lineTo(-24+i*6,-8); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(-20+i*6,12); ctx.lineTo(-14+i*6,12); ctx.lineTo(-18+i*6,8); ctx.lineTo(-24+i*6,8); ctx.closePath(); ctx.fill(); }
    ctx.restore();
    ctx.strokeStyle="#9a8a6a"; ctx.lineWidth=1.1; for(let i=0;i<2;i++){ ctx.beginPath(); ctx.moveTo(-12,-2+i*4); ctx.lineTo(4,-2+i*4); ctx.stroke(); }
    ctx.fillStyle=bc.a; ctx.fillRect(8,-6,6,7); ctx.strokeStyle="#fff"; ctx.lineWidth=1; ctx.strokeRect(8.5,-5.5,5,6);
    ctx.restore(); tex.refresh();
  });

  // ── Pomba da paz (apanhável voador, ex-«drone», 64×52) ──
  if(!scene.textures.exists("item_drone")){
    const tex=scene.textures.createCanvas("item_drone",64,52), ctx=tex.getContext();
    const halo=ctx.createRadialGradient(32,26,3,32,26,30); halo.addColorStop(0,"rgba(255,255,255,0.55)"); halo.addColorStop(1,"rgba(255,255,255,0)");
    ctx.fillStyle=halo; ctx.fillRect(0,0,64,52);
    ctx.save(); ctx.shadowColor="rgba(255,255,255,0.9)"; ctx.shadowBlur=6;
    ctx.fillStyle="#ffffff"; ctx.strokeStyle="#8a98ad"; ctx.lineWidth=2;
    // asa de trás
    ctx.beginPath(); ctx.moveTo(30,26); ctx.quadraticCurveTo(22,6,6,8); ctx.quadraticCurveTo(14,20,22,32); ctx.closePath(); ctx.fill(); ctx.stroke();
    // corpo
    ctx.beginPath(); ctx.moveTo(18,34); ctx.quadraticCurveTo(26,20,44,24); ctx.quadraticCurveTo(54,26,52,34); ctx.quadraticCurveTo(40,46,18,34); ctx.closePath(); ctx.fill(); ctx.stroke();
    // cauda
    ctx.beginPath(); ctx.moveTo(20,35); ctx.lineTo(6,42); ctx.lineTo(12,34); ctx.lineTo(4,32); ctx.lineTo(18,30); ctx.closePath(); ctx.fill(); ctx.stroke();
    // asa da frente
    ctx.beginPath(); ctx.moveTo(34,28); ctx.quadraticCurveTo(38,6,56,4); ctx.quadraticCurveTo(52,18,42,32); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.restore();
    // cabeça e bico
    ctx.fillStyle="#fff"; ctx.strokeStyle="#8a98ad"; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(50,27,6,0,Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.fillStyle="#f2a23a"; ctx.beginPath(); ctx.moveTo(55,26); ctx.lineTo(62,28); ctx.lineTo(55,30); ctx.closePath(); ctx.fill();
    ctx.fillStyle="#111"; ctx.beginPath(); ctx.arc(51,25.5,1.4,0,Math.PI*2); ctx.fill();
    // ramo de oliveira
    ctx.strokeStyle="#4a7a30"; ctx.lineWidth=1.8; ctx.beginPath(); ctx.moveTo(56,30); ctx.quadraticCurveTo(58,38,50,42); ctx.stroke();
    ctx.fillStyle="#6fb04a"; for(const [x,y] of [[53,41],[57,37],[50,43]]){ ctx.beginPath(); ctx.ellipse(x,y,3,1.5,-0.7,0,Math.PI*2); ctx.fill(); }
    tex.refresh();
  }
  // ── Olho vigilante (inimigo voador, ex-«drone_hostil», 64×52) ──
  if(!scene.textures.exists("drone_hostil")){
    const tex=scene.textures.createCanvas("drone_hostil",64,52), ctx=tex.getContext();
    // asas de morcego
    ctx.fillStyle="#2a1a3a"; ctx.strokeStyle="#0e0818"; ctx.lineWidth=2;
    for(const sx of [-1,1]){
      ctx.beginPath(); ctx.moveTo(32+sx*14,26); ctx.lineTo(32+sx*30,8); ctx.lineTo(32+sx*26,22); ctx.lineTo(32+sx*32,30); ctx.lineTo(32+sx*22,32); ctx.lineTo(32+sx*26,42); ctx.lineTo(32+sx*14,36); ctx.closePath(); ctx.fill(); ctx.stroke();
    }
    // globo ocular
    const g=ctx.createRadialGradient(28,22,2,32,26,17); g.addColorStop(0,"#ffffff"); g.addColorStop(1,"#e8d8d8");
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(32,26,16,0,Math.PI*2); ctx.fill(); ctx.strokeStyle="#4a0e12"; ctx.lineWidth=2.4; ctx.stroke();
    // veias
    ctx.strokeStyle="rgba(200,40,50,0.55)"; ctx.lineWidth=1; for(const [x1,y1,x2,y2] of [[18,22,24,25],[46,20,40,24],[20,34,26,30],[44,34,38,30]]){ ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke(); }
    // íris e pupila
    ctx.fillStyle="#d9262a"; ctx.beginPath(); ctx.arc(32,27,8,0,Math.PI*2); ctx.fill(); ctx.strokeStyle="#4a0408"; ctx.lineWidth=1.6; ctx.stroke();
    ctx.fillStyle="#000"; ctx.beginPath(); ctx.ellipse(32,27,2.6,6,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle="rgba(255,255,255,0.85)"; ctx.beginPath(); ctx.arc(29,23.5,1.8,0,Math.PI*2); ctx.fill();
    // pálpebra zangada
    ctx.fillStyle="#2a1a3a"; ctx.strokeStyle="#0e0818"; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(15,19); ctx.lineTo(32,10); ctx.lineTo(49,19); ctx.lineTo(49,14); ctx.lineTo(32,5); ctx.lineTo(15,14); ctx.closePath(); ctx.fill(); ctx.stroke();
    tex.refresh();
  }

  // Coração — vermelho vivo, grande, com brilho e gradiente
  if(!scene.textures.exists("item_heart")){
    const tex=scene.textures.createCanvas("item_heart",44,40), ctx=tex.getContext();
    const cx=22, cy=20;

    // Função para desenhar o coração centrado
    function heartPath(){
      ctx.beginPath();
      ctx.moveTo(cx, cy+12);
      // Lado esquerdo
      ctx.bezierCurveTo(cx-2, cy+10, cx-14, cy+4, cx-14, cy-4);
      ctx.bezierCurveTo(cx-14, cy-13, cx-6, cy-15, cx, cy-8);
      // Lado direito
      ctx.bezierCurveTo(cx+6, cy-15, cx+14, cy-13, cx+14, cy-4);
      ctx.bezierCurveTo(cx+14, cy+4, cx+2, cy+10, cx, cy+12);
      ctx.closePath();
    }

    // Sombra exterior rosada
    ctx.shadowColor="rgba(255,80,80,0.55)"; ctx.shadowBlur=10;
    const hg=ctx.createRadialGradient(cx-3,cy-5,2,cx,cy,16);
    hg.addColorStop(0,"#ff6080");
    hg.addColorStop(0.4,"#ff2040");
    hg.addColorStop(0.8,"#cc0020");
    hg.addColorStop(1,"#990010");
    ctx.fillStyle=hg;
    heartPath(); ctx.fill();
    ctx.shadowBlur=0;

    // Contorno fino
    ctx.strokeStyle="rgba(140,0,20,0.5)"; ctx.lineWidth=1.2;
    heartPath(); ctx.stroke();

    // Brilho principal (oval branco no canto superior esquerdo)
    ctx.fillStyle="rgba(255,255,255,0.55)";
    ctx.beginPath(); ctx.ellipse(cx-5,cy-6,5,7,Math.PI*0.35,0,Math.PI*2); ctx.fill();

    // Brilho secundário (pequeno)
    ctx.fillStyle="rgba(255,255,255,0.30)";
    ctx.beginPath(); ctx.ellipse(cx+4,cy-3,3,4,Math.PI*0.2,0,Math.PI*2); ctx.fill();

    tex.refresh();
  }

  // Duplo Salto — asa azul luminosa com fundo circular
  if(!scene.textures.exists("item_duplosalto")){
    const tex=scene.textures.createCanvas("item_duplosalto",64,56), ctx=tex.getContext();
    const cx=32, cy=30;

    // ── Fundo circular azul-celeste ────────────────────────────
    const bg=ctx.createRadialGradient(cx,cy,1,cx,cy,24);
    bg.addColorStop(0,"#eaf9ff"); bg.addColorStop(0.4,"#7dd6ff");
    bg.addColorStop(0.85,"#1a8fe0"); bg.addColorStop(1,"#0050a0");
    ctx.fillStyle=bg;
    ctx.beginPath(); ctx.arc(cx,cy,24,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle="rgba(255,255,255,0.80)"; ctx.lineWidth=2;
    ctx.beginPath(); ctx.arc(cx,cy,23,0,Math.PI*2); ctx.stroke();

    // ── Desenho de asa (reutilizável para esq. e dir.) ─────────
    function wing(dir) { // dir = -1 esq, +1 dir
      ctx.save();
      ctx.translate(cx + dir*3, cy+2);
      ctx.scale(dir, 1);

      // Silhueta principal da asa — forma de asa de anjo
      const wg = ctx.createLinearGradient(0,-14,26,4);
      wg.addColorStop(0,"#fffbe0");
      wg.addColorStop(0.45,"#ffd740");
      wg.addColorStop(1,"#e08000");
      ctx.fillStyle = wg;
      ctx.beginPath();
      ctx.moveTo(0, 4);                         // base interior
      ctx.bezierCurveTo( 4,  4,  8, -2, 12,-10); // bordo superior
      ctx.bezierCurveTo(18,-16, 26,-14, 28, -6); // ponta da asa
      ctx.bezierCurveTo(24,  2, 16,  6,  8,  8); // bordo inferior
      ctx.bezierCurveTo( 4,  8,  0,  6,  0,  4);
      ctx.closePath();
      ctx.fill();

      // Contorno fino
      ctx.strokeStyle="rgba(160,80,0,0.50)"; ctx.lineWidth=0.8;
      ctx.stroke();

      // ── 4 penas sobrepostas ──────────────────────────────────
      const penas = [
        {x:4,  y:2,  a:-0.30, l:12, w:3.2},
        {x:9,  y:-2, a:-0.52, l:14, w:3.5},
        {x:15, y:-6, a:-0.72, l:14, w:3.2},
        {x:21, y:-9, a:-0.88, l:11, w:2.6},
      ];
      penas.forEach((p,i)=>{
        const t = i/3;
        const c1 = `rgba(255,${245-i*20},${100-i*15},0.95)`;
        const c2 = `rgba(255,${220-i*20},${60-i*10},0)`;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.a);
        const fg=ctx.createLinearGradient(0,-p.w/2, p.l, p.w/2);
        fg.addColorStop(0,c1); fg.addColorStop(0.6,c1); fg.addColorStop(1,c2);
        ctx.fillStyle=fg;
        // Pena com forma ligeiramente arqueada
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.bezierCurveTo(p.l*0.3,-p.w*0.7, p.l*0.7,-p.w*0.5, p.l,0);
        ctx.bezierCurveTo(p.l*0.7, p.w*0.5, p.l*0.3, p.w*0.7, 0,0);
        ctx.fill();
        // Veia central
        ctx.strokeStyle="rgba(200,120,0,0.35)"; ctx.lineWidth=0.7;
        ctx.beginPath(); ctx.moveTo(1,0); ctx.lineTo(p.l-2,0); ctx.stroke();
        ctx.restore();
      });

      // Brilho topo da asa
      ctx.fillStyle="rgba(255,255,255,0.30)";
      ctx.beginPath();
      ctx.moveTo(2, 2);
      ctx.bezierCurveTo(5,-6, 14,-12, 20,-8);
      ctx.bezierCurveTo(14,-5, 6,-2, 2, 2);
      ctx.fill();

      ctx.restore();
    }

    wing(-1); // asa esquerda
    wing(1);  // asa direita

    // ── Setas ↑↑ douradas com contorno ────────────────────────
    [[cy-8],[cy+2]].forEach(([ay])=>{
      ctx.fillStyle="#ffe040"; ctx.strokeStyle="#7a4000"; ctx.lineWidth=1.2;
      ctx.beginPath();
      ctx.moveTo(cx,     ay-5);   // ponta
      ctx.lineTo(cx-5,   ay+1);
      ctx.lineTo(cx-2.5, ay+1);
      ctx.lineTo(cx-2.5, ay+5);
      ctx.lineTo(cx+2.5, ay+5);
      ctx.lineTo(cx+2.5, ay+1);
      ctx.lineTo(cx+5,   ay+1);
      ctx.closePath();
      ctx.fill(); ctx.stroke();
    });

    // Brilho central
    ctx.fillStyle="rgba(255,255,255,0.55)";
    ctx.beginPath(); ctx.ellipse(cx,cy-6,5,4,0,0,Math.PI*2); ctx.fill();

    tex.refresh();
  }
}

// ===== VanBerto — robozinho 100% original do jogo da UE =====
function rrVan(ctx,x,y,w,h,r){
  const rr=Math.min(r,w/2,h/2);
  ctx.beginPath();ctx.moveTo(x+rr,y);ctx.arcTo(x+w,y,x+w,y+h,rr);ctx.arcTo(x+w,y+h,x,y+h,rr);ctx.arcTo(x,y+h,x,y,rr);ctx.arcTo(x,y,x+w,y,rr);ctx.closePath();
}
function cVan(ctx,x,y,r){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}
function cfVan(ctx,x,y,r,color){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();}
function lVan(ctx,x1,y1,x2,y2){ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();}

function makeVanBertoTexture(scene,key,blink,step,armsUp){
  if(scene.textures.exists(key)) return;
  const w=96,h=96, tex=scene.textures.createCanvas(key,w,h), ctx=tex.getContext();
  ctx.clearRect(0,0,w,h);
  ctx.lineJoin="round"; ctx.lineCap="round";
  // Desloca todo o desenho 6px para baixo para o halo da antena (y≈0) não ser cortado.
  // O setOffset do corpo físico foi ajustado em igual medida para o robô ficar na mesma posição no ecrã.
  ctx.save(); ctx.translate(0, 6);
  const NAVY="#16233e", NAVY2="#26365a", OUT="#101a30";
  function white(x0,y0,x1,y1){const g=ctx.createLinearGradient(x0,y0,x1,y1);g.addColorStop(0,"#ffffff");g.addColorStop(0.55,"#e6edf7");g.addColorStop(1,"#b4c4dc");return g;}

  // ===== PERNAS (bem visíveis por baixo do tronco; passo marcado) =====
  const LIFT=8, STRIDE=3;
  let lTop=70, rTop=70, lDX=0, rDX=0;          // topo da coxa; planta=70 -> pé a y=88
  if(step===0){ lTop=70-LIFT; lDX=STRIDE; rDX=-STRIDE; }
  else if(step===1){ rTop=70-LIFT; rDX=STRIDE; lDX=-STRIDE; }
  function leg(cx,top){
    rrVan(ctx,cx-5,top,10,11,4.5); ctx.fillStyle=white(cx-5,top,cx+5,top); ctx.fill();
    ctx.lineWidth=2.6; ctx.strokeStyle=OUT; ctx.stroke();
    const fy=top+9;
    rrVan(ctx,cx-6.5,fy,13,9,4); ctx.fillStyle=NAVY; ctx.fill();
    ctx.lineWidth=2.6; ctx.strokeStyle=OUT; ctx.stroke();
    rrVan(ctx,cx-6.5,fy+2,13,2.4,1.2); ctx.fillStyle="rgba(255,255,255,0.85)"; ctx.fill();
    cfVan(ctx,cx-2.5,fy+4.5,1.4,"rgba(255,255,255,0.5)");
  }
  leg(41+lDX,lTop); leg(55+rDX,rTop);

  // ===== BRAÇOS (curtos e encostados; balançam ao contrário da perna do
  // mesmo lado — braço esquerdo para trás quando a perna esquerda avança,
  // tal como um passo natural — só nos frames de caminhar, step 0/1) =====
  // Frame de salto (armsUp=true): braços erguidos quase direitos para cima,
  // só com uma ligeira inclinação para fora — ignora o balanço de andar,
  // usa outro ângulo. (Era 2.4 rad, o que punha as mãos longe do corpo,
  // com um ar "descolado"; a 2.9 rad ficam coladas à cabeça, só saindo
  // ligeiramente para os lados.)
  const ARM_SWING = 0.24; // radianos
  const JUMP_RAISE = 2.9; // radianos — braço roda de "para baixo" para "quase direito para cima"
  let lArmSwing = 0, rArmSwing = 0;
  if(armsUp){ lArmSwing = JUMP_RAISE; rArmSwing = -JUMP_RAISE; }
  else if(step===0){ lArmSwing=-ARM_SWING; rArmSwing=ARM_SWING; }
  else if(step===1){ lArmSwing=ARM_SWING; rArmSwing=-ARM_SWING; }
  function arm(sx,swing){
    ctx.save();
    const px=sx+4.5, py=52; // pivô no ombro
    ctx.translate(px,py); ctx.rotate(swing); ctx.translate(-px,-py);
    rrVan(ctx,sx,52,9,13,4.5); ctx.fillStyle=white(sx,52,sx+9,52); ctx.fill();
    ctx.lineWidth=2.6; ctx.strokeStyle=OUT; ctx.stroke();
    const hx=sx+4.5, hy=67;
    cfVan(ctx,hx,hy,5,NAVY);
    ctx.lineWidth=2.3; ctx.strokeStyle=OUT; ctx.beginPath(); ctx.arc(hx,hy,5,0,Math.PI*2); ctx.stroke();
    cfVan(ctx,hx-2,hy+1.6,1.4,NAVY2); cfVan(ctx,hx+0.5,hy+2.4,1.4,NAVY2); cfVan(ctx,hx+2.5,hy+1.6,1.4,NAVY2);
    ctx.restore();
  }
  arm(17,lArmSwing); arm(70,rArmSwing);

  // ===== TRONCO (estreito: x26–70, igual à cabeça) =====
  rrVan(ctx,26,44,44,32,15); ctx.fillStyle=white(28,46,68,46); ctx.fill();
  ctx.save(); rrVan(ctx,26,44,44,32,15); ctx.clip();
  const wg=ctx.createLinearGradient(0,64,0,76); wg.addColorStop(0,"rgba(22,35,62,0)"); wg.addColorStop(0.4,"#1c2c4c"); wg.addColorStop(1,"#142038");
  ctx.fillStyle=wg; ctx.fillRect(26,62,44,16);
  ctx.strokeStyle="rgba(16,26,48,0.6)"; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(28,64); ctx.lineTo(68,64); ctx.stroke();
  ctx.fillStyle="rgba(255,255,255,0.5)"; ctx.beginPath(); ctx.ellipse(36,52,9,5.5,-0.5,0,Math.PI*2); ctx.fill();
  ctx.restore();
  ctx.lineWidth=3; ctx.strokeStyle=OUT; rrVan(ctx,26,44,44,32,15); ctx.stroke();

  // ===== PAINEL DO PEITO =====
  cfVan(ctx,48,56,8,NAVY);
  ctx.lineWidth=2.5; ctx.strokeStyle=OUT; ctx.beginPath(); ctx.arc(48,56,8,0,Math.PI*2); ctx.stroke();
  const dome=ctx.createRadialGradient(45.5,53.5,1,48,56,7); dome.addColorStop(0,"#aebccf"); dome.addColorStop(0.6,"#5a6a85"); dome.addColorStop(1,"#2b3a57");
  ctx.fillStyle=dome; ctx.beginPath(); ctx.arc(48,56,5.7,0,Math.PI*2); ctx.fill();
  cfVan(ctx,46,53.8,1.5,"rgba(255,255,255,0.85)");

  // ===== EAR PODS (atrás do capacete) =====
  function pod(cx){
    cfVan(ctx,cx,32,6,NAVY);
    ctx.lineWidth=2.3; ctx.strokeStyle=OUT; ctx.beginPath(); ctx.arc(cx,32,6,0,Math.PI*2); ctx.stroke();
    cfVan(ctx,cx,32,2.8,NAVY2); cfVan(ctx,cx-0.8,31,1,"rgba(255,255,255,0.6)");
  }
  pod(25); pod(71);

  // ===== ANTENA =====
  ctx.fillStyle=NAVY; ctx.beginPath(); ctx.moveTo(45,16); ctx.lineTo(51,16); ctx.lineTo(49.2,8); ctx.lineTo(46.8,8); ctx.closePath(); ctx.fill();
  const halo=ctx.createRadialGradient(48,5,1,48,5,11); halo.addColorStop(0,"rgba(90,200,255,0.55)"); halo.addColorStop(1,"rgba(90,200,255,0)");
  ctx.fillStyle=halo; ctx.beginPath(); ctx.arc(48,5,11,0,Math.PI*2); ctx.fill();
  const bg=ctx.createRadialGradient(46.3,3.5,0.5,48,5,5.5); bg.addColorStop(0,"#e6f7ff"); bg.addColorStop(0.4,"#48b4ff"); bg.addColorStop(1,"#1670d8");
  ctx.fillStyle=bg; ctx.beginPath(); ctx.arc(48,5,5.5,0,Math.PI*2); ctx.fill();
  cfVan(ctx,46.2,3.4,1.6,"#ffffff");

  // ===== CAPACETE =====
  rrVan(ctx,26,14,44,34,17); ctx.fillStyle=white(28,15,68,15); ctx.fill();
  ctx.lineWidth=3; ctx.strokeStyle=OUT; ctx.stroke();
  ctx.save(); rrVan(ctx,26,14,44,34,17); ctx.clip();
  ctx.fillStyle="rgba(255,255,255,0.6)"; ctx.beginPath(); ctx.ellipse(38,19,10,4,-0.5,0,Math.PI*2); ctx.fill(); ctx.restore();

  // ===== MOLDURA + VISEIRA =====
  rrVan(ctx,30,20,36,23,12); ctx.fillStyle=NAVY; ctx.fill();
  rrVan(ctx,32.5,22,31,19,10);
  const vg=ctx.createLinearGradient(0,22,0,41); vg.addColorStop(0,"#7fd4ff"); vg.addColorStop(0.5,"#2a9bf0"); vg.addColorStop(1,"#1366c6");
  ctx.fillStyle=vg; ctx.fill();
  ctx.save(); rrVan(ctx,32.5,22,31,19,10); ctx.clip();
  ctx.fillStyle="rgba(255,255,255,0.45)"; ctx.beginPath(); ctx.ellipse(42,25,9,3.5,-0.4,0,Math.PI*2); ctx.fill(); ctx.restore();

  // ===== OLHOS =====
  if(!blink){
    ctx.fillStyle="#0a0f1c";
    ctx.beginPath(); ctx.ellipse(41,30,3.3,4,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(55,30,3.3,4,0,0,Math.PI*2); ctx.fill();
    cfVan(ctx,42.3,28.4,1.5,"#fff"); cfVan(ctx,39.9,31,0.8,"#fff");
    cfVan(ctx,56.3,28.4,1.5,"#fff"); cfVan(ctx,53.9,31,0.8,"#fff");
  } else if(blink==="wink"){
    // pisca-olho brincalhão — olho esquerdo aberto normal, direito fechado num arco
    ctx.fillStyle="#0a0f1c";
    ctx.beginPath(); ctx.ellipse(41,30,3.3,4,0,0,Math.PI*2); ctx.fill();
    cfVan(ctx,42.3,28.4,1.5,"#fff"); cfVan(ctx,39.9,31,0.8,"#fff");
    ctx.lineWidth=3; ctx.strokeStyle="#0a0f1c"; ctx.lineCap="round";
    ctx.beginPath(); ctx.arc(55,31,3.5,0.15*Math.PI,0.85*Math.PI); ctx.stroke();
  } else if(blink==="happy"){
    // sorriso grande e feliz — olhos fechados em arco (mais generosos que o piscar normal)
    // + bochechas coradas, para se distinguir claramente do sorriso base neutro.
    ctx.lineWidth=3.2; ctx.strokeStyle="#0a0f1c"; ctx.lineCap="round";
    ctx.beginPath(); ctx.arc(41,31,3.9,0.10*Math.PI,0.90*Math.PI); ctx.stroke();
    ctx.beginPath(); ctx.arc(55,31,3.9,0.10*Math.PI,0.90*Math.PI); ctx.stroke();
    cfVan(ctx,33.5,35.5,3,"rgba(255,120,120,0.55)");
    cfVan(ctx,62.5,35.5,3,"rgba(255,120,120,0.55)");
  } else if(blink==="sad"){
    // sobrancelhas preocupadas (inclinadas para cima no centro) + olhos tristes + lágrima
    ctx.strokeStyle="#0a0f1c"; ctx.lineWidth=2.3; ctx.lineCap="round";
    ctx.beginPath(); ctx.moveTo(37,24); ctx.lineTo(44.5,27); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(59,24); ctx.lineTo(51.5,27); ctx.stroke();
    ctx.fillStyle="#0a0f1c";
    ctx.beginPath(); ctx.ellipse(41,32,2.8,3.1,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(55,32,2.8,3.1,0,0,Math.PI*2); ctx.fill();
    cfVan(ctx,42,30.7,1.1,"#fff"); cfVan(ctx,56,30.7,1.1,"#fff");
    // lagrimazinha a escorrer do olho direito
    ctx.fillStyle="#6fd0ff";
    ctx.beginPath();
    ctx.moveTo(56,35); ctx.quadraticCurveTo(59,40,56,43.5); ctx.quadraticCurveTo(53,40,56,35);
    ctx.closePath(); ctx.fill();
  } else {
    // piscar feliz — arcos ^_^
    ctx.lineWidth=3; ctx.strokeStyle="#0a0f1c";
    ctx.beginPath(); ctx.arc(41,31,3.5,0.15*Math.PI,0.85*Math.PI); ctx.stroke();
    ctx.beginPath(); ctx.arc(55,31,3.5,0.15*Math.PI,0.85*Math.PI); ctx.stroke();
  }
  // ===== BOCA — sorriso aberto e contente (variantes: maior no pisca-olho/feliz, invertida na tristeza) =====
  ctx.fillStyle="#0a0f1c";
  if(blink==="wink"){
    ctx.beginPath(); ctx.ellipse(48,36,5.6,3.6,0,0,Math.PI); ctx.fill();   // sorriso maroto, um pouco mais largo
    ctx.fillStyle="#ff7a7a";
    ctx.beginPath(); ctx.ellipse(48,37.6,2.9,1.7,0,0,Math.PI); ctx.fill();
  } else if(blink==="happy"){
    ctx.beginPath(); ctx.ellipse(48,36,6.2,4.2,0,0,Math.PI); ctx.fill();   // sorriso grande, o maior de todos
    ctx.fillStyle="#ff7a7a";
    ctx.beginPath(); ctx.ellipse(48,38,3.2,1.9,0,0,Math.PI); ctx.fill();
  } else if(blink==="sad"){
    // boca triste — arco invertido, cantos para baixo (sem preenchimento, só o traço)
    ctx.strokeStyle="#0a0f1c"; ctx.lineWidth=2.4; ctx.lineCap="round";
    ctx.beginPath(); ctx.arc(48,40,4.2,Math.PI,Math.PI*2); ctx.stroke();
  } else {
    ctx.beginPath(); ctx.ellipse(48,36,4.6,3.2,0,0,Math.PI); ctx.fill();   // metade de baixo = sorriso
    ctx.fillStyle="#ff7a7a";
    ctx.beginPath(); ctx.ellipse(48,37.4,2.4,1.5,0,0,Math.PI); ctx.fill(); // línguinha
  }

  // Cravo vermelho na lapela (peito, à esquerda) — o VanBerto's veste Abril
  drawCarnation(ctx,33,56,7,{hi:"#ff6a7a",lo:"#d9102a",stroke:"#7a0014"},true);
  ctx.restore();
  tex.refresh();
}
