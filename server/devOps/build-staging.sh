pm2 start --name "dex-ws-gateway" pnpm -- start ws-gateway;
pm2 start --name "dex-user-gateway" pnpm -- start user-gateway;
pm2 start --name "dex-market" pnpm -- start market;