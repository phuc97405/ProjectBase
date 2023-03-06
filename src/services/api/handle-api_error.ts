import {get, isArray, isObject, noop} from 'lodash';
import {Alert} from 'react-native';
import {CONSTANTS} from '~constans/values';
export interface MessagesResponseWithErrorCode {
  field: string;
  msg: string[];
}

const handleApiError = (error: any, callback = noop) => {
  let message = get(
    error,
    'data.message',
    '오류가 발생했습니다. 잠시 후 다시 시도 해주세요',
  );

  if (isArray(message)) {
    if (isObject(message[0])) {
      const messages: MessagesResponseWithErrorCode[] = message;
      message = get(message, '[0].msg[0]', '알수없는 오류');
    } else {
      message = message.join(' ');
    }
  }

  Alert.alert(
    CONSTANTS.DIALOG_TITLE.NOTICE_TEXT,
    message,
    // get(message, 'An error occurred, please try again later'),
    [{text: CONSTANTS.DIALOG_TITLE.CONFIRM_TEXT, onPress: callback}],
  );
};

export default handleApiError;
