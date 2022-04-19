import { CapacitorConfig } from '@capacitor/cli';

const serverConfig: Partial<CapacitorConfig> = {
  server: {
    url: 'http://host:port',
    cleartext: true,
  },
};

export default serverConfig;
