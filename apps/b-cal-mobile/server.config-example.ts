import { CapacitorConfig } from '@capacitor/cli';

/**
 * https://capacitorjs.com/docs/guides/live-reload#using-with-framework-clis
 *
 * This server config lets you start up a dev server with whatever tooling
 * you're using. The dev app Ionic creates will connect to this server.
 *
 * Start the dev server like so:
 *
 * ```shell
 * $ npx nx serve app-name --port=8100 --host=0.0.0.0
 * ```
 */
const serverConfig: Partial<CapacitorConfig> = {
  server: {
    url: 'http://host:port',
    cleartext: true,
  },
};

export default serverConfig;
