// Return to Treasure Island - Game Logic (game.js)

// Game State
let gameState = {
  playerName: '',
  selectedCompanion: '',
  selectedDifficulty: 'hard', // 'easy', 'medium', or 'hard'
  gameQuestions: [],
  currentQuestionIdx: 0,
  score: 0,
  incorrectAttempts: 0,
  canAnswer: true,
  health: 10
};

// Companion Characters Definition
const COMPANIONS = {
  flint: {
    name: "鸚鵡 弗林特",
    desc: "弗林特船長留下來的毒舌大天王，停在你的肩膀上。",
    trait: "毒舌毒語、熱愛金幣",
    avatar: `<svg viewBox="0 0 100 100" class="char-avatar-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Parrot Avatar -->
      <circle cx="50" cy="45" r="30" fill="#e74c3c"/>
      <path d="M 50 15 C 65 15, 75 25, 75 45 C 75 55, 65 65, 50 65 C 35 65, 25 55, 25 45 C 25 25, 35 15, 50 15 Z" fill="#e74c3c"/>
      <!-- Belly -->
      <circle cx="50" cy="55" r="18" fill="#f1c40f"/>
      <!-- Eyes -->
      <circle cx="40" cy="38" r="6" fill="#fff"/>
      <circle cx="40" cy="38" r="3" fill="#000"/>
      <circle cx="60" cy="38" r="6" fill="#fff"/>
      <circle cx="60" cy="38" r="3" fill="#000"/>
      <!-- Beak -->
      <path d="M 45 42 L 55 42 L 50 56 Z" fill="#f39c12"/>
      <path d="M 47 42 C 47 48, 53 48, 53 42 Z" fill="#d35400"/>
      <!-- Crest -->
      <path d="M 42 16 Q 35 8, 48 10 Q 52 2, 58 12" stroke="#e74c3c" stroke-width="4" fill="none" stroke-linecap="round"/>
    </svg>`,
    dialogues: {
      greet: [
        "嘎！看什麼看！沒看過會算數的英俊鸚鵡嗎？帶上我，我會盯著你的！",
        "嘎！把你的金幣準備好，我的伙食費可是很貴的！",
        "嘎！西爾弗那個木腿老賊正在後面流口水呢，快點走！"
      ],
      click: [
        "嘎！別戳我！再戳我就把你的寶藏座標告訴西爾弗！",
        "嘎！摸一摸要付一個銀幣！不准賒帳！",
        "嘎！本鸚鵡頭上這幾根毛可是弗林特船長親自梳理的！別碰！"
      ],
      correct: [
        "嘎！算得好！八里亞爾！八里亞爾！這題連西爾弗那傢伙都算不出來！",
        "嘎！聰明！弗林特船長在地下都要為你吹口哨了！",
        "嘎！看在你算對的份上，分我一顆起司，不，一顆金幣！"
      ],
      wrong: [
        "嘎！笨蛋！你的數學是跟鯊魚學的嗎？再算一次，不然就把你丟下海餵魚！",
        "嘎！算錯了！你這智商只配去擦甲板！西爾弗追上來你就等著當餌吧！",
        "嘎！錯得太離譜了！我的羽毛都被你氣炸了！"
      ]
    }
  },
  jim: {
    name: "少年 吉姆",
    desc: "勇敢又機智的冒險主角。",
    trait: "溫柔堅定、觀察敏銳",
    avatar: `<svg viewBox="0 0 100 100" class="char-avatar-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Boy Jim Avatar -->
      <circle cx="50" cy="50" r="32" fill="#ffdbac"/>
      <!-- Hair -->
      <path d="M 18 40 Q 50 10, 82 40 Q 82 25, 70 20 Q 50 15, 30 20 Q 18 25, 18 40" fill="#6d4c41"/>
      <path d="M 18 40 C 15 35, 12 45, 18 50 Z" fill="#6d4c41"/>
      <path d="M 82 40 C 85 35, 88 45, 82 50 Z" fill="#6d4c41"/>
      <!-- Eyes -->
      <circle cx="38" cy="48" r="4" fill="#2c3e50"/>
      <circle cx="62" cy="48" r="4" fill="#2c3e50"/>
      <!-- Smile -->
      <path d="M 44 60 Q 50 66, 56 60" stroke="#c0392b" stroke-width="3" fill="none" stroke-linecap="round"/>
      <!-- Pirate Bandana -->
      <path d="M 20 32 Q 50 20, 80 32 L 82 25 Q 50 12, 18 25 Z" fill="#2980b9"/>
      <!-- Bandana Knot -->
      <path d="M 18 25 C 10 22, 12 15, 20 20 Z" fill="#2980b9"/>
    </svg>`,
    dialogues: {
      greet: [
        "你好！我叫吉姆。我們一定要同心協力，趕在西爾弗之前找到寶藏！",
        "嗨！我的計算紙已經準備好了，讓我們算清地圖上的每一海哩！"
      ],
      click: [
        "我的指南針指著前方，我們準備好出發了嗎？",
        "別擔心，雖然叛變的海盜很多，但我們有數學這個最強武器！",
        "你看，地圖上的紅墨水X好像在發光呢！"
      ],
      correct: [
        "太厲害了！你的邏輯跟指南針一樣精準，我們離黃金又近了一步！",
        "好球！這解題速度，西爾弗用兩條腿跑都追不上你！",
        "沒錯！連醫生都會為你的運算感到驚奇！"
      ],
      wrong: [
        "別慌張！海盜們快追上來了，我們沉住氣，重新檢查一下數據！",
        "哎呀，這個陷阱有點深。別灰心，我們換個思路算算看！",
        "西爾弗的腳步聲越來越近了，我們得加快速度，重新推導一下！"
      ]
    }
  },
  bengunn: {
    name: "老水手 班·甘恩",
    desc: "被流放在荒島三年、瘋瘋癲癲但極其敏銳的老海盜。",
    trait: "極度渴望起司、瘋癲狂熱",
    avatar: `<svg viewBox="0 0 100 100" class="char-avatar-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Old Ben Gunn Avatar -->
      <circle cx="50" cy="50" r="32" fill="#e0a96d"/>
      <!-- Beard -->
      <path d="M 20 52 C 20 80, 80 80, 80 52 Z" fill="#e0e0e0"/>
      <circle cx="50" cy="50" r="30" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="2 2"/>
      <!-- Wild Hair -->
      <path d="M 22 42 Q 10 20, 35 25 Q 50 8, 65 25 Q 90 20, 78 42" stroke="#e0e0e0" stroke-width="8" fill="none" stroke-linecap="round"/>
      <!-- Eyes (one slightly larger for crazy look) -->
      <circle cx="38" cy="44" r="5" fill="#000"/>
      <circle cx="38" cy="44" r="2" fill="#fff"/>
      <circle cx="62" cy="44" r="7" fill="#000"/>
      <circle cx="62" cy="44" r="3" fill="#fff"/>
      <!-- Nose -->
      <path d="M 50 42 Q 44 52, 50 54 Q 52 54, 50 42" fill="#d35400"/>
      <!-- Mouth -->
      <path d="M 42 62 Q 50 56, 58 62" stroke="#2c3e50" stroke-width="3" fill="none"/>
    </svg>`,
    dialogues: {
      greet: [
        "起司！起司！你帶起司來了嗎？三年了，我都快忘了起司的滋味！沒有？那好吧，解謎去！",
        "噢！活生生的人！我跟椰子樹說了三年話，牠們從來不幫我算因數倍數！"
      ],
      click: [
        "椰子是個好東西，但如果有起司……噢，熱騰騰的起司！",
        "如果你在寶藏箱裡看到起司，請全部留給我，黃金都歸你！",
        "我把藏寶圖的線索藏在野山羊的耳朵裡了……開玩笑的，哈哈！"
      ],
      correct: [
        "喔喔喔！對了！太聰明了！這比起司還要提神！用我的雙手為你歡呼！",
        "噢天哪！你簡真是數學界的弗林特船長！太準確了！",
        "答對了！我要用野山羊的奶來為你慶祝！"
      ],
      wrong: [
        "哎呀！氣得我差點把手裡的羊肉弄丟了！不是這塊石頭，再換一塊石頭踩踩看！",
        "不對不對！椰子砸在頭上都比這個答案正確！快醒醒！",
        "啊！野山羊聽了這個答案都嚇得跳進海裡了！我們再算一次！"
      ]
    }
  },
  squire: {
    name: "鄉紳 特里勞尼",
    desc: "槍法極準、講話豪爽大方、身材高大的贊助人。",
    trait: "豪爽大氣、火槍神射手",
    avatar: `<svg viewBox="0 0 100 100" class="char-avatar-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Squire Avatar -->
      <circle cx="50" cy="48" r="32" fill="#ffd1a9"/>
      <!-- Aristocrat Hair / Wig -->
      <path d="M 18 42 C 18 20, 82 20, 82 42" fill="#f5f5f5" stroke="#dbdbdb" stroke-width="2"/>
      <circle cx="22" cy="44" r="10" fill="#f5f5f5"/>
      <circle cx="78" cy="44" r="10" fill="#f5f5f5"/>
      <!-- Pirate Hat -->
      <path d="M 12 28 Q 50 10, 88 28 Q 50 35, 12 28 Z" fill="#2c3e50"/>
      <path d="M 25 24 L 50 8 L 75 24 Z" fill="#2c3e50"/>
      <path d="M 50 18 L 50 24" stroke="#ffd700" stroke-width="4"/>
      <!-- Eyes -->
      <circle cx="38" cy="46" r="4" fill="#2c3e50"/>
      <circle cx="62" cy="46" r="4" fill="#2c3e50"/>
      <!-- Mustache -->
      <path d="M 35 56 Q 50 50, 65 56 Q 50 62, 35 56 Z" fill="#7f8c8d"/>
      <!-- Mouth -->
      <path d="M 45 64 Q 50 68, 55 64" stroke="#2c3e50" stroke-width="2" fill="none"/>
    </svg>`,
    dialogues: {
      greet: [
        "國內外知名船隻我都坐過，但像你這麼會算數的年輕人，我是第一次見！哈哈哈！",
        "哈哈哈！我是鄉紳特里勞尼。我的船已經準備就緒，讓我們向著海平線開火！"
      ],
      click: [
        "哈哈哈！我的火槍已經裝滿彈藥，儘管前進吧！",
        "西爾弗那個老廚子只會烤肉，根本不懂幾何學，哈哈哈！",
        "我的金幣堆得像小山一樣，只要你能通關，隨你拿！"
      ],
      correct: [
        "哈哈哈！這解題速度……快趕上我的火槍子彈了！真不愧是我看中的水手！",
        "好！這才是大英帝國最頂尖的腦袋！重賞！通通有賞！",
        "精準命中！就像我的滑膛槍在五十碼外打中海盜的帽子一樣！"
      ],
      wrong: [
        "卡住了嗎？打起精神來！伊斯班紐拉號的錨已經收起來了，我們沒有退路啦！",
        "天啊，你的算術偏得像逆風航行的帆船一樣！修正航向，再來一次！",
        "別氣餒！火槍子彈有時也會受風偏影響，調整一下準星重新算！"
      ]
    }
  }
};

// Web Audio API Context
let audioCtx = null;

// Initialize Web Audio Context on interaction
function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

// Synthesize Correct Sound (Cheers sound: Detuned shouting chorus + rising major chord)
function playCorrectCheersSound() {
  initAudio();
  if (!audioCtx) return;

  const now = audioCtx.currentTime;
  
  // 1. Shouting Cheer
  const detunes = [-10, 0, 10];
  detunes.forEach((detune) => {
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(260 + detune, now);
    osc.frequency.exponentialRampToValueAtTime(320 + detune, now + 0.15);
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.12, now + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start(now);
    osc.stop(now + 0.3);
  });

  // Noise burst for cheer vocal sibilant
  const bufferSize = Math.floor(audioCtx.sampleRate * 0.2);
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;
  
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(800, now);
  filter.frequency.linearRampToValueAtTime(400, now + 0.15);
  filter.Q.setValueAtTime(2, now);
  
  const noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(0.1, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
  
  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(audioCtx.destination);
  
  noise.start(now);
  noise.stop(now + 0.25);

  // 2. Rising happy arpeggio chord (C5 -> E5 -> G5 -> C6)
  const notes = [523.25, 659.25, 783.99, 1046.50];
  notes.forEach((freq, idx) => {
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + idx * 0.05);
    
    gainNode.gain.setValueAtTime(0, now + idx * 0.05);
    gainNode.gain.linearRampToValueAtTime(0.12, now + idx * 0.05 + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.5);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start(now + idx * 0.05);
    osc.stop(now + idx * 0.05 + 0.6);
  });
}

// Synthesize Wrong Sound (Seagull screech: sliding pitch sawtooth + bandpass filter)
function playSeagullSound() {
  initAudio();
  if (!audioCtx) return;

  const now = audioCtx.currentTime;
  
  const squawk = (startTime) => {
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(600, startTime);
    osc.frequency.linearRampToValueAtTime(1150, startTime + 0.08);
    osc.frequency.linearRampToValueAtTime(800, startTime + 0.16);
    
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1000, startTime);
    filter.frequency.exponentialRampToValueAtTime(1400, startTime + 0.1);
    filter.Q.setValueAtTime(3, startTime);
    
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.16, startTime + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);
    
    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start(startTime);
    osc.stop(startTime + 0.22);
  };
  
  // Two squawks (kyow-kyow!)
  squawk(now);
  squawk(now + 0.22);
}

// Synthesize Pirate Cheer Chorus ("Yo-Ho-Ho!" shout + Sea Shanty Chord)
function playPirateCheerSound() {
  initAudio();
  if (!audioCtx) return;

  const now = audioCtx.currentTime;
  
  // 1. Shouting Chorus Simulation (multiple detuned oscillators sweeping down)
  const detunes = [-15, -5, 5, 15];
  detunes.forEach((detune, idx) => {
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180 + detune, now);
    osc.frequency.exponentialRampToValueAtTime(90 + detune, now + 0.25);
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.15, now + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start(now);
    osc.stop(now + 0.35);
  });
  
  // Noise burst for breath/shout sound
  const bufferSize = Math.floor(audioCtx.sampleRate * 0.3); // 0.3 seconds
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  
  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;
  
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(500, now);
  filter.frequency.linearRampToValueAtTime(150, now + 0.25);
  filter.Q.setValueAtTime(3, now);
  
  const noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(0.2, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
  
  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(audioCtx.destination);
  
  noise.start(now);
  noise.stop(now + 0.35);
  
  // 2. Play a happy Sea-Shanty chord progression slightly after (after 0.35s)
  const shantyNotes = [329.63, 392.00, 523.25, 659.25]; // C Major Chord (E4, G4, C5, E5)
  shantyNotes.forEach((freq, idx) => {
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + 0.35 + idx * 0.05);
    
    gainNode.gain.setValueAtTime(0, now + 0.35 + idx * 0.05);
    gainNode.gain.linearRampToValueAtTime(0.18, now + 0.35 + idx * 0.05 + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35 + idx * 0.05 + 1.2);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start(now + 0.35 + idx * 0.05);
    osc.stop(now + 0.35 + idx * 0.05 + 1.5);
  });
}

// Canvas Visuals Engine (Fireworks & Coin Drops)
const canvas = document.getElementById('canvas-overlay');
const ctx = canvas.getContext('2d');

let particles = [];
let animFrameId = null;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Particle Class
class Particle {
  constructor(x, y, type = 'coin') {
    this.x = x;
    this.y = y;
    this.type = type; // 'coin', 'sparkle', 'firework'
    
    if (type === 'coin') {
      this.vx = (Math.random() * 8 - 4);
      this.vy = -(Math.random() * 10 + 5);
      this.radius = Math.random() * 6 + 8; // coin size
      this.gravity = 0.45;
      this.bounce = 0.6;
      this.spin = Math.random() * 360;
      this.spinSpeed = (Math.random() * 15 - 7.5);
      this.alpha = 1;
      this.color = `hsl(${Math.random() * 10 + 45}, 100%, ${Math.random() * 20 + 50}%)`; // Gold HSL
    } else if (type === 'firework') {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 7 + 3;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.radius = Math.random() * 2 + 2;
      this.gravity = 0.15;
      this.alpha = 1;
      this.decay = Math.random() * 0.015 + 0.01;
      this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
    } else if (type === 'sparkle') {
      this.vx = (Math.random() * 4 - 2);
      this.vy = -(Math.random() * 4 + 2);
      this.radius = Math.random() * 2 + 1;
      this.gravity = 0.05;
      this.alpha = 1;
      this.decay = 0.03;
      this.color = '#fff';
    }
  }

  update() {
    this.vx *= 0.99;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;

    if (this.type === 'coin') {
      this.spin += this.spinSpeed;
      // Floor collision
      if (this.y + this.radius > canvas.height) {
        this.y = canvas.height - this.radius;
        this.vy = -this.vy * this.bounce;
        this.vx *= 0.8; // friction
        if (Math.abs(this.vy) < 1.5) {
          this.alpha -= 0.01;
        }
      }
    } else if (this.type === 'firework' || this.type === 'sparkle') {
      this.alpha -= this.decay || 0.02;
    }
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    
    if (this.type === 'coin') {
      ctx.translate(this.x, this.y);
      ctx.rotate(this.spin * Math.PI / 180);
      
      // Draw shiny gold coin (ellipse to simulate spin)
      const scaleX = Math.abs(Math.sin(this.spin * Math.PI / 180));
      ctx.scale(scaleX || 0.05, 1);
      
      // Gold base
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      
      // Gold rim
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.strokeStyle = '#b8860b';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      // Gold symbol (X or star)
      ctx.fillStyle = '#b8860b';
      ctx.font = `bold ${this.radius * 0.9}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('$', 0, 0);
      
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
    
    ctx.restore();
  }
}

// Particle Loop
function updateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.draw();
    if (p.alpha <= 0) {
      particles.splice(i, 1);
    }
  }
  
  if (particles.length > 0) {
    animFrameId = requestAnimationFrame(updateParticles);
  } else {
    cancelAnimationFrame(animFrameId);
    animFrameId = null;
  }
}

// Trigger Coins Drop
function triggerCoinsDrop(count = 15, sourceX = canvas.width / 2, sourceY = canvas.height / 3) {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(sourceX, sourceY, 'coin'));
    if (Math.random() < 0.4) {
      particles.push(new Particle(sourceX, sourceY, 'sparkle'));
    }
  }
  if (!animFrameId) {
    updateParticles();
  }
}

// Trigger Firework Rocket
function triggerFirework(x, y) {
  const count = Math.floor(Math.random() * 30) + 50;
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y, 'firework'));
  }
  if (!animFrameId) {
    updateParticles();
  }
}

// Clear screen fireworks sequence
let victoryFireworkTimer = null;
function startVictoryCelebration() {
  // Continuous random fireworks + coins rain
  let count = 0;
  
  function launchRandom() {
    if (count > 25) {
      clearInterval(victoryFireworkTimer);
      return;
    }
    const x = Math.random() * (canvas.width - 200) + 100;
    const y = Math.random() * (canvas.height / 2) + 100;
    triggerFirework(x, y);
    triggerCoinsDrop(8, x, y);
    count++;
  }
  
  // Rain coins from top continuously for a bit
  const coinInterval = setInterval(() => {
    if (count > 25) {
      clearInterval(coinInterval);
      return;
    }
    const x = Math.random() * canvas.width;
    triggerCoinsDrop(3, x, -10);
  }, 150);
  
  victoryFireworkTimer = setInterval(launchRandom, 350);
}

// Helper to shuffle array
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Route Screens
function showScreen(screenId) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(s => {
    s.classList.remove('active');
    s.style.display = 'none';
  });
  
  const activeScreen = document.getElementById(screenId);
  activeScreen.style.display = 'flex';
  setTimeout(() => {
    activeScreen.classList.add('active');
  }, 20);
}

// Setup Event Listeners on Page Load
document.addEventListener('DOMContentLoaded', () => {
  // Render companion cards in Intro Screen
  renderCompanionSelection();
  
  // Action: Start Game (Intro -> Select Character)
  document.getElementById('btn-start-adventure').addEventListener('click', () => {
    const nameInput = document.getElementById('player-name').value.trim();
    if (!nameInput) {
      alert('請輸入您的冒險家姓名！');
      return;
    }
    gameState.playerName = nameInput;
    initAudio();
    showScreen('screen-character');
  });
  
  // Action: Confirm Companion selection and go to Screen 3 (Difficulty Selection)
  document.getElementById('btn-confirm-character').addEventListener('click', () => {
    if (!gameState.selectedCompanion) {
      alert('請選擇一位夥伴陪同您的冒險！');
      return;
    }
    initAudio();
    showScreen('screen-difficulty');
  });
  
  // Action: Difficulty Card click
  const diffCards = document.querySelectorAll('.diff-card');
  diffCards.forEach(card => {
    card.addEventListener('click', () => {
      diffCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      gameState.selectedDifficulty = card.getAttribute('data-diff');
      playChime();
    });
  });
  
  // Action: Confirm Difficulty and start gameplay
  document.getElementById('btn-start-gameplay').addEventListener('click', () => {
    initAudio();
    startGameplay();
  });
  
  // Action: Companion clicked in gameplay (gives random dialog)
  document.getElementById('companion-avatar-area').addEventListener('click', () => {
    const char = COMPANIONS[gameState.selectedCompanion];
    updateCompanionBubble(char.name, char.dialogues.click);
    // synthesize a simple high squeak/grunt for clicking
    triggerClickSound();
  });
  // Action: Restart Game
  document.getElementById('btn-restart-game').addEventListener('click', () => {
    resetGameToIntro();
  });
  

});

// Render Character selection cards
function renderCompanionSelection() {
  const grid = document.getElementById('char-grid');
  grid.innerHTML = '';
  
  Object.keys(COMPANIONS).forEach(key => {
    const c = COMPANIONS[key];
    const card = document.createElement('div');
    card.className = 'char-card';
    card.setAttribute('data-id', key);
    
    card.innerHTML = `
      <div>
        <div class="char-avatar-container">
          ${c.avatar}
        </div>
        <div class="char-name">${c.name}</div>
        <div class="char-trait">⚔️ ${c.trait}</div>
        <div class="char-desc">${c.desc}</div>
      </div>
    `;
    
    card.addEventListener('click', () => {
      // Remove selection from all
      const allCards = document.querySelectorAll('.char-card');
      allCards.forEach(cardEl => cardEl.classList.remove('selected'));
      
      // Add selection to clicked
      card.classList.add('selected');
      gameState.selectedCompanion = key;
      
      // Play a little chime
      playChime();
    });
    
    grid.appendChild(card);
  });
}

// Start Gameplay session
function startGameplay() {
  // Group questions by indicator
  const groups = {};
  QUESTION_BANK.forEach(q => {
    if (!groups[q.indicator]) {
      groups[q.indicator] = [];
    }
    groups[q.indicator].push(q);
  });

  // Shuffle each group
  for (const ind in groups) {
    groups[ind] = shuffleArray(groups[ind]);
  }

  const selectedQuestions = [];
  const selectedCounts = {};
  for (const ind in groups) {
    selectedCounts[ind] = 0;
  }

  // Step 1: Draw exactly 1 question from each of the 24 indicators to guarantee coverage
  for (const ind in groups) {
    if (groups[ind].length > 0) {
      const q = groups[ind].pop();
      selectedQuestions.push(q);
      selectedCounts[ind]++;
    }
  }

  // Step 2: Build the remaining unselected pool
  let remainingPool = [];
  for (const ind in groups) {
    groups[ind].forEach(q => {
      remainingPool.push(q);
    });
  }
  // Shuffle the remaining pool
  remainingPool = shuffleArray(remainingPool);

  // Step 3: Draw until we have exactly 50 questions, under the constraint of max 3 per indicator
  for (let i = 0; i < remainingPool.length; i++) {
    if (selectedQuestions.length >= 50) break;
    const q = remainingPool[i];
    if (selectedCounts[q.indicator] < 3) {
      selectedQuestions.push(q);
      selectedCounts[q.indicator]++;
    }
  }

  // Sort selected questions by stage (Stage 1 -> Stage 2 -> Stage 3)
  selectedQuestions.sort((a, b) => a.stage - b.stage);

  // Apply difficulty-based question selection and health setting
  let targetCount = 50;
  let targetHealth = 10;
  if (gameState.selectedDifficulty === 'easy') {
    targetCount = 25;
    targetHealth = 3;
  } else if (gameState.selectedDifficulty === 'medium') {
    targetCount = 40;
    targetHealth = 7;
  }

  let finalQuestions = [...selectedQuestions];
  if (targetCount < 50) {
    // Shuffle the 50 questions, slice to targetCount, and sort by stage again
    const shuffled = shuffleArray([...selectedQuestions]);
    finalQuestions = shuffled.slice(0, targetCount);
    finalQuestions.sort((a, b) => a.stage - b.stage);
  }

  gameState.gameQuestions = finalQuestions;
  gameState.currentQuestionIdx = 0;
  gameState.score = 0;
  gameState.health = targetHealth;
  
  // Set up player name and score displays
  document.getElementById('game-player-name').innerText = gameState.playerName;
  document.getElementById('game-score-display').innerText = `0 / 100`;
  updateHealthUI();
  
  // Set up companion UI
  const comp = COMPANIONS[gameState.selectedCompanion];
  document.getElementById('game-avatar-placeholder').innerHTML = comp.avatar;
  updateCompanionBubble(comp.name, comp.dialogues.greet);
  
  // Draw stage markers on progress track
  setupMapTrackMarkers();
  
  // Load first question
  loadQuestion();
  showScreen('screen-game');
}

// Update the gold coin elements for health UI (3, 7, or 10 coins based on difficulty)
function updateHealthUI() {
  const container = document.getElementById('game-health-coins');
  container.innerHTML = '';
  
  let maxCoins = 10;
  if (gameState.selectedDifficulty === 'easy') maxCoins = 3;
  else if (gameState.selectedDifficulty === 'medium') maxCoins = 7;
  
  for (let i = 0; i < maxCoins; i++) {
    const coin = document.createElement('span');
    coin.innerText = '🪙';
    coin.style.fontSize = '1.1rem';
    coin.style.transition = 'all 0.3s ease';
    if (i >= gameState.health) {
      coin.style.opacity = '0.15';
      coin.style.transform = 'scale(0.7)';
      coin.style.filter = 'grayscale(100%)';
    }
    container.appendChild(coin);
  }
}

// Setup the circles on progress track
function setupMapTrackMarkers() {
  const indicatorsContainer = document.getElementById('map-stages-indicators');
  indicatorsContainer.innerHTML = '';
  
  // Calculate dynamic stage boundaries based on selected questions
  let stage1Count = 0;
  let stage2Count = 0;
  gameState.gameQuestions.forEach(q => {
    if (q.stage === 1) stage1Count++;
    else if (q.stage === 2) stage2Count++;
  });
  
  const total = gameState.gameQuestions.length;
  const p1 = (stage1Count / total) * 100;
  const p2 = ((stage1Count + stage2Count) / total) * 100;
  
  const markers = [
    { percent: p1, title: '班波提督亭' },
    { percent: p2, title: '骷髏山脈' },
    { percent: 100, title: '乾枯大洞' }
  ];
  
  markers.forEach(m => {
    const el = document.createElement('div');
    el.className = 'stage-marker';
    el.style.left = `${m.percent}%`;
    el.title = m.title;
    indicatorsContainer.appendChild(el);
  });
}

// Load Question at current Index
function loadQuestion() {
  gameState.canAnswer = true;
  gameState.incorrectAttempts = 0;
  
  const q = gameState.gameQuestions[gameState.currentQuestionIdx];
  const totalQ = gameState.gameQuestions.length;
  
  // Update badges & progress info
  document.getElementById('current-stage-title').innerText = getStageTitle(q.stage);
  document.getElementById('question-progress-num').innerText = `第 ${gameState.currentQuestionIdx + 1} / ${totalQ} 題`;
  const currentScore100 = totalQ > 0 ? Math.round((gameState.score / totalQ) * 100) : 0;
  document.getElementById('game-score-display').innerText = `${currentScore100} / 100`;
  
  // Update indicator text hint
  document.getElementById('question-indicator-hint').innerText = `學習表現: ${q.indicator} ── ${q.indicatorText}`;
  
  // Format math text: replaces fraction expressions "a又b/c" or "b/c" with HTML fractions
  let formattedText = formatMathExpression(q.text);
  document.getElementById('question-text').innerHTML = formattedText;
  
  // Shuffle options, but preserve association with correct answer string
  const shuffledOptions = shuffleArray(q.options);
  
  // Render options grid
  const grid = document.getElementById('options-grid');
  grid.innerHTML = '';
  
  const letters = ['A', 'B', 'C', 'D'];
  shuffledOptions.forEach((optText, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.setAttribute('data-option-text', optText);
    btn.innerHTML = `<span class="option-prefix">(${letters[idx]})</span> ${formatMathExpression(optText)}`;
    
    btn.addEventListener('click', () => {
      if (!gameState.canAnswer) return;
      handleAnswerSelect(btn, optText, q.answer);
    });
    
    grid.appendChild(btn);
  });
  
  // Update Map Progress Bar & Ship Position
  updateMapProgress();
}

// Helper to translate stage numbers to names
function getStageTitle(stageNum) {
  switch (stageNum) {
    case 1: return '⚓ 第一關：班波提督亭';
    case 2: return '🧭 第二關：骷髏山脈';
    case 3: return '🕳️ 第三關：乾枯大洞';
    default: return '🏴‍☠️ 冒險關卡';
  }
}

// Replaces raw fraction strings in question texts to pretty HTML fractions
function formatMathExpression(text) {
  // Regex to match "X又A/B" or "A/B" (where X, A, B are digits)
  return text.replace(/(\d+又\d+\/\d+|\d+\/\d+)/g, (match) => {
    if (match.includes('又')) {
      const parts = match.split('又');
      const whole = parts[0];
      const fracParts = parts[1].split('/');
      return `${whole}<span class="frac"><sup>${fracParts[0]}</sup><sub>${fracParts[1]}</sub></span>`;
    } else {
      const fracParts = match.split('/');
      return `<span class="frac"><sup>${fracParts[0]}</sup><sub>${fracParts[1]}</sub></span>`;
    }
  });
}

// Handle selection of answer button
function handleAnswerSelect(buttonEl, selectedText, correctText) {
  const isCorrect = (selectedText === correctText);
  const companion = COMPANIONS[gameState.selectedCompanion];
  const totalQ = gameState.gameQuestions.length;
  
  if (isCorrect) {
    gameState.canAnswer = false;
    gameState.score++;
    
    const currentScore100 = totalQ > 0 ? Math.round((gameState.score / totalQ) * 100) : 0;
    document.getElementById('game-score-display').innerText = `${currentScore100} / 100`;
    
    // Add success styling
    buttonEl.classList.add('flash-correct');
    playCorrectCheersSound();
    
    // Animate coins drop from companion avatar
    const rect = document.getElementById('companion-avatar-area').getBoundingClientRect();
    triggerCoinsDrop(15, rect.left + rect.width / 2, rect.top + rect.height / 2);
    
    // Companion Dialogue
    updateCompanionBubble(companion.name, companion.dialogues.correct);
    
    // Next question delay
    setTimeout(() => {
      buttonEl.classList.remove('flash-correct');
      advanceQuestion();
    }, 1800);
    
  } else {
    // Incorrect answer
    gameState.canAnswer = false;
    gameState.incorrectAttempts++;
    buttonEl.classList.add('flash-wrong');
    
    // Shake the whole card panel
    const cardEl = document.getElementById('gameplay-card');
    cardEl.classList.add('shake');
    playSeagullSound();
    
    // Deduct Health Coin
    gameState.health--;
    updateHealthUI();
    
    // Companion dialogue
    updateCompanionBubble(companion.name, companion.dialogues.wrong);
    
    // Check game over
    if (gameState.health <= 0) {
      setTimeout(() => {
        alert('☠️ 你的硬幣扣光了！海盜西爾弗追上了你！請重新開始挑戰！');
        resetGameToIntro();
      }, 1200);
      return;
    }
    
    // Auto advance to next question on wrong answer
    setTimeout(() => {
      cardEl.classList.remove('shake');
      buttonEl.classList.remove('flash-wrong');
      advanceQuestion();
    }, 1800);
  }
}

// Global Game State Reset to Intro Screen
function resetGameToIntro() {
  gameState = {
    playerName: '',
    selectedCompanion: '',
    selectedDifficulty: 'hard',
    gameQuestions: [],
    currentQuestionIdx: 0,
    score: 0,
    incorrectAttempts: 0,
    canAnswer: true,
    health: 10
  };
  document.getElementById('player-name').value = '';
  // Clear selected flags on cards
  const cards = document.querySelectorAll('.char-card');
  cards.forEach(c => c.classList.remove('selected'));
  
  // Reset difficulty cards selection visual
  const diffCards = document.querySelectorAll('.diff-card');
  diffCards.forEach(c => {
    if (c.getAttribute('data-diff') === 'hard') {
      c.classList.add('selected');
    } else {
      c.classList.remove('selected');
    }
  });
  
  showScreen('screen-intro');
}

// Dialogue Bubble updater
function updateCompanionBubble(name, text) {
  document.getElementById('dialogue-char-name').innerText = name;
  
  let displayText = text;
  if (Array.isArray(text)) {
    displayText = text[Math.floor(Math.random() * text.length)];
  }
  document.getElementById('dialogue-text-content').innerText = displayText;
  
  // Trigger a bounce animation on bubble
  const bubble = document.getElementById('dialogue-bubble-box');
  bubble.style.transform = 'scale(1.05)';
  setTimeout(() => {
    bubble.style.transform = 'scale(1)';
  }, 150);
}

// Move to next question or complete game
function advanceQuestion() {
  gameState.currentQuestionIdx++;
  const totalQ = gameState.gameQuestions.length;
  
  if (gameState.currentQuestionIdx < totalQ) {
    loadQuestion();
  } else {
    // End Game - Show Certificate
    completeAdventure();
  }
}

// Update Map Progress UI elements
function updateMapProgress() {
  const currentNum = gameState.currentQuestionIdx; // 0 to 49
  const total = gameState.gameQuestions.length;    // 50
  
  const percentage = (currentNum / total) * 100;
  
  document.getElementById('map-progress-bar').style.width = `${percentage}%`;
  document.getElementById('map-ship').style.left = `${percentage}%`;
  
  // Highlight passed stage markers
  const markers = document.querySelectorAll('.stage-marker');
  markers.forEach((m, idx) => {
    const markerPercent = parseFloat(m.style.left);
    if (percentage >= markerPercent) {
      m.classList.add('passed');
    } else {
      m.classList.remove('passed');
    }
  });
}

// Complete game and display Certificate
function completeAdventure() {
  // Show Pirate cheer audio
  playPirateCheerSound();
  
  // Start Canvas fireworks & gold coins cascade
  startVictoryCelebration();
  
  // Update certificate content
  const totalQ = gameState.gameQuestions.length;
  const finalScore100 = totalQ > 0 ? Math.round((gameState.score / totalQ) * 100) : 0;
  
  let diffName = "弗林特的黃金密碼";
  if (gameState.selectedDifficulty === 'easy') {
    diffName = "骷髏礁的座標航線";
  } else if (gameState.selectedDifficulty === 'medium') {
    diffName = "西爾弗的混亂酒館";
  }
  
  document.getElementById('cert-player-name').innerText = gameState.playerName;
  document.getElementById('cert-companion-name').innerText = COMPANIONS[gameState.selectedCompanion].name;
  document.getElementById('cert-difficulty-name').innerText = diffName;
  document.getElementById('cert-score-display').innerText = finalScore100;
  
  const certQCount = document.getElementById('cert-question-count');
  if (certQCount) {
    certQCount.innerText = totalQ;
  }
  
  // Set certification date dynamically based on client system date
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  document.getElementById('cert-date-display').innerText = `認證日期：西元 ${year} 年 ${month} 月 ${date} 日`;
  
  // Show certificate screen
  showScreen('screen-certificate');
}

// Simple synthesized clicks and chimes for UI interaction
function playChime() {
  initAudio();
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.frequency.setValueAtTime(880, now); // A5
  osc.frequency.exponentialRampToValueAtTime(1760, now + 0.1); // A6
  
  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start(now);
  osc.stop(now + 0.16);
}

function triggerClickSound() {
  initAudio();
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.frequency.setValueAtTime(330, now);
  gain.gain.setValueAtTime(0.05, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start(now);
  osc.stop(now + 0.09);
}
