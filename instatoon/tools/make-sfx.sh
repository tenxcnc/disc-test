#!/usr/bin/env bash
# 저작권 걱정 없는 효과음을 ffmpeg로 직접 합성합니다. (원본 생성물, 자유 사용)
set -euo pipefail
OUT="$(cd "$(dirname "$0")/.." && pwd)/assets/sfx"
mkdir -p "$OUT"
R=44100
gen() { ffmpeg -hide_banner -loglevel error -y -f lavfi -i "$1" -t "$2" -ar $R -ac 2 -af "afade=t=out:st=$(awk "BEGIN{print $2*0.6}"):d=$(awk "BEGIN{print $2*0.4}"),volume=${3:-1}" "$OUT/$4.wav"; }
# 팝: 말풍선 등장
gen "aevalsrc='sin(2*PI*(500+9000*t)*t)*exp(-38*t)':s=$R" 0.12 0.9 pop
# 알림: 메일·메시지 도착
gen "aevalsrc='(sin(2*PI*1318*t)*lt(t,0.12)+sin(2*PI*1760*t)*gte(t,0.12))*exp(-7*(t-0.12*gte(t,0.12)))*0.6':s=$R" 0.55 0.9 ding
# 쿵: 충격·좌절
gen "aevalsrc='sin(2*PI*(110-120*t)*t)*exp(-9*t)*1.2':s=$R" 0.45 1.0 thud
# 휙: 장면 전환
ffmpeg -hide_banner -loglevel error -y -f lavfi -i "anoisesrc=c=pink:a=0.5:r=$R" -t 0.4 -af "highpass=f=600,lowpass=f=5000,afade=t=in:d=0.18,afade=t=out:st=0.2:d=0.2,volume=5" -ac 2 "$OUT/whoosh.wav"
# 띠링: 위로·깨달음
gen "aevalsrc='(sin(2*PI*1046*t)*exp(-6*t)+sin(2*PI*1318*(t-0.09))*gte(t,0.09)*exp(-6*(t-0.09))+sin(2*PI*1568*(t-0.18))*gte(t,0.18)*exp(-5*(t-0.18)))*0.35':s=$R" 0.9 1.0 chime
# 뚝뚝: 눈물·한숨
gen "aevalsrc='(sin(2*PI*880*t)*exp(-40*t)+sin(2*PI*660*(t-0.22))*gte(t,0.22)*exp(-40*(t-0.22)))*0.7':s=$R" 0.45 1.0 drip
# 타자: 키보드
ffmpeg -hide_banner -loglevel error -y -f lavfi -i "anoisesrc=c=white:a=0.6:r=$R" -t 0.6 -af "highpass=f=2500,volume='if(lt(mod(t,0.085),0.012),1,0)':eval=frame,volume=0.6" -ac 2 "$OUT/typing.wav"
echo "효과음 생성 완료: $OUT"; ls "$OUT"
