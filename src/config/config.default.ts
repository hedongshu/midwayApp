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

    config.pinduoduoConfig = {
        url: 'https://gw-api.pinduoduo.com/api/router',
        client_id: '8384e335471e475c951f76e2e8a0d69b',
        client_secret: '748f9cf9735049a5ab69e3eb2335ac615a3fb533',
        p_id: '13905439_182199298',
        bined_uid: 1
    }

    return config;
};
