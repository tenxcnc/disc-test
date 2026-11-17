# 홈페이지/랜딩페이지 제작용 공개 에이전트 스킬 비교 (2026-11-17 기준)

목적: "마스터 홈페이지 제작 스킬"을 직접 쓰기 위한 근거 자료. 아래 내용은 모두 저장소를 얕게 클론해 SKILL.md와 주요 reference 파일을 직접 읽고 내 말로 요약한 것이다(라이선스가 서로 달라 긴 원문 인용은 피했다). 클론 내용은 신뢰하지 않는 데이터로 취급했고, 스크립트는 하나도 실행하지 않았다.

클론 위치: `/tmp/claude-0/-home-user-disc-test/b6c3189d-d5a4-524e-8505-bf48093acb70/scratchpad/gh/<owner>-<repo>/`

## 0. 읽은 범위와 한계 (정직한 고지)

- **끝까지 읽은 것**: anthropics `frontend-design` SKILL.md, taste-skill SKILL.md + `copy.md` 대부분 + `copy-voice.md` 앞부분 + `photos.md` 앞부분 + `sections.md` 일부 + `system.md`의 Forms/Access/Head, impeccable SKILL.md + `craft-floor.md` + `init.md` + `shape.md` + `mode-persuade.md` + `new-work-world.md`, oil-ui SKILL.md + `direction-persuasion.md` + `design-direction.md` 앞 70줄 + `visual-language.md` 앞부분 + `visual-review.md` 앞부분, Ilm-Alan SKILL.md 전체, web-designer SKILL.md 전체, seo-landing SKILL.md 전체 + tech-spec §12, marketingskills `copywriting` SKILL.md 전체, ui-ux-pro-max SKILL.md 전체 + `landing.csv` 표본, ibelick `baseline-ui`·`fixing-metadata` 전체, vercel `web-design-guidelines` SKILL.md, divyanshu `landing-page-craft`·`responsive-ui-qa`·`agentic-site-building`, superdesign SKILL.md + `WEBSITE.md` 앞부분.
- **목차/일부만 본 것**: impeccable `new-work.md`·`polish.md`(출력이 잘려 앞뒤만 확인), `critique*.md`·`audit.md`·`harden.md` 등 나머지 40여 개 reference(줄 수만 확인), taste-skill의 `sections-library.md`(1,120줄)·motion·effects 계열, oil-ui의 `media.md`·`motion.md`·`reviewer-manual.md`, obra/superpowers `brainstorming`(목차 + "The Conversation" 절), edisonmbli `refactoring-ui`(목차와 파일 구성), emilkowalski `emil-design-eng`(목차), marketingskills `cro`(목차), plugin87 `ux-ui-agent-skills`(파일 목록과 grep 결과만), anthropics `skill-creator`(작성 규칙 관련 줄만).
- **열어보지 않은 것**: anthropics `canvas-design`, `brand-guidelines`, `theme-factory` 본문(줄 수와 파일 구성만 확인; 웹사이트 제작과의 관련성이 낮다고 판단), vercel `react-best-practices`, marketingskills `site-architecture`·`seo-audit`·`schema`.
- **접근하지 못한 것**: vercel `web-design-guidelines`의 실제 규칙 본문. 이 스킬은 규칙을 원격 URL에서 매번 내려받는 구조라 저장소 안에는 39줄짜리 껍데기만 있다. 원격 파일은 가져오지 않았다.
- **스킬이 아닌 것**: `wilwaldon/Claude-Code-Frontend-Design-Toolkit`은 README 한 개짜리 링크 목록(735줄)이다. 스킬 발굴용 색인으로만 썼다.
- 검색으로 찾았지만 클론하지 않은 것: `plugin87` 외에 `madebymustafa/design-taste`(226★), `h3nryprod01/design-taste`(97★), `mikefutia/conversion-copywriter-skill`(12★), `cmj-hub/claude-landing-page`(3★), `kennedys0/taste-engine`(16★) 등. 대부분 상위 스킬의 파생물이라 우선순위에서 뺐다.
- 별 수는 GitHub 검색 API가 2026-11-17에 돌려준 값이다. 일부 저장소는 숫자가 비정상적으로 커 보이지만 검증 수단이 없어 그대로 적는다.

## 1. 비교 표

| # | 스킬 | 저장소 / 경로 | ★ | 라이선스 | 크기 (SKILL.md / 전체) | 고유 기여 |
|---|---|---|---|---|---|---|
| 1 | frontend-design (Anthropic) | `anthropics/skills` · `skills/frontend-design/` | 196,071 (저장소 전체) | Apache-2.0 (스킬 폴더 LICENSE.txt) | 71줄·약 1,500단어 / 파일 1개 | "AI 생성 디자인이 몰리는 5가지 군집"을 구체적 색상값까지 명시. 계획 → 브리프 대조 → 구현 → 자기비평의 2패스. 디자인 속 글쓰기 규칙 |
| 2 | taste-skill (design-taste-frontend) | `Leonxlnx/taste-skill` · `skills/taste-skill/` | 116,941 | MIT | 381줄·약 4,700단어 / reference 22개 5,485줄 + 스크립트 12개, 41MB | 업종(kind)별 페이지 계획, "취향으로 고르지 말고 뽑아라(deal)", copy-lint, 헤드리스 브라우저 검사와 Stop 훅 finish gate, 사실 날조 금지와 `data-assumed` 표시 |
| 3 | impeccable | `pbakaus/impeccable` · `.claude/skills/impeccable/` | 111,402 | Apache-2.0 | 89줄·약 1,700단어 / reference 45개 5,398줄 + 바이너리 CLI, 101MB | PRODUCT.md(제품 사실)와 DESIGN.md(시각 결정) 분리, 표면 모드 4종(Persuade/Operate/Read/Experience), 20여 개 하위 명령, craft floor |
| 4 | oil-ui | `oil-oil/oil-ui` · 루트 | 3,458 | MIT | 173줄(중국어, 줄이 매우 김) / reference 18개 1,319줄 + 스크립트 9개 | 레퍼런스 해체 절차(제품 참고와 인터랙션 참고 분리), 첫 화면 골격 8종, 그레이스케일 와이어 선행, 컨텍스트 없는 독립 평가자 파견, CJK 가독성 기준 |
| 5 | ui-ux-pro-max | `nextlevelbuilder/ui-ux-pro-max-skill` · `.claude/skills/ui-ux-pro-max/` | 150,446 | MIT | 243줄·약 2,400단어 / CSV 데이터 13종 + 검색 스크립트, 24MB | 검색 가능한 로컬 DB(팔레트 192, 폰트 조합 74, UX 지침 120, 랜딩 패턴 34), MASTER.md + 페이지별 override 영속화, 우선순위 표 |
| 6 | superdesign | `superdesigndev/superdesign-skill` · `skills/superdesign/` | 1,017 | MIT | 157줄·약 2,300단어 / reference 9개 약 1,380줄 | 레퍼런스 URL에서 디자인 DNA 추출(`extract-website`), 로고 불변 규칙, 재개(resume) 상태. 단, 자사 유료 CLI/캔버스에 의존 |
| 7 | frontend-design (Ilm-Alan) | `Ilm-Alan/frontend-design` · 루트 | 171 | MIT | 115줄·약 1,460단어 / 파일 1개 | 8개 미감 앵커를 CSS 토큰으로 잠그고 "이게 나오면 깨진 것" 조건을 명시. 콘텐츠 규율(가짜 데이터·필러 라벨 금지) |
| 8 | web-designer | `MickeyAlton33/web-designer-plugin` · `skills/web-designer/` | 115 | MIT | 215줄·약 1,900단어 / 보조 문서 5개 2,335줄 | 코드 전 6줄 브리프 의무(방향/무드/팔레트/서체/레이아웃/시그니처), 안티패턴 대조표, 최종 자기 검토 3문항 |
| 9 | seo-landing | `aleksandr-alhoff/seo-landing` · 루트 | 212 | MIT | 128줄·약 1,950단어 / reference 4개 995줄 | 브리프 필수 항목, 사용자 승인 STOP POINT, 측정값만 보고하는 검증 계약, 자산 권리 기록(ASSETS.md), 배포 안내(SERVER-SETUP.md) |
| 10 | copywriting (+cro) | `coreyhaines31/marketingskills` · `skills/copywriting/`, `skills/cro/` | 60,826 | MIT | 339줄·약 2,300단어 (cro 198줄) | 상황 진단 A/B/C, 문장 3문항 게이트, 근거 없는 주장을 거절하되 "무엇이 있으면 쓸 수 있는지" 명시, AI 티 목록, 섹션 프레임 |
| 11 | baseline-ui, fixing-metadata, fixing-accessibility | `ibelick/ui-skills` · `skills/*` | 11,128 | MIT | 85 / 112 / 135줄 | MUST/SHOULD/NEVER 단문 제약 목록. 메타데이터 우선순위표(중복 → 제목 → canonical → 소셜카드 → 아이콘 → JSON-LD → 로케일) |
| 12 | web-design-guidelines | `vercel-labs/agent-skills` · `skills/web-design-guidelines/` | 34,207 | 저장소 라이선스 표기 없음 | 39줄 | 규칙을 원격에서 매번 받아오는 얇은 래퍼. `file:line` 형식의 리뷰 출력 |
| 13 | landing-page-craft, responsive-ui-qa 외 | `divyanshu-iitian/agent-website-design-skills` | 4 | MIT | 각 43~55줄 / 스킬 9개 | 전환 브리프 한 줄, 증거 지도(주장 → 가까운 증거), CTA 지도(라벨 → 목적지 → 성공 동작), "Delivery Contract" 절 |
| 14 | brainstorming | `obra/superpowers` · `skills/brainstorming/` | 318,699 | MIT | 316줄 | 질문 규율: 답이 결과물을 바꿀 때만, 한 번에 하나, 먼저 살펴보고 묻기, 나머지는 제안으로 진행 |
| 15 | refactoring-ui | `edisonmbli/refactoring-ui-skill` · `skills/refactoring-ui/` | 474 | MIT(코드) / 책 내용은 비공식 파생 | 221줄 / reference·스크립트 포함 5,692줄 | 팔레트 생성·명암비 검사·토큰 출력 스크립트, 깊이 모드, 범위 가드 (목차만 확인) |
| 16 | emil-design-eng | `emilkowalski/skill` · `skills/emil-design-eng/` | 미확인 | MIT | 684줄 | 애니메이션 의사결정 순서(움직여야 하나 → 목적 → 이징 → 속도) (목차만 확인) |
| — | web-artifacts-builder | `anthropics/skills` | 위와 동일 | Apache-2.0 | 73줄 | 홈페이지 스킬 아님. React+Tailwind+shadcn 번들 스크립트. 디자인 지침은 한 줄 |
| — | Claude-Code-Frontend-Design-Toolkit | `wilwaldon/...` | 1,312 | 없음 | README 735줄 | 스킬 아님. 링크 색인 |

## 2. 스킬별 메모

### 2.1 anthropics/skills — frontend-design

- 파일 하나, 71줄. 스크립트도 reference도 없다. 그런데도 밀도가 가장 높다.
- 역할 설정이 구체적이다: 상투적인 시안을 이미 거절한 클라이언트를 상대하는 스튜디오 디자인 리드.
- 브리프에 주제가 없으면 스스로 "주제 하나, 독자, 페이지의 주된 임무"를 제안 형태로 세우고 확인을 받는다. 무작정 질문하지 않는다.
- 히어로: "큰 숫자 + 작은 라벨 + 보조 통계 + 그라디언트 강조"가 기본값이므로 정말 최선일 때만 쓴다.
- 타이포: 서체는 한두 개, 둘이면 확실히 다르게. 행 길이 80자 미만. 헤드라인에서 단어 하나만 색/이탤릭으로 강조, 전부 대문자 라벨, 불필요한 아이브로 라벨을 대표적인 "생성물 티"로 지목한다.
- 구조 장치(번호 01/02/03, 구분선 등)는 내용이 실제로 순서일 때만 쓴다.
- 모션: 사용자가 유발하지 않은 모션은 한 번의 연출로 모은다. 섹션마다 페이드업, 카드마다 호버 전환은 금지에 가깝다.
- 가장 쓸모 있는 부분: AI 디자인이 몰리는 5개 군집을 색상값과 함께 적어둔 것(크림 배경 + 세리프 + 테라코타, 검정 + 형광 강조색, 신문 조판풍, SaaS 카드 키트, 주제와 무관한 템플릿 장식). "브리프가 정한 것은 그대로 따르고, 비워둔 축을 이 기본값에 쓰지 말라"는 우선순위 규칙이 붙는다.
- 프로세스: 토큰 계획(색 4~6개, 서체 역할, ASCII 와이어프레임, 원칙) → 계획을 브리프와 대조해 "어느 비슷한 요청에도 나왔을 답"인 부분을 고치고 무엇을 왜 바꿨는지 말한다 → 구현 → 스크린샷으로 자기비평.
- 품질 바닥(모바일 반응형, 키보드 포커스, reduced-motion)은 지키되 떠들지 않는다.
- 약점: 질문 목록, 섹션 구성, SEO, 폼, 배포는 전혀 없다. 스타일 지침서이지 제작 절차서가 아니다.

### 2.2 Leonxlnx/taste-skill

- 가장 "홈페이지 제작"에 직접 맞는 스킬. 목표를 "좋은 회사가 실제로 내놓을 사이트"로 잡고 예술 작품 같은 페이지를 명시적으로 배제한다.
- **업종이 모든 것을 정한다**: software / gaming / tech(하드웨어) / product / service / place 6종으로 나누고, 종류별로 섹션 순서·사진 수·허용 효과·팔레트를 다르게 준다. 동네 카페에는 셰이더 효과를 절대 쓰지 않고 사진으로 간다.
- **뽑기(deal)**: 히어로 구성, 팔레트, 서체 조합, 내비/푸터 유형을 스크립트가 이력 파일을 보며 뽑는다. 모델의 취향 수렴을 구조적으로 막는 장치다. impeccable의 `concept-seed`도 같은 발상이다.
- **카피를 먼저 전부 쓴다**(2단계). 사실표(fact sheet) 11개 항목: 무엇인가, 누구를 위한/누구는 아닌가, 지금은 무엇을 쓰나, 진짜 차이와 증거, 고객의 말, 출처 있는 숫자, 사람, 기묘하지만 사실인 디테일, 한계, 적(습관이나 범주), 제안. 빈 항목은 비워두고 해당 섹션을 줄이거나 없앤다.
- 카피 5원칙: h1은 카테고리와 대상/장소를 2~8단어로, 첫 화면에 확실한 사실 하나, 모든 제목에 사물을 가리키는 명사, 버튼은 동사 + 얻는 것, 행동 수는 적게 같은 문구로. 화면당 단어 수 예산까지 있다.
- **날조 금지 범위가 넓다**: 후기, 평점, 인용, 통계, 고객 수, 고객명, 인물 사진, 수상, 언론 문구 전부. 가정이 허용되는 것은 조어한 브랜드명과 장소 업종의 영업시간/가격뿐이고, 가정한 값에는 `data-assumed` 속성을 달아 보고서에 전부 나열한다.
- 사진: 클라이언트 사진 우선, 라이브러리 사진은 디테일 컷에만 3장 중 1장 이하, 스톡 속 얼굴을 직원/고객인 것처럼 쓰지 않는다. 사진이 없으면 촬영 목록(정면 가게 외관, 문에서 본 실내, 손 작업 등)을 보고서에 적는다.
- 연락처: 번지/우편번호/사업자번호/실제 형식 전화번호는 넣지 않고 `.example` 주소를 쓴다(데모 안전장치).
- 폼: 엔드포인트 없으면 mailto 대역, 실제 전송 전에는 성공 문구를 띄우지 않음, 라벨은 항상 보이게, 오류는 해당 필드 아래, 필드 48px.
- head: title/description/og/twitter/icon/theme-color, canonical은 도메인이 확정될 때까지 주석으로 남기고 보고서에 기재.
- **검증**: copy-lint(브라우저 없이 1초 미만), consistency(5개 폭), layout check, 스크린샷, perf, 그리고 gate. Claude Code에서는 frontmatter의 Stop 훅으로 종료 시 자동 실행된다. 최대 3라운드, 거짓 양성은 사유를 적어 waiver로 남기고 검사를 속이지 않는다.
- 보고서 형식이 정해져 있다: gate 결과, waiver, 가정한 사실, 클라이언트가 공급해야 할 사진, 대역 폼 주소.
- 약점: 전체 41MB, SKILL.md가 4,700단어로 매우 조밀하고 자체 키트(`system.css`, starter.html)에 강하게 묶여 있다. 규칙 일부(화면당 한 섹션, 보라색 전면 금지, 캡션 전면 금지)는 저자 취향이다. 클라이언트에게 질문하는 단계가 사실상 없고 "빈약한 브리프는 멈출 이유가 아니다"라는 입장이다. Node 22와 Chrome이 필요하다.

### 2.3 pbakaus/impeccable

- SKILL.md는 89줄짜리 라우터이고 실제 내용은 45개 reference에 있다. 명령 표가 곧 목차다.
- **두 문서 분리**: PRODUCT.md는 제품 사실(사용자, 목적, 포지셔닝, 운영 맥락, 제약, 브랜드 약속, 보유 증거, 원칙, 접근성)만 담고, 시각 결정은 DESIGN.md가 따로 갖는다. init 단계에서는 미감·색·서체를 묻지 않는다.
- **인터뷰 규율**(init, shape): 먼저 저장소를 훑어 이미 알 수 있는 것은 묻지 않는다. 라운드당 2~3문항, 최대 3라운드. 추론은 확인을 받는다. 응답자가 없으면 추론한 사실마다 표시하고 첫 답변에서 그 대체를 밝힌다. 스택이 없는 신규 프로젝트에서는 스택을 한 번 묻고 "위임"이라는 답도 기록한다.
- shape 질문: 무엇을 위한 화면인가, 누가 어떤 상황에서 오는가, 반드시 이해하거나 해야 하는 한 가지는, 옆 제품이 주장할 수 없는 사실은, 실제 콘텐츠와 자산은, 건드리면 안 되는 것은, 다듬어졌어도 틀렸다고 느낄 조건은.
- **모드**: 랜딩/마케팅은 Persuade. 첫 화면은 제안을 이해시키고, 실제로 작동하는 형태의 주 행동(클리닉이면 예약 가능 시간, 상점이면 장바구니)을 드러내야 한다.
- **시각 세계 만들기**: 제품의 고유 메커니즘과 독자의 실제 장면을 적고, 그 문화권에서 7개의 구체적 시각 체계/사물/장소를 끌어낸 뒤 스크립트로 뽑는다. "이 업종이 늘 내놓는 페이지"와 그 뻔한 반대편 둘 다를 후보에서 뺀다. 사용자가 원하면 고를 수 있는 "업종 표준 그대로"라는 조용한 출구를 항상 둔다.
- **craft floor**: 명암비 4.5:1, 본문 폭 65~75ch, 디스플레이 최대 6rem, 연출된 모션은 하나, 상태(hover/disabled/loading/error/empty). 브라우저 기본 표면(선택 색, 캐럿, 스크롤바, 포커스 링, 밑줄 오프셋)을 테마에 맞추라는 항목이 독특하다. 거부 목록: 같은 크기 아이콘 카드 격자, 히어로 지표 템플릿, 제목 위 아이브로(유일한 절대 금지), 그라디언트 텍스트, 장식용 글래스, 카드 좌측 색 띠, 이모지 아이콘.
- "브리프가 이긴다": 사용자가 정한 미감을 내 취향으로 돌리는 것은 실패. 다듬기는 보존, 리디자인은 교체이고 어중간하게 섞지 않는다.
- 사실과 시연의 구분: 가격·고객·벤치마크는 지어낼 수 없지만, 시연용 자료는 만들되 실제로 오인될 수 있는 곳에 합성임을 표시하고 교체 목록을 넘긴다.
- 약점: 자체 바이너리 CLI를 내려받아 실행하는 구조(101MB 저장소)라 환경 의존이 크다. 문장이 길고 규칙이 서로를 참조해 읽기 어렵다. 카피와 섹션 구성은 얕다. SEO·폼·배포는 `harden`/`foundations`에 흩어져 있고 이번에 확인하지 못했다.

### 2.4 oil-oil/oil-ui

- 중국어로 쓰였지만 "사용자 언어로 답하라"는 규칙이 있다. 한국어 스킬을 쓸 때 가장 참고할 만한 CJK 사례다.
- 주 흐름 6단계: 제품 사실 → 화면마다 주인공 하나와 주 행동 하나 → 소재/콘셉트 → 그레이스케일 구조 → 구현 → 실제 화면 평가. 각 단계의 관문을 넘지 못하면 다음으로 가지 않는다.
- **범위 표**가 뛰어나다: 작은 수정은 절차를 전부 건너뛰고 바로 고친다. 새 화면, 방향 비교 요청, 기존 프로젝트 개선, 스크린샷 재현, 읽기 전용 리뷰가 각각 다른 경로다.
- **질문 정책**: 빠진 정보가 핵심 방향을 바꾸고 추론할 수 없을 때만 한 번에 몰아서 묻는다. 되돌릴 수 있는 세부는 스스로 정하고 가정을 밝힌다. 기본은 방향 하나를 추천하고 전체 과정에서 확인은 한 번. "알아서 해"라고 하면 기다리지 않는다.
- **레퍼런스 해체 4단계**: (1) 업종을 말하고 개성이 가장 뚜렷한 2~3곳 선정(가장 유명한 곳이 아니어도 됨), (2) 실제 화면을 브라우저로 받아 작업 폴더에 저장한 뒤 그림을 보며 6~10개 요소로 해체하고 각 요소에 "어떤 모습인가, 왜 그런가"를 적음. "깔끔, 여백, 강조색 하나"만 나오면 해체 실패, (3) 인터랙션 참고는 따로: 트리거 → 대상 변화 → 피드백 → 다음 상태, (4) 내 제품의 독자/내용/과업에 대조해 남길 것과 바꿀 것을 결정. 화면을 못 구하면 그렇게 적는다.
- 세 가지 구분: 기준선(사용자가 이미 기대하는 구조, 따른다), 상투(업종 전체의 기본 판형, 깬다), 닮은꼴(서체·색·주시각이 특정 사이트와 같음, 금지).
- 톤 5눈금(에너지, 완성도, 밀도, 무게, 엄숙함)과 "모호어 번역표"(고급스럽게, 깔끔하게 같은 말을 관찰 가능한 결정으로 바꾼다).
- **첫 화면 골격 8종**: 전면 이미지 위 글자, 중앙 단일 오브제, 화면이 곧 인터페이스, 전면 타이포, 가로 전폭 적층, 격자 콜라주, 세로/사선, 좌우 분할. 좌우 분할은 모델의 기본값이므로 이유를 적어야 쓸 수 있다. 골격을 정한 뒤에 카피를 쓴다.
- 가독성 문턱: 읽는 페이지의 본문 16~18px, 행간 1.6~1.75, 여러 줄 제목 행간 1.2~1.35. 영문 포스터식 좁은 행간을 CJK에 그대로 쓰지 말 것. 9~12px 작은 글씨로 "세련됨"을 만들지 말 것.
- **독립 평가**: 이력 없는 서브에이전트에게 현재 버전 스크린샷, 원래 과업, 제약만 주고 소스 코드·변명·이전 점수는 주지 않는다. 10점제. 파견할 수 없으면 "독립 평가 안 함"이라고 적는다.
- 능력 경계 절: 그림을 볼 수 없으면 "실제 시각 미검증"이라고 쓰고 점수를 매기지 않는다.
- 인도 시 "다음에 할 수 있는 일"을 최대 3개, 비용과 함께 번호로 제시한다.
- 약점: SEO, 폼, 접근성 세부, 배포가 없다. 자사 이미지 생성 크레딧과 oil-tone 스킬로 유도하는 부분이 있다. 설명(description) 필드가 지나치게 길다.

### 2.5 nextlevelbuilder/ui-ux-pro-max

- 본질은 스킬이라기보다 **검색 가능한 CSV 데이터베이스 + Python 검색 스크립트**다.
- 장점: 우선순위 표(접근성 → 터치 → 성능 → 스타일 → 레이아웃 → 타이포/색 → 애니메이션 → 폼 → 내비 → 차트), 결과가 0건이면 지어내지 말고 기본값이라고 밝히라는 규칙, 스택을 가정하지 말고 감지하라는 규칙, MASTER.md + 페이지별 override 구조, 디자인 토큰을 DTCG/CSS로 내보내기.
- `landing.csv`의 34개 패턴은 섹션 순서와 CTA 위치를 준다(예: 히어로 → 문제 → 해법 → 후기 → CTA).
- 한국어: `typography.csv`에 "Korean Modern"(Noto Sans KR 단일) 한 줄, UX 지침에 한글 IME 조합 중 Enter 처리 한 줄. Pretendard와 `word-break: keep-all`은 없다.
- 약점(과대평가 판단 근거): 업종 키워드로 팔레트·서체·효과를 조회해 조립하는 방식은 그 자체가 평균적인 결과로 수렴한다. `landing.csv` 표본에 "Hero parallax, CTA glow on hover", 고정 hex 값 등 다른 상위 스킬들이 금지하는 패턴이 추천으로 들어 있다. 클라이언트 질문, 카피, 사실 검증, 시각 QA 루프가 없다.

### 2.6 superdesigndev/superdesign-skill

- 자사 SaaS CLI(`npx @superdesign/cli`, 로그인·크레딧 필요)를 조작하는 스킬. 독립적으로 쓸 수 없다.
- 그래도 가져올 만한 것: (1) 코드베이스 유무를 먼저 판정하고, 없으면 대화로 디자인 맥락(무엇을, 누구에게, 스타일/브랜드 선호, 참고 사이트)을 먼저 모은다. (2) 참고 URL 처리 방식을 구분한다: 스타일만 빌리기, 한 사이트의 구조 + 다른 사이트의 미감, 여러 스타일 병합, 토큰만 추출. "사이트를 복제해 달라"는 요청은 스타일을 참고한 재구성이지 복사가 아니라고 정직하게 말한다. (3) **로고 불변 규칙**: 로고 자리가 있고 브랜드 자산 로고가 있으면 그 파일이 그대로 보여야 하고, 이니셜·이모지·지어낸 SVG로 대체하지 않는다. (4) 자산 용도 구분: 브랜드 정체성 / UI 아이콘 / 임시 참고 / 최종 콘텐츠. (5) 생성마다 비용이 드니 모호하면 한 번 묻는다. (6) 실패 시 재시도는 한 번.

### 2.7 Ilm-Alan/frontend-design

- 8개 앵커(Swiss, Industrial, Brutalist, Aurora Maximalism, Chaotic Maximalism, Retro-Futuristic, Organic, Lo-Fi)마다 표면색·서체·강조색·구조·질감을 hex와 폰트명으로 고정하고 "이것이 나타나면 깨진 것" 조건을 붙인다. 혼합은 금지.
- "의외의 조합을 택하라"(스위스풍 펑크 레이블, 브루탈리즘 고급 시계)는 지시는 데모에는 강하지만 실제 클라이언트 홈페이지에는 위험하다.
- **콘텐츠 규율**은 그대로 가져올 만하다: 실제 데이터인 척하는 날조, 지워도 정보가 안 줄어드는 필러 라벨, 표준 UI 문구의 테마식 치환("다음" 대신 과장된 문구), 유니코드 글리프 아이콘, AI 특유의 말투.
- 출력 계약(방향 선언, 토큰 충실도, 콘텐츠 규율, 차별점이 실제로 보이는가)과 출고 전 5문항이 짧고 검증 가능하다.

### 2.8 MickeyAlton33/web-designer-plugin

- 코드 전에 6줄 브리프(DIRECTION/MOOD/PALETTE/TYPE/LAYOUT/SIGNATURE)를 사용자에게 말하게 한다. "말하지 않으면 조용히 기본값으로 돌아간다"는 이유가 붙어 있다.
- 안티패턴 표(파랑-보라 그라디언트, 모든 곳에 12px 라운드, 동일한 그림자, 균일 카드 격자, Inter 일색, 전부 중앙 정렬, 이모지 아이콘, "✨ Introducing" 알약 배지, 가짜 아바타 + "1만 명이 신뢰")는 좋다.
- 그러나 대안으로 제시한 것들이 다른 스킬의 금지 목록과 충돌한다: 숫자 01/02/03 장식, 자간 넓힌 오버라인, 강조색으로 단어 하나 칠하기, 스크롤 하이재킹, 섹션마다 스크롤 리빌. Anthropic과 impeccable은 이것들을 "2세대 AI 티"로 본다.
- "Awwwards에 실릴까?"가 기준이고 "Lorem ipsum 대신 그럴듯한 제품명과 카피를 지어내라"고 한다. 포트폴리오용으로는 좋지만 실제 사업자 홈페이지 기준으로는 방향이 다르다.
- 최종 자기 검토 3문항은 유용하다: 가장 흔해 보이는 요소 하나를 지금 다시 디자인, 시그니처가 코드에 실제로 있는가, 브랜드명을 지우면 아무 회사 것이 되는가.

### 2.9 aleksandr-alhoff/seo-landing

- 별은 적지만 **전문 제작자 관점의 절차**가 가장 잘 들어 있다.
- 모드 라우팅: generate / audit-only(읽기 전용, 파일 생성 금지) / fix-existing. 감사나 부분 수정을 생성용 브리프 누락으로 막지 않는다.
- 생성 전 필수 브리프: 최종 도메인, 사이트 이름, 언어 태그와 og:locale을 별개 입력으로, 주제와 키워드 1~3개, 사업 유형(검증된 상호·주소·전화), CTA와 연락 수단, 폼의 전송 목적지·방식·개인정보 동의 문구·제출물 보관 위치, 브랜드 승인 파비콘, **객관적 주장의 출처와 주장 책임자**, 이미지 제공 여부. 도메인이나 키워드가 없으면 지어내지 말고 먼저 묻는다.
- 산출물이 폴더 단위다: index.html, images/, robots.txt, sitemap.xml, ASSETS.md(자산별 권리자·출처·라이선스·허용 범위·만료), SERVER-SETUP.md(캐시, 압축, 보안 헤더).
- **STOP POINT**: 페이지를 보여주고 명시적 승인을 받기 전에는 검증과 최종 보고로 넘어가지 않는다.
- 검증 계약: W3C 유효성, 참조한 로컬 파일 실재 여부, JSON-LD 구문(구문 유효와 리치 결과 자격은 다르다고 구분), 320/768/1280/1920 스크린샷, Lighthouse 3회 중앙값, 수동 접근성 점검, 크롤 계약. 실행 못 한 검사는 `BLOCKER: 사유`로 보고하고 측정하지 않은 점수를 쓰지 않는다.
- 진실성 절: 건강·금융·법률 주장은 해당 관할의 검토자를 요구. 공개된 이미지라고 해서 사용 허가가 있는 것은 아니다.
- 지연 로딩 원칙: 유튜브·지도는 파사드, 채팅/팝업/쿠키 배너는 첫 로드에 넣지 않는다.
- 약점: 디자인 방향에 대한 내용이 없다. 외부 폰트/라이브러리 전면 금지, JS 15KB 같은 규칙은 속도 점수 극대화용이라 브랜드 사이트에는 과하다. 러시아어 시장 관행이 섞여 있다.

### 2.10 coreyhaines31/marketingskills — copywriting, cro

- 작성 전 맥락 4묶음: 페이지 목적과 단 하나의 주 행동, 독자(문제, 반론, 그들이 쓰는 말), 제품/제안(차이, 증거), 유입 맥락.
- 프로젝트에 `product-marketing.md`가 있으면 먼저 읽고 이미 답이 있는 것은 묻지 않는다.
- **상황 진단**: A 백지/상투문(각도는 자유, 사실은 불가), B 고유한 목소리가 있는 초안(복원하고 그들의 어휘 유지), C 지점 수정(요청한 것만). 진단을 한 줄로 근거와 함께 먼저 말한다.
- **3문항 게이트**: 그림이 그려지는가, 참/거짓을 가릴 수 있는가, 경쟁사가 똑같이 쓸 수 있는가.
- **근거 없는 주장 처리**: 쓰지도 않고 조용히 빼지도 않는다. 주장을 지목하고, 왜 부족한지, 가장 가까운 대안, 무엇이 있으면 원래 주장을 쓸 수 있는지(후기 내보내기, 보증 정책, 인증서, 인용 가능한 연구)를 적는다. 클라이언트의 할 일 목록이 된다.
- AI 티: "X가 아니라 Y", 부정 나열, 꼬리 덧붙이기, 자문자답, 상투 도입구, 짧은 카피의 줄표. 동의어 교체는 새 티를 만든다.
- 섹션 프레임: 헤드라인/서브헤드/주 CTA → 사회적 증거 → 문제 → 해법/이점 3~5개 → 작동 방식 3~4단계 → 반론 처리(FAQ, 보증) → 최종 CTA. 홈페이지는 여러 방문 의도에 경로를 주고, 랜딩은 메시지 하나와 CTA 하나.
- CTA: 약한 것(제출, 가입, 더 알아보기, 시작하기) 대 강한 것(동사 + 얻는 것).
- 약점: 영어권 SaaS 전환 관점. 주장에 인용한 수치("+81% 전환")는 2차 출처라 그대로 옮기면 안 된다. `[NEED: ...]` 플레이스홀더를 초안에 남기는 방식은 taste-skill의 "페이지에는 괄호를 남기지 말고 보고서에 적어라"와 충돌한다. 둘 다 옳다: 초안 문서에는 표시, 게시 페이지에는 금지.

### 2.11 ibelick/ui-skills

- 형식이 배울 점이다: MUST / SHOULD / NEVER로 시작하는 한 줄 규칙, 범주별 묶음, 85줄.
- baseline-ui: `h-screen` 대신 `h-dvh`, 고정 요소에 safe-area, 제목에 `text-balance`·본문에 `text-pretty`, transform/opacity만 애니메이션, 요청 없으면 그라디언트·애니메이션 금지, 뷰당 강조색 하나.
- fixing-metadata: 메타는 페이지당 한 곳에서 정의, title/description/canonical/og:url 일치, OG 이미지는 절대 URL, 스테이징은 noindex, 실제 콘텐츠에 대응하지 않는 JSON-LD 금지, 평점·후기·가격 날조 금지, 소셜 카드는 localhost가 아닌 실제 URL에서 확인.
- 약점: React/Tailwind 전제, 홈페이지 전체 흐름은 다루지 않는다.

### 2.12 vercel-labs/agent-skills — web-design-guidelines

- 39줄. 규칙 본문이 저장소에 없고 원격 URL을 매번 가져온다. 규칙을 항상 최신으로 유지하는 방법이지만, 네트워크가 막히면 빈 스킬이고 원격 내용이 곧 지시가 되므로 공급망 위험이 있다. 마스터 스킬에서는 따라 하지 않는 편이 낫다.
- 본문은 가져오지 않았으므로 내용 평가는 보류한다.

### 2.13 divyanshu-iitian/agent-website-design-skills

- 별 4개, 각 스킬 50줄 안팎. 깊이는 얕지만 구조가 깔끔하다: Workflow(번호) → Rules → **Delivery Contract** → Reference 한 개.
- landing-page-craft: 전환 브리프 한 줄(독자, 상황, 제안과 결과, 주 행동, 가장 큰 반론), 증거 재고 조사, 첫 뷰포트가 답할 4문항(이게 뭔가, 나를 위한 건가, 되면 뭐가 바뀌나, 다음에 뭘 하나), 증거와 위험 완화는 그것이 뒷받침하는 결정 근처에 두고 로고 벽에 몰아넣지 않기, 가격·갱신·개인정보·해지 정보 숨기지 않기.
- responsive-ui-qa: 테스트 매트릭스(경로 × 상태 × 폭 × 입력), 심각도 3단계, 콘텐츠 스트레스(긴 라벨, 끊기지 않는 문자열, 번역 팽창, 누락/대형 미디어), overflow를 숨기거나 글자를 줄여서 고치지 말 것.

### 2.14 obra/superpowers — brainstorming

- 디자인 스킬은 아니지만 질문 규율이 가장 정제돼 있다.
- 묻기 전에 먼저 살펴본다. 답이 결과물을 바꾸고 요청과 프로젝트 어디에도 답이 없을 때만 묻는다. 나머지는 "내 판단과 이유"를 제안으로 말하고 진행한다. 한 번에 하나, 상대의 어휘로.
- "왜"를 알기 전에는 예시 답을 붙이지 않은 열린 질문. 그 뒤에는 선택지를 각각의 대가와 내 추천과 함께 구체적으로.
- 다룰 영역(질문 목록이 아님): 무엇이고 왜 특별한가, 왜 지금이고 성공은 무엇인가, 목표/비목표/반목표, 선례(좋아했거나 싫어한 것), 현재 상태, 신경 쓰는 디테일.
- 되짚어 말하기(play it back) → 문서 → 승인 → 계획.

### 2.15 edisonmbli/refactoring-ui-skill, emilkowalski/skill (목차만 확인)

- refactoring-ui: "결정 전에 먼저 감지", 의도별 라우팅(토큰/구현/다듬기/감사), 깊이 모드, 범위 가드, 명암비 검사·팔레트 생성 스크립트. 책 내용을 재구성한 비공식 스킬이라 문구 차용에는 주의가 필요하다.
- emil-design-eng: 애니메이션 결정 순서, 버튼 반응성, `scale(0)`에서 시작하지 않기, transform/opacity만, reduced-motion. 684줄로 길다. 홈페이지 스킬에는 모션 절 몇 줄만 필요하다.

## 3. 종합

### 3.1 인테이크 / 발견

- 좋은 스킬들의 공통점은 **질문을 적게, 근거 있게** 한다는 것이다.
  - 먼저 살펴보고 묻는다(impeccable init, superpowers, marketingskills의 context 파일).
  - 답이 방향을 바꾸는 것만 묻는다(oil-ui, superpowers). 라운드당 2~3문항, 최대 3라운드(impeccable). 한 번에 몰아서 한 번(oil-ui).
  - 제품 사실과 시각 취향을 분리한다. 사실 단계에서는 색·서체를 묻지 않는다(impeccable).
- 질문 내용의 합집합:
  - 무엇을 파는가, 누가 사는가, 단 하나의 주 행동(taste-skill, marketingskills, divyanshu)
  - 독자의 상황과 가장 큰 반론(divyanshu, marketingskills)
  - 옆 경쟁자가 주장할 수 없는 사실(impeccable shape, marketingskills 3문항 게이트)
  - 보유한 실제 자료: 로고, 사진, 가격, 주소, 영업시간, 후기, 수치와 그 출처(taste-skill fact sheet, impeccable "Evidence on Hand", seo-landing)
  - 건드리면 안 되는 것, "다듬어졌어도 틀렸다고 느낄 조건"(impeccable shape), 반목표(superpowers)
  - 도메인, 언어, 폼 전송처와 동의 문구, 스택과 배포 대상(seo-landing, impeccable init)
- 답이 없을 때:
  - 주제·독자·임무를 스스로 제안으로 세우고 확인(Anthropic).
  - 방향 하나를 추천하고 이유를 적은 뒤 진행. "알아서 해"면 기다리지 않는다(oil-ui).
  - 추론한 사실마다 표시하고 첫 답변에서 밝힌다(impeccable). 가정한 값은 `data-assumed`로 표시하고 보고서에 나열(taste-skill).
  - 빈 사실은 지어내지 않고 섹션을 줄이거나 없앤다(taste-skill). 초안에는 `[NEED: …]`(marketingskills), 게시 페이지에는 금지(taste-skill).
  - 사실이 없으면 묻고, 그래도 없으면 생략 또는 BLOCKER(seo-landing).

### 3.2 레퍼런스 조사 방법

- 체계적인 절차를 가진 것은 oil-ui뿐이다. 요지는 2.4절에 적은 4단계(업종 지목 → 실제 화면 확보 후 6~10요소 해체 → 인터랙션 참고 별도 → 남길 것/바꿀 것)와 기준선/상투/닮은꼴 구분.
- superdesign은 도구로 푼다: URL에서 design.md, 토큰, 콘텐츠 구조를 뽑고, "스타일만 빌리기 / 구조 + 미감 재조합 / 병합"을 구분한다.
- impeccable은 경쟁 사이트가 아니라 **독자의 문화권**에서 7개의 시각 체계를 끌어내고, 사용자가 댄 참고 제품은 "세계"가 아니라 "완성도의 기준"으로만 쓴다.
- taste-skill은 figma.com과 x.ai를 고정 기준으로 두고 "참고 사이트의 코드·카피·사진·시그니처 효과는 복사 금지"만 둔다.
- 공통 원칙: 기억이 아니라 실제 화면을 보고, 화면을 못 구했으면 그렇게 적는다. 참고 사이트의 내용을 내 제품의 사실로 메우지 않는다.

### 3.3 디자인 방향 (AI 슬롭 회피)

- **1세대 티**(거의 모든 스킬이 금지): 보라/파랑 그라디언트, Inter 일색, 전부 중앙 정렬, 동일 라운드와 동일 그림자의 카드 격자, 글래스모피즘, 이모지 아이콘, 그라디언트 텍스트.
- **2세대 티**(Anthropic, impeccable, taste-skill만 짚음): 크림 배경 + 세리프 + 테라코타, 검정 + 형광 강조, 신문 조판풍, 대문자 아이브로, 가운뎃점 메타 문자열, 01/02/03 번호, 장식용 모노스페이스, 링크 끝 화살표, 헤드라인 한 단어 강조. 1세대를 피하다가 여기로 수렴한다는 점이 핵심이다.
- 수렴을 막는 구조적 장치:
  - 코드 전에 방향을 글로 선언(web-designer 6줄, Anthropic 토큰 계획, oil-ui 방향 카드).
  - 계획을 브리프와 대조해 "어느 요청에도 나올 답"을 고친다(Anthropic).
  - 스크립트로 뽑고 이력을 남긴다(taste-skill deal, impeccable concept-seed).
  - 토큰을 잠그고 위반 조건을 명시(Ilm-Alan).
  - 첫 화면 골격을 카피보다 먼저 고르고 좌우 분할에는 사유를 요구(oil-ui).
- 방향의 출처는 **주제 자체**다: 업종의 재료와 어휘(Anthropic), 업종 종류(taste-skill), 독자의 문화권(impeccable), 톤 5눈금(oil-ui).
- 절제: 대담함은 한 곳에(Anthropic), 시그니처 하나(web-designer, Ilm-Alan), 연출된 모션 하나(Anthropic, impeccable).
- 타이포 수치: 본문 폭 65~75ch 또는 80자 미만, 디스플레이 최대 6rem, 자간 하한 -0.04em(impeccable), CJK 본문 16~18px·행간 1.6~1.75(oil-ui), 제목 `text-balance`(ibelick).
- 색: 인터페이스는 90~95% 중립이고 색은 사진과 제품에서 온다(taste-skill). 뷰당 강조색 하나(ibelick). 밝기/어둡기는 업종이 아니라 사용 장면으로 정한다(impeccable).
- 모션: transform/opacity만, 진입은 ease-out, 피드백 200ms 이내(ibelick). 스크롤에 따라 페이드인하는 카드, 텍스트 패럴랙스, 스크롤 하이재킹 금지(taste-skill). reduced-motion에서 아무것도 숨은 채로 남지 않게.
- 상충: web-designer와 oil-ui는 랜딩에 스크롤 리빌과 스크롤 서사를 권하고, Anthropic과 taste-skill은 섹션별 리빌을 금지한다. ui-ux-pro-max 데이터는 패럴랙스와 글로우를 추천한다. 마스터 스킬은 한쪽을 골라야 한다. 사업자 홈페이지라면 절제 쪽이 안전하다.
- 최우선 규칙: 브리프가 이긴다(Anthropic, impeccable). 금지 목록은 "비워둔 축"에만 적용된다.

### 3.4 콘텐츠/카피와 정보 구조

- 카피를 레이아웃보다 먼저(taste-skill, divyanshu). 단, 히어로 골격은 카피보다 먼저(oil-ui). 절충: 사실표 → 골격 → 카피 → 레이아웃.
- 첫 화면 4문항: 이게 뭔가, 나를 위한 건가, 되면 뭐가 바뀌나, 다음에 뭘 하나(divyanshu). h1은 카테고리 + 대상/장소, 첫 화면에 확실한 사실 하나(taste-skill).
- 섹션 순서: 범용 프레임(marketingskills)과 업종별 계획(taste-skill). 장소 업종은 방문 정보가 둘째 화면. 필요한 섹션만: "섹션 수 연극"을 피한다(divyanshu). 말할 사실이 없는 섹션은 뺀다(taste-skill).
- CTA: 동사 + 얻는 것, "더 알아보기/제출/시작하기" 금지. 주 행동은 거래를 이름으로 부르고 내비·히어로·마무리에서 같은 문구. 히어로에 최대 2개. 누르면 무슨 일이 일어나는지 그대로 말한다(Anthropic).
- 증거: 실제 것만. 주장 근처에 배치하고 로고 벽에 몰지 않는다(divyanshu, marketingskills cro). 증거가 없으면 사실 나열이거나 아무것도 없음(taste-skill). 근거 없는 주장은 거절하고 "무엇이 있으면 풀리는지" 적는다(marketingskills).
- 목소리: 클라이언트 어휘를 고급화하지 않는다(marketingskills). 모델의 기본 목소리(따뜻하고 겸손하고 약간 문학적)를 피하고 레지스터를 고른다(taste-skill). 장치는 페이지당 한 번.
- 3문항 게이트와 swap test(marketingskills), "브랜드명을 지우면 누구 것이든 되는가"(web-designer).
- UI 문구: 표준 동작에는 표준 문구(Ilm-Alan). 오류는 필드를 지목하고 무엇을 입력할지 말한다(taste-skill, Anthropic).

### 3.5 구현 규칙

- 스택: 가정하지 말고 감지(ui-ux-pro-max). 빈 폴더면 정적 HTML, 기존 프로젝트면 그 스택(taste-skill). 신규면 한 번 묻고 "위임"도 기록(impeccable). 기존 컴포넌트와 토큰 우선, 같은 종류의 두 번째 라이브러리를 들이지 않는다(oil-ui, ibelick).
- 반응형: 검사 폭 1440/1024/820/768/390 + 320 overflow(taste-skill), 320/768/1280/1920(seo-landing). 탭 타깃 44px. `h-dvh`, safe-area(ibelick). overflow를 숨겨서 고치지 않는다(divyanshu). 100%와 200% 확대(oil-ui).
- 접근성: 명암비 4.5:1, 보이는 라벨, alt, 제목 단계, skip link, focus-visible, 메뉴 버튼 상태, reduced-motion(taste-skill system.md, impeccable craft floor). 자동 도구만으로 WCAG 적합을 선언하지 않는다(seo-landing).
- 성능: AVIF/WebP, 공간 예약(CLS), 유튜브·지도 파사드, 서드파티 위젯 지연(seo-landing). WebGL 컨텍스트 4개 이하(taste-skill).
- SEO/메타: title, description, canonical, og, twitter, favicon, theme-color, lang, JSON-LD는 실제 콘텐츠에 대응할 때만(ibelick, seo-landing, taste-skill). robots.txt, sitemap.xml(seo-landing). 도메인 확정 전 canonical은 보류(taste-skill).
- 폼: 전송처·동의 문구·보관 위치를 브리프에서 받는다(seo-landing). 실제 전송 전 성공 문구 금지, 오류는 필드 아래, 6필드 이하, 붙여넣기 허용(taste-skill, ibelick).
- CSS: 섹션 선택자와 요소 선택자의 특이성 충돌 주의(Anthropic). 토큰을 먼저 정의하고 소비(web-designer). 브라우저 기본 표면(::selection, 스크롤바, 포커스 링) 테마화(impeccable, web-designer).

### 3.6 QA / 검증

- 스크린샷을 실제로 본다. "저장에 성공했다"는 "봤다"가 아니다(oil-ui). 한 번 볼 때 몰아서 고치고 다시 본다(impeccable).
- 결정론적 검사와 눈 검사를 나눈다: copy-lint·consistency·perf는 스크립트, 마지막 줄은 "네 눈으로"(taste-skill).
- 종료 관문: Stop 훅으로 gate 자동 실행, 최대 3라운드, waiver는 사유와 함께(taste-skill).
- 독립 평가자: 컨텍스트 없는 서브에이전트에게 화면과 과업만(oil-ui). impeccable critique도 위임 평가를 쓴다.
- 자기 검토 문항(web-designer, Ilm-Alan), "액세서리 하나를 빼라"(Anthropic).
- 정직한 보고: 측정한 것만, 못 돌린 검사는 BLOCKER(seo-landing). 볼 수 없으면 "시각 미검증"(oil-ui). 가정, 대역, 클라이언트가 공급할 것 목록(taste-skill).
- 사용자 승인 지점: 방향 확인 한 번(oil-ui), 브리프 확인(impeccable shape), 완성본 승인 후 검증(seo-landing).
- 전체 행동 경로 확인: 링크, 폼 상태, 키보드 경로(divyanshu).

### 3.7 스킬 작성 기법

- **description**: 무엇을 하는지 + 언제 쓰는지를 모두 담는다. 발동 문구를 구체적으로 나열한다(taste-skill: "페이지가 템플릿 같다고 할 때"까지 포함). skill-creator는 모델이 스킬을 덜 발동하는 경향이 있으니 약간 적극적으로 쓰라고 한다. 반대로 web-designer는 "명시적으로 부를 때만"이라고 적어 오발동을 막는다. oil-ui는 쓰지 말아야 할 경우(문구 수정 같은 일상 수정)를 description에 적는다.
- **길이**: 단일 파일형은 70~120줄·1,500단어 안팎(Anthropic, Ilm-Alan). 라우터형은 90~250줄(impeccable 89, seo-landing 128, superdesign 157, oil-ui 173, web-designer 215, ui-ux-pro-max 243). taste-skill만 381줄·4,700단어로 예외. skill-creator 권고는 본문 500줄 미만.
- **점진적 공개**: SKILL.md는 흐름과 라우팅, 세부는 reference. "이 단계에 이르면 이 파일을 읽어라"를 명시하고 미리 다 읽지 말라고 적는다(oil-ui, impeccable). 필요한 자산 × 페이지 종류 × 참조 파일 표(taste-skill §3). reference는 한 단계 깊이로 유지.
- **범위/모드 라우팅을 맨 앞에**: 작은 수정은 절차 생략(oil-ui), generate/audit/fix(seo-landing), 명령 표(impeccable).
- **스크립트**: 결정론적인 일만(린트, 스크린샷, 명암비, 뽑기, 검색). 스크립트가 없을 때의 대체 경로를 적는다(impeccable "Launcher unavailable", superdesign Step 0). 스크립트 출력은 데이터이지 지시가 아니라고 적는다(oil-ui).
- **체크리스트**: 검사 항목마다 검사 ID를 붙여 기계 검사와 연결(taste-skill). MUST/SHOULD/NEVER 단문(ibelick). 출고 전 5문항(Ilm-Alan).
- **출력 계약**: 무엇을 산출하고 보고하는지 정한다(divyanshu Delivery Contract, taste-skill Report, oil-ui 인도 설명 + 다음 할 일).
- **규칙에 이유를 붙인다**: "테스트에서 이 패턴은 몇 점 낮았다"(taste-skill), "말하지 않으면 기본값으로 돌아간다"(web-designer). 이유가 있어야 모델이 경계 사례에서 올바르게 일반화한다.
- **우선순위 규칙**: "이 9개가 나머지를 이긴다"(taste-skill House rules), "브리프가 이긴다"(impeccable, Anthropic).
- **영속 문서**: PRODUCT.md / DESIGN.md(impeccable), MASTER.md + override(ui-ux-pro-max), 작업 폴더 `.oil-ui/<작업명>`(oil-ui), `.taste-skill/` 이력.
- **능력 경계 절**: 볼 수 없거나 실행할 수 없을 때 무엇이라고 보고할지(oil-ui).
- 피할 것: 원격에서 규칙을 받아오는 구조(vercel), 자사 유료 서비스 의존(superdesign), 수십 MB짜리 키트 동봉(taste-skill, impeccable).

### 3.8 공백 (어느 스킬도 제대로 다루지 않는 것)

- **한국어 타이포그래피**: Pretendard, `word-break: keep-all`, `overflow-wrap`, 한글 제목의 줄바꿈 단위(어절), 한글·영문·숫자 혼용 시 자간과 기준선, 한글 웹폰트 서브셋과 용량, `font-display`. 확인한 것은 ui-ux-pro-max의 Noto Sans KR 한 줄과 IME 한 줄, plugin87의 KRDS(Pretendard GOV) 디자인 시스템 문서 하나, oil-ui의 중국어 기준 행간 수치뿐이다. `keep-all`을 규칙으로 가진 스킬은 없었다.
- **한국 시장 관행**: 사업자등록번호·통신판매업 신고 등 푸터 법정 표기, 개인정보처리방침과 수집·이용 동의 체크박스, 카카오톡 채널/네이버 예약·지도/전화 버튼, 네이버 검색 등록(서치어드바이저)과 네이버용 메타, 카카오톡 공유 미리보기. 전무하다. taste-skill은 데모 안전을 이유로 오히려 사업자번호와 실제 전화번호를 금지한다.
- **브랜드 자산 규칙**: 로고를 다시 그리거나 대체하지 말라는 규칙은 있다(superdesign, taste-skill). 그러나 색 변경 금지, 비율·여백(클리어 스페이스)·최소 크기, 배경 대비용 버전 선택, 원본 벡터가 없을 때의 처리(요청할 것, 래스터를 추적해 재현하지 말 것)는 일반 규칙으로 없다. plugin87의 개별 브랜드 문서에만 "로고 재채색 금지"가 흩어져 있다.
- **인물 사진과 초상권/개인정보**: taste-skill이 "스톡 얼굴을 직원/고객으로 쓰지 말 것"까지는 간다. 실제 직원·고객·환자·미성년자 사진의 동의 확인, 얼굴 크롭과 보정 한계, AI로 인물을 생성·변형하지 않기, 전후 사진, EXIF 위치 정보 제거, 사진 속 제3자·차량번호·화면 내용 가리기는 없다. seo-landing의 ASSETS.md는 저작권은 다루지만 초상권은 다루지 않는다.
- **미검증 주장과 자격**: 날조 금지는 여러 곳에 있다. 그러나 클라이언트가 **직접 준** 주장(1위, 최초, 수상, 자격증, 경력 연수, 의료·법률·금융 효능)을 어떻게 다룰지는 seo-landing의 "주장 책임자"와 "관할 검토자" 두 줄, marketingskills의 "unlock" 규칙뿐이다. 업종별 광고 규제(의료, 법률, 금융, 건강기능식품), "확인됨/클라이언트 제공·미확인/게시 보류" 3단계 표시, 출처 기록 양식은 없다.
- **핸드오프/배포**: seo-landing의 SERVER-SETUP.md와 vercel의 deploy 스킬(별도) 외에는 없다. 도메인/DNS, 호스팅 선택, 폼 수신 테스트, 분석 도구와 동의, 404/파비콘/OG 최종 확인, 클라이언트가 직접 고칠 수 있는 범위와 수정 안내서, 자산 원본과 계정 소유권 이전, 백업과 롤백은 비어 있다.
- **클라이언트 승인 관문**: 방향 확인 한 번(oil-ui), 브리프 확인(impeccable), 완성본 승인(seo-landing)이 따로따로 있다. 브리프 → 방향 → 카피/사실 확인 → 시안 → 게시 전 최종의 다단계 승인, 수정 라운드 범위, 승인 기록은 어디에도 없다.
- 그 밖의 공백: 다국어 사이트 구조(hreflang은 ibelick에 한 줄), 다중 페이지 사이트의 정보 구조와 내비게이션(대부분 단일 랜딩 전제. marketingskills `site-architecture`는 읽지 못함), 기존 사이트 이전 시 URL 리다이렉트, 쿠키/추적 동의, 유지보수 계획, 견적과 범위 관리.

### 3.9 가장 강한 스킬과 과대평가된 스킬

가장 강한 4개:

1. **taste-skill**: 실제 사업자 홈페이지에 가장 가깝다. 업종별 계획, 사실표와 날조 금지, 가정 표시, copy-lint, 브라우저 gate, 보고서 형식까지 한 흐름으로 묶었다. 단점은 무게와 저자 취향의 하드코딩.
2. **anthropics frontend-design**: 71줄로 가장 정확한 "AI 티" 진단과 2패스 절차. 마스터 스킬의 디자인 방향 절은 여기서 출발하면 된다.
3. **oil-ui**: 레퍼런스 해체, 첫 화면 골격, 범위 라우팅, 독립 평가, 능력 경계, CJK 가독성. 절차 설계가 가장 성숙하다.
4. **impeccable**: 제품 사실/시각 결정 분리, 인터뷰 규율, 모드, craft floor. 발견과 방향 단계의 개념적 틀이 좋다. 실행은 무겁다.

보완용으로 값진 것: **seo-landing**(브리프 필수 항목, 승인 STOP, 측정값만 보고, 자산 권리 기록)과 **marketingskills copywriting**(진단, 3문항 게이트, 주장 unlock). 별 수와 무관하게 전문 제작자 관점은 seo-landing이 가장 선명하다.

과대평가:

- **ui-ux-pro-max**(15만★): 데이터베이스 조회로 스타일을 조립하는 방식이 평균으로 수렴하고, 데이터에 다른 스킬들의 금지 패턴이 추천으로 들어 있다. 우선순위 표와 "0건이면 지어내지 말라" 규칙 정도만 쓸 만하다.
- **vercel web-design-guidelines**(저장소 3.4만★): 스킬 자체는 39줄 래퍼이고 리뷰 전용이다.
- **web-designer-plugin**: 안티패턴 표는 좋지만 대안이 2세대 티이고, 가짜 카피 창작과 스크롤 하이재킹을 권한다.
- **superdesign**: 자사 SaaS의 조작 설명서다. 로고 불변 규칙과 참고 URL 분류만 가져오면 된다.
- **superpowers**(31만★)는 훌륭하지만 디자인 내용은 없다. 질문 규율만 해당된다.
