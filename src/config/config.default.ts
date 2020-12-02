import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
    const config = {} as DefaultConfig;

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1606744180114_2982';

    // add your config here
    config.middleware = [];

    config.security = {
        csrf: {
            enable: false
        }
    }

    return config;
};
