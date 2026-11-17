// 캐릭터 설정화(표정 시트) PNG 생성 → 살구salgu 스킬에 "캐릭터 원본"으로 첨부하세요.
import { chromium, shoot } from './pw.mjs';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { hamzzi, owl, daram, PALETTE } from './characters.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = resolve(ROOT, 'characters');
mkdirSync(OUT, { recursive: true });
const FONT = `file://${ROOT}/assets/fonts/Jua-Regular.ttf`;

const cell = (svg, label) =>
  `<figure><svg viewBox="0 0 400 400">${svg}</svg><figcaption>${label}</figcaption></figure>`;

const sheets = {
  'hamzzi-sheet': {
    title: '햄찌 · 취준 1년 차 → 신입사원',
    note: '살구색 몸 · 크림색 배 · 볼주머니 · 머리 위 삐친 털 · 신입 땐 사원증',
    cells: [
      cell(hamzzi({ expr: 'normal' }), '기본'),
      cell(hamzzi({ expr: 'happy' }), '기쁨'),
      cell(hamzzi({ expr: 'sad', tears: true }), '좌절'),
      cell(hamzzi({ expr: 'shocked' }), '당황'),
      cell(hamzzi({ expr: 'tired' }), '피곤'),
      cell(hamzzi({ expr: 'determined', armUp: true }), '다짐'),
      cell(hamzzi({ expr: 'crying' }), '오열'),
      cell(hamzzi({ expr: 'happy', badge: true }), '신입사원'),
    ],
  },
  'cast-sheet': {
    title: '햄찌 세계관 등장인물',
    note: '햄찌(주인공) · 부엉 대리(현실 조언·관계통역 코너) · 다람(감정 폭발 동기)',
    cells: [
      cell(hamzzi({ expr: 'normal', badge: true }), '햄찌'),
      cell(owl({ expr: 'normal' }), '부엉 대리'),
      cell(owl({ expr: 'happy', wingUp: true }), '부엉 대리 · 설명'),
      cell(daram({ expr: 'happy' }), '다람'),
    ],
  },
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
for (const [name, s] of Object.entries(sheets)) {
  const cols = 4;
  await shoot(page, `<!doctype html><html><head><meta charset="utf-8"><style>
    @font-face{font-family:Jua;src:url('${FONT}')}
    body{margin:0;width:1600px;background:${PALETTE.bg};font-family:Jua;color:${PALETTE.ink}}
    h1{margin:48px 0 4px;text-align:center;font-size:60px;font-weight:400}
    p{margin:0 0 24px;text-align:center;font-size:30px;opacity:.75}
    main{display:grid;grid-template-columns:repeat(${cols},1fr);gap:24px;padding:0 48px 48px}
    figure{margin:0;background:#fff;border-radius:36px;padding:16px;box-shadow:0 6px 0 ${PALETTE.bg2}}
    svg{width:100%;display:block}
    figcaption{text-align:center;font-size:34px;padding-bottom:8px}
  </style></head><body><h1>${s.title}</h1><p>${s.note}</p><main>${s.cells.join('')}</main></body></html>`, resolve(OUT, `${name}.png`), { width: 1600, height: 900, fullPage: true });
  console.log('saved', `characters/${name}.png`);
}
// 단독 원본 이미지(살구 스킬 첨부용, 배경 단순·전신)
for (const [name, svg] of [
  ['hamzzi', hamzzi({ expr: 'normal' })],
  ['hamzzi-badge', hamzzi({ expr: 'happy', badge: true })],
  ['owl', owl({ expr: 'normal' })],
  ['daram', daram({ expr: 'happy' })],
]) {
  await shoot(page, `<body style="margin:0;background:#fff"><svg viewBox="0 0 400 400" width="1024" height="1024">${svg}</svg></body>`, resolve(OUT, `${name}.png`), { width: 1024, height: 1024 });
  console.log('saved', `characters/${name}.png`);
}
await browser.close();
