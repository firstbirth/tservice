import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'kz.com.tsk.app',
  appName: 'Truck Service',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;
