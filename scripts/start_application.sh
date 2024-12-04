cd /home/ubuntu/app
pm2 restart next-app || pm2 start npm --name "next-app" -- start