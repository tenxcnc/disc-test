# 햄찌 인스타툰 제작 파이프라인

**대본 하나(episode.json)로 캐러셀(사진 슬라이드)과 릴스툰(MP4)을 같이 만듭니다.**
릴스툰은 새 사람에게 보여 주는 용도(도달·팔로우), 캐러셀은 저장·공유와 수익화 용도입니다.

```
episode.json ──▶ render-carousel ──▶ out/carousel/01~07.png + caption-carousel.txt
             └─▶ build-reel (HyperFrames) ──▶ out/reel.mp4 (1080×1920·30fps) + reel-cover.png + caption-reel.txt
```

## 빠른 시작

```bash
cd instatoon
npm install                     # hyperframes 0.9.59, gsap 3.13.0
npx hyperframes telemetry disable
./tools/make-episode.sh episodes/ep001          # 캐러셀 + 릴스 한 번에
./tools/make-episode.sh episodes/ep001 --music my-bgm.mp3   # 직접 고른 무료 BGM 넣기(선택)
```

필요 환경: Node.js 22 이상, FFmpeg, Playwright(Chromium).

## 살구salgu 그림으로 연재하는 방법 (실전)

1. **대본 작성**: `episodes/ep00N/episode.json`을 복사해 장면 제목, 말풍선, 자막, 릴스 타이밍을 고칩니다(Claude에게 맡겨도 돼요).
2. **그림 생성**: ChatGPT의 살구salgu 스킬에 `characters/hamzzi.png`(캐릭터 원본)를 첨부하고 장면별 그림을 만듭니다.
   이때 **"글자 없이 그려줘"**라고 요청하세요. 글자는 이 파이프라인이 정확한 한글로 넣어 줘서 AI 그림의 오타 문제가 없어집니다.
3. **그림 넣기**: 받은 이미지를 `episodes/ep00N/panels/01.png`처럼 저장하고, episode.json의 `"art": "scene:…"`을 `"art": "panels/01.png"`로 바꿉니다.
4. **렌더링**: `./tools/make-episode.sh episodes/ep00N`을 실행합니다.
5. **업로드**: 릴스는 인스타 앱에서 **유행하는 사운드를 작게 깔고** 올리세요. 효과음은 이미 들어 있어요. 캐러셀은 다음 날 올립니다.

> `scene:` 그림은 데모용으로 코드로 그린 그림입니다. 이 스타일 그대로 연재해도 되고, 살구 그림으로 바꿔도 같은 대본이 그대로 동작합니다.

## episode.json 형식

| 키 | 설명 |
|---|---|
| `hook` | 릴스 상단에 고정되는 훅 문구입니다(첫 1초에 승부). |
| `slides[].layout` | `cover`(표지), `panel`(장면 + 하단 자막), `info`(정보 카드 + 구석 캐릭터) |
| `slides[].art` | `scene:이름`(데모 그림) 또는 `panels/01.png`(살구 등 외부 이미지) |
| `slides[].layers[]` | `bubble`(말풍선, `tail`: bl/br/tl/tr, `variant`: think), `caption`(`variant`: sub), `card`(`lines`, `[강조]`), `compare`(`bad`/`good`), `mail`, `note`, `cta` |
| `slides[].reel` | `dur`(초), `zoom` [시작,끝], `focus` [x,y 0~1], `sfx` [[이름, 초]], `shake`(흔들림 시각) |
| `layers[].sfx` / `at` | 등장 효과음(pop·ding·thud·chime·drip·typing·whoosh, `false`면 없음), 등장 시각(장면 기준 초) |
| `reelEnd` | 릴스 엔딩 카드의 다음 편 예고와 CTA |
| `caption`, `hashtags` | 업로드용 캡션입니다(캐러셀용과 릴스용이 따로 있어요). |

좌표는 슬라이드 1080×1350 기준입니다. 말풍선 위치만 바꿔서 다시 렌더링하면 캐러셀과 릴스에 같이 반영됩니다.

## 검토한 깃허브 도구

| 도구 | 라이선스 | 판단 |
|---|---|---|
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | Apache-2.0 | **채택.** 릴스 렌더 엔진입니다. HTML+GSAP를 MP4로 만들고, 같은 입력이면 같은 영상이 나옵니다. `--batch`로 여러 편을 한꺼번에 렌더링할 수 있고 상업 이용 제한이 없습니다. |
| [greensock/GSAP](https://github.com/greensock/GSAP) | 무료 표준 라이선스 | **채택.** 말풍선 팝, 카메라 줌, 흔들림 애니메이션에 씁니다. |
| [google/fonts](https://github.com/google/fonts) Jua·Gowun Dodum | OFL | **채택.** 상업적으로 쓸 수 있는 둥근 한글 폰트입니다. |
| [microsoft/playwright](https://github.com/microsoft/playwright) | Apache-2.0 | **채택.** 캐러셀 PNG를 렌더링합니다. |
| FFmpeg | LGPL/GPL | **채택.** 효과음 합성(저작권 걱정 없는 직접 생성음)과 커버 추출에 씁니다. |
| [remotion-dev/remotion](https://github.com/remotion-dev/remotion) | Remotion License | 보류. React 기반이고, 일정 규모 이상의 회사는 유료입니다. HTML 방식이 자동화에 더 단순합니다. |
| [myshell-ai/MeloTTS](https://github.com/myshell-ai/MeloTTS) | MIT | 선택. 한국어 내레이션이 필요해지면 추가합니다(Python과 torch가 필요해 무거움). |
| [openai/whisper](https://github.com/openai/whisper) | MIT | 선택. 직접 녹음한 목소리에 자동 자막을 붙일 때 씁니다(`hyperframes init --audio`에 내장). |
| Supertonic | 코드 MIT, 모델 OpenRAIL-M | 비추천. 모델 라이선스가 따로 있고 유지보수 여부가 불확실합니다. |

HyperFrames 에이전트 스킬(`npx hyperframes skills update`)을 본인 PC의 Claude Code에 설치하면 "이 에피소드 릴스로 만들어줘"처럼 대화로 편집할 수 있습니다.

## 폴더 구조

```
instatoon/
  assets/fonts (OFL 폰트) · assets/sfx (합성 효과음) · assets/vendor/gsap.min.js
  characters/   햄찌·부엉 대리·다람 설정화와 원본 PNG (살구 스킬 첨부용)
  episodes/ep001~003/episode.json, out/
  tools/        characters·scenes·layout·render-carousel·build-reel·make-episode·make-sfx
```
