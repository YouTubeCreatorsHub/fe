module.exports = {
  apps: [
    {
      name: 'next-app',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: '1',
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      watch: false,
      max_memory_restart: '1G',
      error_file: 'logs/err.log',
      out_file: 'logs/out.log',
      time: true,
    },
  ],
};
