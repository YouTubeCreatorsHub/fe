#!/bin/bash

# 배포 전 기존 파일들 정리
if [ -d /usr/share/nginx/html ]; then
    # nginx의 웹 루트 디렉토리가 존재하면 내부 파일 삭제
    rm -rf /usr/share/nginx/html/*
    echo "Cleaned up existing files in nginx web root"
fi

# nginx가 설치되어 있지 않다면 설치
if ! command -v nginx &> /dev/null; then
    yum install -y nginx
    echo "Nginx installed"
fi
