// 햄찌 세계관 캐릭터 (오리지널 벡터 아트)
// 각 함수는 viewBox 0 0 400 400 기준 SVG 조각을 반환합니다.
// expr(표정)과 옵션으로 장면마다 다른 연기를 시킵니다.

const LINE = '#5B3A29';

const C = {
  hamzzi: { body: '#F6B486', belly: '#FFF3E3', ear: '#F9A9A2', cheek: '#FFE4CF', blush: '#F59A93' },
  owl: { body: '#8C6E54', face: '#EEDDC4', tuft: '#6E533D', beak: '#F2A541', tie: '#5B8BD0' },
  daram: { body: '#C98B5A', stripe: '#7A4E2F', belly: '#FBE7CF', tail: '#B07443' },
};

const stroke = (w = 8) => `stroke="${LINE}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;

function eyes(expr, lx, rx, y) {
  const dot = (x, r = 14) =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="${LINE}"/><circle cx="${x + 5}" cy="${y - 5}" r="${r * 0.36}" fill="#fff"/>`;
  switch (expr) {
    case 'happy':
      return [lx, rx].map((x) => `<path d="M${x - 16} ${y + 4} q16 -20 32 0" fill="none" ${stroke(8)}/>`).join('');
    case 'sad':
      return (
        dot(lx, 12) + dot(rx, 12) +
        `<path d="M${lx - 22} ${y - 18} l26 -12" fill="none" ${stroke(6)}/><path d="M${rx + 22} ${y - 18} l-26 -12" fill="none" ${stroke(6)}/>`
      );
    case 'shocked':
      return [lx, rx]
        .map((x) => `<circle cx="${x}" cy="${y}" r="21" fill="#fff" ${stroke(6)}/><circle cx="${x}" cy="${y + 2}" r="7" fill="${LINE}"/>`)
        .join('');
    case 'tired':
      return [lx, rx]
        .map(
          (x) =>
            `<path d="M${x - 16} ${y + 2} h32" ${stroke(8)}/><path d="M${x - 14} ${y + 16} q14 8 28 0" fill="none" stroke="#B9A3C9" stroke-width="5" stroke-linecap="round"/>`
        )
        .join('');
    case 'determined':
      return (
        dot(lx, 13) + dot(rx, 13) +
        `<path d="M${lx - 22} ${y - 30} l30 12" fill="none" ${stroke(8)}/><path d="M${rx + 22} ${y - 30} l-30 12" fill="none" ${stroke(8)}/>`
      );
    case 'crying':
      return [lx, rx]
        .map((x, i) => {
          const d = i === 0 ? `M${x - 14} ${y - 10} l20 10 l-20 10` : `M${x + 14} ${y - 10} l-20 10 l20 10`;
          return `<path d="${d}" fill="none" ${stroke(7)}/>`;
        })
        .join('');
    case 'wink':
      return dot(lx) + `<path d="M${rx - 16} ${y + 2} q16 -16 32 0" fill="none" ${stroke(8)}/>`;
    default:
      return dot(lx) + dot(rx);
  }
}

function mouth(expr, cx, y) {
  switch (expr) {
    case 'happy':
    case 'wink':
      return `<path d="M${cx - 18} ${y} q18 26 36 0 z" fill="#D9615B" ${stroke(6)}/>`;
    case 'sad':
    case 'crying':
      return `<path d="M${cx - 14} ${y + 10} q14 -14 28 0" fill="none" ${stroke(6)}/>`;
    case 'shocked':
      return `<ellipse cx="${cx}" cy="${y + 8}" rx="11" ry="15" fill="#D9615B" ${stroke(6)}/>`;
    case 'tired':
      return `<path d="M${cx - 14} ${y + 4} q7 -6 14 0 q7 6 14 0" fill="none" ${stroke(5)}/>`;
    case 'determined':
      return `<path d="M${cx - 16} ${y + 2} q16 10 32 -4" fill="none" ${stroke(6)}/>`;
    default:
      return `<path d="M${cx - 14} ${y} q7 9 14 0 q7 9 14 0" fill="none" ${stroke(5)}/>`;
  }
}

const tear = (x, y, s = 1) =>
  `<path d="M${x} ${y} q${-10 * s} ${18 * s} 0 ${26 * s} q${10 * s} ${-8 * s} 0 ${-26 * s} z" fill="#8CC8F0" stroke="#4E8DBF" stroke-width="3"/>`;
const sweat = (x, y) =>
  `<path d="M${x} ${y} q-12 20 0 30 q12 -10 0 -30 z" fill="#BFE6FF" stroke="#4E8DBF" stroke-width="3"/>`;

/** 햄찌: 취준생 → 신입사원 햄스터 */
export function hamzzi({ expr = 'normal', badge = false, armUp = false, tears = false, sweatDrop = false } = {}) {
  const k = C.hamzzi;
  const extra = [];
  if (tears || expr === 'crying') extra.push(tear(140, 222), tear(262, 222));
  if (sweatDrop || expr === 'shocked' || expr === 'tired') extra.push(sweat(318, 120));
  return `
  <g class="hamzzi">
    <ellipse cx="200" cy="378" rx="120" ry="14" fill="#000" opacity=".08"/>
    <circle cx="98" cy="112" r="40" fill="${k.body}" ${stroke()}/><circle cx="98" cy="112" r="20" fill="${k.ear}"/>
    <circle cx="302" cy="112" r="40" fill="${k.body}" ${stroke()}/><circle cx="302" cy="112" r="20" fill="${k.ear}"/>
    <path d="M200 92 C 330 92 360 190 352 262 C 344 340 284 372 200 372 C 116 372 56 340 48 262 C 40 190 70 92 200 92 Z" fill="${k.body}" ${stroke()}/>
    <path d="M200 196 C 270 196 300 250 296 300 C 292 344 252 362 200 362 C 148 362 108 344 104 300 C 100 250 130 196 200 196 Z" fill="${k.belly}"/>
    <path d="M186 96 q8 -22 22 -6 q6 -16 18 -2" fill="none" ${stroke(6)}/>
    <ellipse cx="96" cy="246" rx="40" ry="32" fill="${k.cheek}" ${stroke(6)}/>
    <ellipse cx="304" cy="246" rx="40" ry="32" fill="${k.cheek}" ${stroke(6)}/>
    <ellipse cx="118" cy="236" rx="18" ry="10" fill="${k.blush}" opacity=".75"/>
    <ellipse cx="282" cy="236" rx="18" ry="10" fill="${k.blush}" opacity=".75"/>
    ${eyes(expr, 156, 244, 196)}
    <ellipse cx="200" cy="224" rx="10" ry="7" fill="#E97C78" ${stroke(4)}/>
    ${mouth(expr, 200, 238)}
    ${
      armUp
        ? `<path d="M286 300 q48 -30 40 -90" fill="none" ${stroke(26)}/><path d="M286 300 q48 -30 40 -90" fill="none" stroke="${k.body}" stroke-width="12" stroke-linecap="round"/><circle cx="326" cy="204" r="20" fill="${k.body}" ${stroke(7)}/>`
        : `<ellipse cx="262" cy="304" rx="22" ry="16" fill="${k.body}" ${stroke(6)}/>`
    }
    <ellipse cx="138" cy="304" rx="22" ry="16" fill="${k.body}" ${stroke(6)}/>
    ${
      badge
        ? `<path d="M150 214 L200 300 L250 214" fill="none" stroke="#5B8BD0" stroke-width="6"/><rect x="170" y="296" width="60" height="46" rx="8" fill="#fff" stroke="#5B8BD0" stroke-width="6"/><rect x="180" y="306" width="18" height="18" rx="4" fill="#F6B486"/><path d="M204 312 h18 M204 324 h14" stroke="#5B8BD0" stroke-width="4" stroke-linecap="round"/>`
        : ''
    }
    ${extra.join('')}
  </g>`;
}

/** 부엉 대리: 현실 조언 담당 선배 부엉이 */
export function owl({ expr = 'normal', wingUp = false } = {}) {
  const k = C.owl;
  const eyeY = 176;
  const pupils =
    expr === 'happy'
      ? `<path d="M132 ${eyeY + 6} q20 -20 40 0 M228 ${eyeY + 6} q20 -20 40 0" fill="none" ${stroke(8)}/>`
      : `<circle cx="152" cy="${eyeY}" r="13" fill="${LINE}"/><circle cx="157" cy="${eyeY - 5}" r="5" fill="#fff"/><circle cx="248" cy="${eyeY}" r="13" fill="${LINE}"/><circle cx="253" cy="${eyeY - 5}" r="5" fill="#fff"/>`;
  return `
  <g class="owl">
    <ellipse cx="200" cy="380" rx="115" ry="13" fill="#000" opacity=".08"/>
    <path d="M110 92 l-14 -46 l52 30 z M290 92 l14 -46 l-52 30 z" fill="${k.tuft}" ${stroke(7)}/>
    <path d="M200 70 C 320 70 350 170 346 250 C 342 336 284 374 200 374 C 116 374 58 336 54 250 C 50 170 80 70 200 70 Z" fill="${k.body}" ${stroke()}/>
    <path d="M200 112 C 290 112 312 170 300 214 C 290 252 246 266 200 252 C 154 266 110 252 100 214 C 88 170 110 112 200 112 Z" fill="${k.face}" ${stroke(6)}/>
    <path d="M150 272 q50 30 100 0 q-10 70 -50 86 q-40 -16 -50 -86 z" fill="${k.face}" opacity=".9"/>
    <circle cx="152" cy="${eyeY}" r="34" fill="#fff" fill-opacity=".35" ${stroke(7)}/>
    <circle cx="248" cy="${eyeY}" r="34" fill="#fff" fill-opacity=".35" ${stroke(7)}/>
    <path d="M186 ${eyeY} h28" ${stroke(7)}/>
    ${pupils}
    <path d="M188 214 l12 24 l12 -24 z" fill="${k.beak}" ${stroke(5)}/>
    ${expr === 'happy' ? `<path d="M186 250 q14 12 28 0" fill="none" ${stroke(5)}/>` : ''}
    <path d="M186 262 l14 14 l14 -14 l-6 64 l-8 10 l-8 -10 z" fill="${k.tie}" ${stroke(5)}/>
    ${
      wingUp
        ? `<path d="M300 280 q60 -40 50 -120 q-40 30 -66 90 z" fill="${k.tuft}" ${stroke(7)}/>`
        : `<path d="M300 220 q40 60 10 130 q-30 -40 -26 -100 z" fill="${k.tuft}" ${stroke(7)}/>`
    }
    <path d="M100 220 q-40 60 -10 130 q30 -40 26 -100 z" fill="${k.tuft}" ${stroke(7)}/>
  </g>`;
}

/** 다람: 감정 폭발 담당 동기 다람쥐 */
export function daram({ expr = 'happy' } = {}) {
  const k = C.daram;
  return `
  <g class="daram">
    <ellipse cx="200" cy="380" rx="110" ry="13" fill="#000" opacity=".08"/>
    <path d="M300 340 C 400 320 400 160 320 120 C 280 100 270 160 300 190 C 330 220 320 280 280 300 Z" fill="${k.tail}" ${stroke()}/>
    <path d="M120 104 l-10 -46 l40 30 z M280 104 l10 -46 l-40 30 z" fill="${k.body}" ${stroke(7)}/>
    <path d="M200 92 C 320 92 340 190 334 262 C 328 340 276 372 200 372 C 124 372 72 340 66 262 C 60 190 80 92 200 92 Z" fill="${k.body}" ${stroke()}/>
    <path d="M200 98 v60" stroke="${k.stripe}" stroke-width="12" stroke-linecap="round"/>
    <path d="M200 200 C 262 200 286 250 282 300 C 278 344 244 362 200 362 C 156 362 122 344 118 300 C 114 250 138 200 200 200 Z" fill="${k.belly}"/>
    ${eyes(expr, 158, 242, 196)}
    <ellipse cx="200" cy="224" rx="9" ry="6" fill="#6B3E26"/>
    ${mouth(expr, 200, 236)}
    <ellipse cx="124" cy="240" rx="16" ry="9" fill="#F59A93" opacity=".7"/><ellipse cx="276" cy="240" rx="16" ry="9" fill="#F59A93" opacity=".7"/>
  </g>`;
}

export const PALETTE = {
  bg: '#FFF4E8',
  bg2: '#FFE7D2',
  ink: '#4A2E1F',
  accent: '#E8794A',
  sub: '#5B8BD0',
  bubble: '#FFFFFF',
  line: LINE,
};
