#!/bin/bash
export NPM_CONFIG_LOGLEVEL=warn

# 디버그 모드 최적화
export DEBUG=npm:*,tar:*

# npm 전역 설정 경로 지정
export npm_config_prefix=/home/ec2-user/.npm-global
export PATH="$npm_config_prefix/bin:$PATH"

# 로컬 node_modules 경로 명시
export NODE_PATH=/home/ec2-user/app/fe/node_modules

# 로그 디렉토리 생성
DEPLOY_LOG=/home/ec2-user/app/fe/deploy.log
APP_DIR=/home/ec2-user/app/fe
mkdir -p $APP_DIR

# 배포 시작 시간 기록
echo "> 배포 시작 : $(date +%c)" >> $DEPLOY_LOG

# PM2 프로세스 확인 및 종료
pm2 delete next-app 2>/dev/null
echo "> PM2 프로세스 종료: next-app" >> $DEPLOY_LOG

# 의존성 설치
echo "> npm 패키지 설치" >> $DEPLOY_LOG
cd $APP_DIR
npm install
npm install --save-dev eslint typescript @types/node

# 빌드
echo "> Next.js 빌드 시작" >> $DEPLOY_LOG
npm run build > build.log 2>&1

# PM2로 애플리케이션 실행
echo "> PM2로 애플리케이션 실행" >> $DEPLOY_LOG
pm2 start npm --name "next-app" -- start

# 실행 확인
sleep 3
CURRENT_PID=$(pm2 pid next-app)
echo "> 배포 완료 : $CURRENT_PID" >> $DEPLOY_LOG

# 헬스 체크
RETRY_COUNT=0
MAX_RETRY=5
echo "> 헬스 체크 시작" >> $DEPLOY_LOG

until curl -s http://localhost:3000
do
  if [ ${RETRY_COUNT} -eq ${MAX_RETRY} ];
  then
    echo "> 헬스 체크 실패" >> $DEPLOY_LOG
    exit 1
  fi

  echo "> 헬스 체크 재시도..." >> $DEPLOY_LOG
  RETRY_COUNT=$((RETRY_COUNT + 1))
  sleep 10
done

echo "> 배포 성공" >> $DEPLOY_LOG

# 캐시 정리
npm cache clean --force
