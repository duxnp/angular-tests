import { CapacitorConfig } from '@capacitor/cli';

import serverConfig from './server.config';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'b-cal-mobile',
  webDir: '../../dist/apps/b-cal-mobile',
  bundledWebRuntime: false,
  server: { ...serverConfig.server },
};

export default config;
