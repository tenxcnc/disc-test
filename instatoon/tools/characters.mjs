// 햄찌 세계관 캐릭터 (오리지널 벡터 아트)
// 각 함수는 viewBox 0 0 400 400 기준 SVG 조각을 반환합니다.
// expr(표정)과 옵션으로 장면마다 다른 연기를 시킵니다.

const LINE = '#5B3A29';

const C = {
  hamzzi: { body: '#F6B486', belly: '#FFF3E3', ear: '#F9A9A2', cheek: '#FFE4CF', blush: '#F59A93',
    hoodie: '#3DB4FF', hoodieDark: '#1F8FE0', cap: '#FF6A3D' },
  owl: { body: '#8C6E54', face: '#EEDDC4', tuft: '#6E533D', beak: '#F2A541', frame: '#2B1B12', gold: '#F5B82E',
    suit: '#2D3E78', suitDark: '#22305E', tie: '#FF5A7A', pocket: '#FFD84D', slacks: '#9AA3B2', slacksLine: '#7E8796', loafer: '#7A3E1D' },
  daram: { body: '#C98B5A', stripe: '#7A4E2F', belly: '#FBE7CF', tail: '#B9763F', tailLight: '#E3A86C',
    blazer: '#2ECC8F', blazerDark: '#1FA873', chino: '#F2D7A6' },
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

let UID = 0;
const uid = (p) => `${p}${++UID}`;

// 상체 실루엣 안쪽에만 옷을 입히는 클립
const clipBody = (id, d) => `<clipPath id="${id}"><path d="${d}"/></clipPath>`;

const HAM_BODY = 'M200 92 C 330 92 360 190 352 262 C 344 340 284 372 200 372 C 116 372 56 340 48 262 C 40 190 70 92 200 92 Z';

/** 햄찌: 취준생 → 신입사원 햄스터 (힙한 캐주얼: 오버핏 후드 + 스냅백 + 스니커즈) */
export function hamzzi({ expr = 'normal', badge = false, armUp = false, tears = false, sweatDrop = false, cap = true } = {}) {
  const k = C.hamzzi;
  const cid = uid('hc');
  const extra = [];
  if (tears || expr === 'crying') extra.push(tear(140, 222), tear(262, 222));
  if (sweatDrop || expr === 'shocked' || expr === 'tired') extra.push(sweat(318, 120));
  const sleeve = (cx, cy) =>
    `<ellipse cx="${cx}" cy="${cy}" rx="34" ry="26" fill="${k.hoodie}" ${stroke(6)}/><ellipse cx="${cx}" cy="${cy + 10}" rx="22" ry="15" fill="${k.body}" ${stroke(5)}/>`;
  return `
  <g class="hamzzi">
    <defs>${clipBody(cid, HAM_BODY)}</defs>
    <ellipse cx="200" cy="384" rx="120" ry="12" fill="#000" opacity=".08"/>
    <circle cx="98" cy="112" r="40" fill="${k.body}" ${stroke()}/><circle cx="98" cy="112" r="20" fill="${k.ear}"/>
    <circle cx="302" cy="112" r="40" fill="${k.body}" ${stroke()}/><circle cx="302" cy="112" r="20" fill="${k.ear}"/>
    <path d="${HAM_BODY}" fill="${k.body}"/>
    <g clip-path="url(#${cid})">
      <path d="M200 196 C 270 196 300 250 296 300 C 292 344 252 362 200 362 C 148 362 108 344 104 300 C 100 250 130 196 200 196 Z" fill="${k.belly}"/>
      <!-- 오버핏 후드 -->
      <path d="M20 282 Q 200 248 380 282 V 420 H 20 Z" fill="${k.hoodie}"/>
      <path d="M120 270 Q 200 300 280 270" fill="none" stroke="${k.hoodieDark}" stroke-width="18" stroke-linecap="round"/>
      <path d="M150 334 h100 l14 40 h-128 z" fill="${k.hoodieDark}" opacity=".55"/>
      <path d="M182 286 v34 M218 286 v34" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
      <circle cx="182" cy="324" r="6" fill="#fff"/><circle cx="218" cy="324" r="6" fill="#fff"/>
    </g>
    <path d="M20 282 Q 200 248 380 282" fill="none" ${stroke(6)} clip-path="url(#${cid})"/>
    <path d="${HAM_BODY}" fill="none" ${stroke()}/>
    ${cap ? '' : `<path d="M186 96 q8 -22 22 -6 q6 -16 18 -2" fill="none" ${stroke(6)}/>`}
    <ellipse cx="96" cy="246" rx="40" ry="32" fill="${k.cheek}" ${stroke(6)}/>
    <ellipse cx="304" cy="246" rx="40" ry="32" fill="${k.cheek}" ${stroke(6)}/>
    <ellipse cx="118" cy="236" rx="18" ry="10" fill="${k.blush}" opacity=".75"/>
    <ellipse cx="282" cy="236" rx="18" ry="10" fill="${k.blush}" opacity=".75"/>
    ${eyes(expr, 156, 244, 196)}
    <ellipse cx="200" cy="224" rx="10" ry="7" fill="#E97C78" ${stroke(4)}/>
    ${mouth(expr, 200, 238)}
    ${
      cap
        ? `<path d="M138 120 C 140 66 260 66 262 120 Z" fill="${k.cap}" ${stroke(7)}/>
           <path d="M150 110 C 160 84 196 76 200 76" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".55"/>
           <path d="M250 112 q46 -6 64 -30 q-30 -10 -66 10 z" fill="${k.cap}" ${stroke(7)}/>
           <circle cx="200" cy="72" r="7" fill="${k.cap}" ${stroke(5)}/>`
        : ''
    }
    ${
      armUp
        ? `<path d="M290 300 q50 -34 40 -96" fill="none" ${stroke(40)}/><path d="M290 300 q50 -34 40 -96" fill="none" stroke="${k.hoodie}" stroke-width="26" stroke-linecap="round"/><circle cx="330" cy="200" r="20" fill="${k.body}" ${stroke(7)}/>`
        : sleeve(266, 300)
    }
    ${sleeve(134, 300)}
    <ellipse cx="150" cy="374" rx="34" ry="14" fill="#fff" ${stroke(6)}/><path d="M132 374 h30" stroke="${k.cap}" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="250" cy="374" rx="34" ry="14" fill="#fff" ${stroke(6)}/><path d="M238 374 h30" stroke="${k.cap}" stroke-width="5" stroke-linecap="round"/>
    ${
      badge
        ? `<path d="M150 270 L200 318 L250 270" fill="none" stroke="#FFD84D" stroke-width="6"/><rect x="172" y="314" width="56" height="42" rx="8" fill="#fff" ${stroke(5)}/><rect x="181" y="323" width="16" height="16" rx="4" fill="${k.body}"/><path d="M203 328 h16 M203 339 h12" stroke="${LINE}" stroke-width="4" stroke-linecap="round"/>`
        : ''
    }
    ${extra.join('')}
  </g>`;
}

const OWL_BODY = 'M200 70 C 320 70 350 170 346 248 C 342 316 290 342 200 342 C 110 342 58 316 54 248 C 50 170 80 70 200 70 Z';

/** 부엉 대리: 현실 조언 담당 선배 (댄디 정장: 네이비 재킷 + 그레이 슬랙스 + 로퍼, 뿔테 안경) */
export function owl({ expr = 'normal', wingUp = false } = {}) {
  const k = C.owl;
  const cid = uid('oc');
  const eyeY = 172;
  const L = 150, R = 250;
  const eyesSvg =
    expr === 'happy'
      ? `<path d="M${L - 20} ${eyeY + 6} q20 -24 40 0 M${R - 20} ${eyeY + 6} q20 -24 40 0" fill="none" ${stroke(8)}/>`
      : [L, R]
          .map(
            (x) =>
              `<circle cx="${x}" cy="${eyeY}" r="27" fill="#fff"/><circle cx="${x + 2}" cy="${eyeY + 2}" r="17" fill="${LINE}"/><circle cx="${x + 9}" cy="${eyeY - 6}" r="7" fill="#fff"/><circle cx="${x - 4}" cy="${eyeY + 9}" r="3" fill="#fff"/>`
          )
          .join('');
  const glasses = `
    <rect x="${L - 40}" y="${eyeY - 36}" width="80" height="72" rx="30" fill="#BFE6FF" fill-opacity=".25" stroke="${k.frame}" stroke-width="10"/>
    <rect x="${R - 40}" y="${eyeY - 36}" width="80" height="72" rx="30" fill="#BFE6FF" fill-opacity=".25" stroke="${k.frame}" stroke-width="10"/>
    <path d="M${L + 40} ${eyeY - 10} q${R - L - 80 > 0 ? (R - L - 80) / 2 : 10} -14 ${R - L - 80} 0" fill="none" stroke="${k.gold}" stroke-width="8" stroke-linecap="round"/>
    <circle cx="${L - 36}" cy="${eyeY - 28}" r="5" fill="${k.gold}"/><circle cx="${R + 36}" cy="${eyeY - 28}" r="5" fill="${k.gold}"/>
    <path d="M${L - 26} ${eyeY - 20} l14 -8 M${R - 26} ${eyeY - 20} l14 -8" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".8"/>`;
  const wing = (side, up) => {
    if (side === 'L') return `<path d="M98 240 q-44 50 -16 100 q34 -26 34 -86 z" fill="${k.suit}" ${stroke(7)}/><path d="M86 334 q-4 16 10 20" fill="none" stroke="${k.tuft}" stroke-width="10" stroke-linecap="round"/>`;
    return up
      ? `<path d="M296 274 q66 -36 58 -122 q-44 26 -74 92 z" fill="${k.suit}" ${stroke(7)}/><path d="M352 154 q8 -16 -4 -26" fill="none" stroke="${k.tuft}" stroke-width="12" stroke-linecap="round"/>`
      : `<path d="M302 240 q44 50 16 100 q-34 -26 -34 -86 z" fill="${k.suit}" ${stroke(7)}/><path d="M314 334 q4 16 -10 20" fill="none" stroke="${k.tuft}" stroke-width="10" stroke-linecap="round"/>`;
  };
  return `
  <g class="owl">
    <defs>${clipBody(cid, OWL_BODY)}</defs>
    <ellipse cx="200" cy="392" rx="110" ry="9" fill="#000" opacity=".08"/>
    <!-- 슬랙스 + 로퍼 -->
    <rect x="146" y="318" width="44" height="64" rx="8" fill="${k.slacks}" ${stroke(6)}/>
    <rect x="210" y="318" width="44" height="64" rx="8" fill="${k.slacks}" ${stroke(6)}/>
    <path d="M168 346 v32 M232 346 v32" stroke="${k.slacksLine}" stroke-width="3"/>
    <path d="M138 384 q2 -12 30 -10 q22 2 24 12 z" fill="${k.loafer}" ${stroke(5)}/>
    <path d="M262 384 q-2 -12 -30 -10 q-22 2 -24 12 z" fill="${k.loafer}" ${stroke(5)}/>
    <path d="M110 92 l-14 -46 l52 30 z M290 92 l14 -46 l-52 30 z" fill="${k.tuft}" ${stroke(7)}/>
    <path d="${OWL_BODY}" fill="${k.body}"/>
    <g clip-path="url(#${cid})">
      <!-- 네이비 재킷 -->
      <path d="M20 250 Q 200 236 380 250 V 420 H 20 Z" fill="${k.suit}"/>
      <path d="M168 244 L200 330 L232 244 Z" fill="#fff"/>
      <path d="M190 252 l10 10 l10 -10 l-4 62 l-6 10 l-6 -10 z" fill="${k.tie}" ${stroke(4)}/>
      <path d="M168 244 L200 330 L176 340 L140 262 Z" fill="${k.suitDark}" ${stroke(5)}/>
      <path d="M232 244 L200 330 L224 340 L260 262 Z" fill="${k.suitDark}" ${stroke(5)}/>
      <path d="M236 290 h34 v8 h-34 z" fill="${k.suitDark}"/>
      <path d="M240 290 l8 -14 l6 12 l8 -12 l6 14 z" fill="${k.pocket}" ${stroke(3)}/>
      <circle cx="200" cy="330" r="5" fill="${k.gold}"/>
    </g>
    <path d="${OWL_BODY}" fill="none" ${stroke()}/>
    <path d="M200 108 C 292 108 314 168 302 212 C 292 248 246 262 200 248 C 154 262 108 248 98 212 C 86 168 108 108 200 108 Z" fill="${k.face}" ${stroke(6)}/>
    ${eyesSvg}
    ${glasses}
    <path d="M188 214 l12 22 l12 -22 z" fill="${k.beak}" ${stroke(5)}/>
    ${expr === 'happy' ? `<path d="M186 242 q14 10 28 0" fill="none" ${stroke(5)}/>` : ''}
    ${wing('L')}${wing('R', wingUp)}
  </g>`;
}

const DARAM_BODY = 'M200 92 C 320 92 340 190 334 262 C 328 330 276 360 200 360 C 124 360 72 330 66 262 C 60 190 80 92 200 92 Z';

/** 다람: 감정 폭발 담당 동기 (캐주얼 정장: 그린 블레이저 + 흰 티 + 치노 + 스니커즈, 풍성한 웨이브 꼬리) */
export function daram({ expr = 'happy' } = {}) {
  const k = C.daram;
  const cid = uid('dc');
  // 머리 위까지 올라가는 S자 웨이브 꼬리
  const tail = `M276 330
    C 360 330 398 270 372 214
    C 352 172 312 168 322 128
    C 330 96 376 96 384 62
    C 392 26 352 4 312 14
    C 262 26 244 74 262 112
    C 276 142 300 150 286 188
    C 272 224 238 236 250 276
    C 258 304 262 322 276 330 Z`;
  const tailStripe = `M290 300 C 350 290 370 250 350 214 C 330 180 290 170 300 126 C 308 92 352 80 358 50`;
  return `
  <g class="daram">
    <defs>${clipBody(cid, DARAM_BODY)}</defs>
    <ellipse cx="200" cy="386" rx="110" ry="10" fill="#000" opacity=".08"/>
    <path d="${tail}" fill="${k.tail}" ${stroke()}/>
    <path d="${tailStripe}" fill="none" stroke="${k.tailLight}" stroke-width="22" stroke-linecap="round"/>
    <!-- 치노 + 스니커즈 -->
    <rect x="150" y="330" width="42" height="40" rx="8" fill="${k.chino}" ${stroke(6)}/>
    <rect x="208" y="330" width="42" height="40" rx="8" fill="${k.chino}" ${stroke(6)}/>
    <ellipse cx="166" cy="374" rx="30" ry="12" fill="#fff" ${stroke(5)}/>
    <ellipse cx="234" cy="374" rx="30" ry="12" fill="#fff" ${stroke(5)}/>
    <path d="M120 104 l-10 -46 l40 30 z M280 104 l10 -46 l-40 30 z" fill="${k.body}" ${stroke(7)}/>
    <path d="${DARAM_BODY}" fill="${k.body}"/>
    <g clip-path="url(#${cid})">
      <path d="M200 200 C 262 200 286 250 282 300 C 278 344 244 362 200 362 C 156 362 122 344 118 300 C 114 250 138 200 200 200 Z" fill="${k.belly}"/>
      <!-- 그린 블레이저 + 흰 티 -->
      <path d="M20 262 Q 200 246 380 262 V 420 H 20 Z" fill="${k.blazer}"/>
      <path d="M156 256 Q 200 272 244 256 L 236 420 H 164 Z" fill="#fff"/>
      <path d="M156 256 L 186 330 L 164 350 L 128 270 Z" fill="${k.blazerDark}" ${stroke(5)}/>
      <path d="M244 256 L 214 330 L 236 350 L 272 270 Z" fill="${k.blazerDark}" ${stroke(5)}/>
      <path d="M176 262 Q 200 276 224 262" fill="none" stroke="${k.blazerDark}" stroke-width="5" stroke-linecap="round"/>
    </g>
    <path d="${DARAM_BODY}" fill="none" ${stroke()}/>
    <path d="M200 98 v60" stroke="${k.stripe}" stroke-width="12" stroke-linecap="round"/>
    ${eyes(expr, 158, 242, 196)}
    <ellipse cx="200" cy="224" rx="9" ry="6" fill="#6B3E26"/>
    ${mouth(expr, 200, 236)}
    <ellipse cx="124" cy="240" rx="16" ry="9" fill="#F59A93" opacity=".7"/><ellipse cx="276" cy="240" rx="16" ry="9" fill="#F59A93" opacity=".7"/>
    <ellipse cx="128" cy="300" rx="26" ry="20" fill="${k.blazer}" ${stroke(6)}/><ellipse cx="128" cy="310" rx="17" ry="12" fill="${k.body}" ${stroke(5)}/>
    <ellipse cx="272" cy="300" rx="26" ry="20" fill="${k.blazer}" ${stroke(6)}/><ellipse cx="272" cy="310" rx="17" ry="12" fill="${k.body}" ${stroke(5)}/>
  </g>`;
}

export const PALETTE = {
  // 비타민 팔레트: 밝고 쨍하게 (취준도 힘든데 화면이라도 밝게!)
  bg: '#FFF3B0',      // 레몬 배경
  bg2: '#FFD84D',     // 선샤인 옐로(카드 그림자·포인트 면)
  ink: '#3A2414',     // 진한 초코(가독성용 본문색)
  accent: '#FF6A3D',  // 탠저린 오렌지(강조·자막)
  sub: '#2FA8FF',     // 스카이 블루(다음 편 예고)
  cta: '#FF3D7F',     // 핫핑크(저장·공유 CTA)
  bubble: '#FFFFFF',
  line: LINE,
};
