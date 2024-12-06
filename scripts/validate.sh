#!/bin/bash

# 로그 파일 경로 설정
DEPLOY_LOG=/home/ec2-user/app/fe/deploy.log

# 애플리케이션 상태 확인
echo "> 애플리케이션 상태 확인" >> $DEPLOY_LOG

# PM2 프로세스 확인
PM2_STATUS=$(pm2 list | grep "next-app" | grep "online")
if [ -z "$PM2_STATUS" ]; then
    echo "> 애플리케이션이 실행되지 않았습니다." >> $DEPLOY_LOG
    exit 1
fi

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

echo "> 검증 성공" >> $DEPLOY_LOG
exit 0