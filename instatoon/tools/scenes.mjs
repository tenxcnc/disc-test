// 데모용 장면 그림(글자 없는 아트). 실제 연재에서는 살구salgu로 만든 '글자 없는' 이미지를
// episode.json 의 art 에 "panels/01.png" 처럼 지정하면 이 파일은 쓰이지 않습니다.
import { hamzzi, owl, daram, PALETTE } from './characters.mjs';

const P = PALETTE;
const place = (svg, x, y, s = 1, { flip = false, rot = 0 } = {}) =>
  `<g transform="translate(${x} ${y}) rotate(${rot} ${200 * s} ${200 * s}) scale(${flip ? -s : s} ${s}) ${flip ? 'translate(-400 0)' : ''}">${svg}</g>`;
const ln = `stroke="${P.line}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;

const floor = (y = 820) => `<path d="M-20 ${y} H1020" stroke="${P.bg2}" stroke-width="10"/>`;
const desk = (y = 640) => `<rect x="40" y="${y}" width="920" height="40" rx="20" fill="#E9C9A6" ${ln}/><path d="M120 ${y + 40} v240 M880 ${y + 40} v240" ${ln}/>`;

function laptop(x, y, s = 1, { screen = '#DCEBFA' } = {}) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="0" y="0" width="300" height="200" rx="18" fill="#B9C3CF" ${ln}/>
    <rect x="18" y="18" width="264" height="164" rx="8" fill="${screen}"/>
    <path d="M-40 200 h380 l-20 26 h-340 z" fill="#9AA6B4" ${ln}/>
  </g>`;
}
function envelope(x, y, rot = 0, s = 1, stamp = true) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    <rect x="-80" y="-52" width="160" height="104" rx="10" fill="#fff" ${ln}/>
    <path d="M-80 -52 L0 12 L80 -52" fill="none" ${ln}/>
    ${stamp ? `<g transform="rotate(-12)"><rect x="-58" y="-6" width="116" height="44" rx="8" fill="none" stroke="#E2574C" stroke-width="5"/><text x="0" y="27" text-anchor="middle" font-family="Jua" font-size="28" fill="#E2574C">불합격</text></g>` : ''}
  </g>`;
}
function phone(x, y, s = 1, { notif = false } = {}) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="0" y="0" width="150" height="270" rx="26" fill="#3C3F4A" ${ln}/>
    <rect x="12" y="24" width="126" height="216" rx="10" fill="#F4F8FF"/>
    ${notif ? `<circle cx="140" cy="10" r="26" fill="#E8794A" ${ln}/><text x="140" y="21" text-anchor="middle" font-family="Jua" font-size="32" fill="#fff">1</text>` : ''}
  </g>`;
}
function paper(x, y, rot = 0, s = 1) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    <rect x="0" y="0" width="200" height="260" rx="14" fill="#fff" ${ln}/>
    <path d="M30 50 h140 M30 90 h140 M30 130 h110 M30 170 h140 M30 210 h80" stroke="#D5C2AE" stroke-width="10" stroke-linecap="round"/>
  </g>`;
}
const bigScreen = () =>
  `<rect x="90" y="60" width="820" height="560" rx="36" fill="#B9C3CF" ${ln}/><rect x="120" y="90" width="760" height="500" rx="16" fill="#fff"/>
   <rect x="120" y="90" width="760" height="70" rx="16" fill="#E7EEF7"/><circle cx="160" cy="125" r="12" fill="#F2A3A3"/><circle cx="196" cy="125" r="12" fill="#F6D58A"/><circle cx="232" cy="125" r="12" fill="#A9D8A0"/>
   <path d="M420 620 h160 l30 70 h-220 z" fill="#9AA6B4" ${ln}/>`;

/** 장면 이름 → SVG (viewBox 0 0 1000 1000) */
export const SCENES = {
  // EP01 공감툰: 서류 광탈 50번째 날
  'e1-cover': () =>
    floor(860) +
    [envelope(150, 800, -18), envelope(250, 720, 10), envelope(140, 640, 4), envelope(850, 800, 16), envelope(870, 700, -8), envelope(820, 610, 6)].join('') +
    place(hamzzi({ expr: 'tired' }), 250, 330, 1.25),
  'e1-mail': () => desk(640) + place(hamzzi({ expr: 'normal' }), 330, 200, 0.9) + laptop(320, 420, 1.2) + phone(790, 360, 0.95, { notif: true }),
  'e1-reject': () => bigScreen() + place(hamzzi({ expr: 'shocked' }), 640, 600, 0.85),
  'e1-flat': () =>
    floor(880) +
    [envelope(170, 840, -25, 0.9), envelope(820, 850, 18, 0.9), envelope(260, 920, 8, 0.9), envelope(740, 930, -12, 0.9)].join('') +
    place(hamzzi({ expr: 'tired' }), 300, 520, 1.0, { rot: -78 }),
  'e1-owl': () => floor(900) + place(owl({ expr: 'happy', wingUp: true }), 40, 460, 1.05) + phone(640, 470, 1.3, { notif: true }),
  'e1-resolve': () => desk(700) + laptop(560, 480, 1.0) + place(hamzzi({ expr: 'determined', armUp: true }), 60, 300, 1.05),

  // EP02 정보툰: 자소서 첫 문장 공식 3가지
  'e2-cover': () => floor(900) + place(owl({ expr: 'happy', wingUp: true }), 10, 380, 1.2) + place(hamzzi({ expr: 'happy' }), 520, 430, 1.15) + paper(400, 230, -10, 0.9),
  'e2-owl-corner': () => place(owl({ expr: 'happy', wingUp: true }), 560, 560, 1.0),
  'e2-hamzzi-corner': () => place(hamzzi({ expr: 'determined', armUp: true }), 580, 580, 0.95),
  'e2-hamzzi-doc': () => place(hamzzi({ expr: 'happy' }), 560, 560, 1.0) + paper(380, 640, -8, 0.95),

  // EP03 심리툰(관계통역): 거절 못 하는 사람의 속마음
  'e3-cover': () => floor(900) + place(daram({ expr: 'happy' }), 0, 380, 1.2) + place(hamzzi({ expr: 'shocked', sweatDrop: true }), 520, 380, 1.2),
  'e3-ask': () => floor(900) + place(daram({ expr: 'wink' }), 20, 500, 0.95) + place(hamzzi({ expr: 'happy', sweatDrop: true }), 560, 500, 0.95),
  'e3-owl-corner': () => place(owl({ expr: 'normal' }), 580, 580, 0.95),
  'e3-owl-happy-corner': () => place(owl({ expr: 'happy', wingUp: true }), 580, 580, 0.95),
  'e3-final': () => floor(900) + place(hamzzi({ expr: 'determined', armUp: true }), 30, 480, 1.0) + place(daram({ expr: 'happy' }), 560, 500, 0.95),
};

export function sceneSvg(name) {
  const f = SCENES[name];
  if (!f) throw new Error(`알 수 없는 장면: ${name}`);
  return f();
}
