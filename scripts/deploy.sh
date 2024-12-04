#!/bin/bash

# 로그 디렉토리 생성
DEPLOY_LOG=/home/ec2-user/app/fe/deploy.log
APP_DIR=/home/ec2-user/app/fe
mkdir -p $APP_DIR

# 배포 시작 시간 기록
echo "> 배포 시작 : $(date +%c)" >> $DEPLOY_LOG

# PM2 프로세스 확인
CURRENT_PID=$(pm2 pid next-app)
if [ -z $CURRENT_PID ]
then
  echo "> 현재 실행중인 애플리케이션이 없습니다." >> $DEPLOY_LOG
else
  echo "> PM2 프로세스 종료: next-app" >> $DEPLOY_LOG
  pm2 delete next-app
  sleep 5
fi

# 의존성 설치
echo "> npm 패키지 설치" >> $DEPLOY_LOG
cd $APP_DIR
npm ci --production

# 빌드
echo "> Next.js 빌드 시작" >> $DEPLOY_LOG
npm run build

# PM2로 애플리케이션 실행
echo "> PM2로 애플리케이션 실행" >> $DEPLOY_LOG
pm2 start npm --name "next-app" -- start

# 실행 확인
sleep 3
CURRENT_PID=$(pm2 pid next-app)
echo "> 배포 완료 : $CURRENT_PID" >> $DEPLOY_LOG

# 헬스 체크
RETRY_COUNT=0
MAX_RETRY=10
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