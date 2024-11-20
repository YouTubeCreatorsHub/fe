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

    # Next.js SSR을 위한 설정
    location /_next/static {
        alias /usr/share/nginx/html/_next/static;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri.html $uri/ /index.html;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # API 요청 프록시 설정 (필요한 경우)
    location /api {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# nginx 재시작
systemctl restart nginx
echo "Nginx restarted"

# nginx 자동 시작 설정
systemctl enable nginx
echo "Nginx enabled to start on boot"
