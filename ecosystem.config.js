// PM2 Process Manager Configuration for MASTER Incubation Foundation
// Compatible with Hostinger VPS, Ubuntu, Debian, CentOS, and Alpine Linux

module.exports = {
  apps: [
    {
      name: "master-incubation-foundation",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: "./",
      instances: "max", // Utilize all CPU cores in cluster mode
      exec_mode: "cluster",
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "0.0.0.0",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "0.0.0.0",
      },
      error_file: "./logs/pm2-err.log",
      out_file: "./logs/pm2-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      restart_delay: 4000,
    },
  ],
};
