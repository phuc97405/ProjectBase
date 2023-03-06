const {
  name: APP_NAME,
  displayName: APP_DISPLAY_NAME,
} = require('../../app.json');

const DEV_URL = 'http://43.200.44.114/api/v1/';
const PROD_URL = 'http://crptwal.mynamuh.com/api/v1/';

export const CONSTANTS = {
  APP_NAME,
  APP_DISPLAY_NAME,
  BASE_URL: __DEV__ ? DEV_URL : PROD_URL,
  API_PLATFORM: 'CLIENT',
  API_VERSION: 'v1.0',
  TIMEOUT: 120000,

  DIALOG_TITLE: {
    CANCEL_TEXT: '취소',
    SUCCESS_TEXT: '성공',
    ERROR_TEXT: '오류',
    WARNING_TEXT: '경고',
    CONFIRM_TEXT: '확인',
    CLOSE_TEXT: '닫기',
    NOTIFICATION_TEXT: '공고',
    NOTICE_TEXT: '알림',
  },
};

export const STATUS_RESPONSE = {
  STATUS_403: 403,
  STATUS_402: 402,
  STATUS_502: 502,
};
