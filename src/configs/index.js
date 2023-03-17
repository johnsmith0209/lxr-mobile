import {
    isPlatform,
} from '@ionic/core';

export const JWT_STORAGE_KEY = 'jwt';
export const LANG_STORAGE_KEY = 'lang';

export const isMobileApp = (isPlatform('ios') || isPlatform('android')) && !isPlatform('mobileweb');

