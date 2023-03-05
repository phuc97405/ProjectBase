import {systemColors} from '~constans/system-colors';

const TEXT_DEFAULT_COLOR = 'black';
const reactNative = require('react-native');
const {TextInput, Text} = reactNative;

export const setDefaultPropsNativeComponent = async () => {
  const propText = {
    maxFontSizeMultiplier: 0,
    allowFontScaling: false,
    style: {
      fontSize: 15,
      letterSpacing: -0.3,
      color: TEXT_DEFAULT_COLOR,
    },
  };
  setCustomText(propText);

  const propTextInput = {
    placeholderTextColor: 'red',
    maxFontSizeMultiplier: 0,
    allowFontScaling: false,
    style: {
      fontSize: 15,
      letterSpacing: -0.3,
      // color: TEXT_DEFAULT_COLOR,
    },
  };
  setCustomTextInput(propTextInput);
};

export const setCustomText = (customProps: {style: any}) => {
  const TextRender = Text.render;
  const initialDefaultProps = Text.defaultProps;
  Text.defaultProps = {
    ...initialDefaultProps,
    ...customProps,
  };
  Text.render = function render(props: {style: any}) {
    const oldProps = props;
    props = {...props, style: [customProps.style, props.style]};
    try {
      return TextRender.apply(this, arguments);
    } finally {
      props = oldProps;
    }
  };
};

export const setCustomTextInput = (customProps: {style: any}) => {
  const TextInputRender = TextInput.render;
  const initialDefaultProps = TextInput.defaultProps;
  TextInput.defaultProps = {
    ...initialDefaultProps,
    ...customProps,
  };
  TextInput.render = function render(props: {style: any}) {
    const oldProps = props;
    props = {
      ...props,
      ...customProps,
      style: [customProps.style, props.style],
    };
    try {
      return TextInputRender.apply(this, arguments);
    } finally {
      props = oldProps;
    }
  };
};
