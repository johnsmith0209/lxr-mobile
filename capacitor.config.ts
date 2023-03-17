import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.lixinger.quickdata.ios',
    appName: 'lxr',
    webDir: 'dist',
    bundledWebRuntime: false,
    plugins: {
        CapacitorCookies: {
            enabled: true,
        },
        CapacitorHttp: {
            enabled: true,
        },
    },
};

export default config;
