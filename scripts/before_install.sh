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

FE/scripts/after_install.sh
bash
#!/bin/bash

# 웹 루트 디렉토리 권한 설정
chmod -R 755 /usr/share/nginx/html
echo "Set permissions for nginx web root"

# nginx 설정 파일 생성
cat > /etc/nginx/conf.d/default.conf << 'EOF'
server {
    listen 80;
    server_name _;    # 모든 호스트 이름 매칭

    root /usr/share/nginx/html;
    index index.html;

    # React Router를 위한 설정
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 정적 파일 캐싱 설정
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}
EOF

# nginx 재시작
systemctl restart nginx
echo "Nginx restarted"

# nginx 자동 시작 설정
systemctl enable nginx
echo "Nginx enabled to start on boot"
