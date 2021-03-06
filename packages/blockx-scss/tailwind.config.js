const path = require('path');

module.exports = {
  purge: false,
  theme: {
    screens: require(path.join(__dirname, './config/screens.json')),
    fontFamily: {
      default: [
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI,Roboto",
        "Helvetica Neue",
        "Helvetica",
        "Arial",
        "sans-serif"
      ]
    },
    colors: require(path.join(__dirname, './config/colors.json')),
    spacing: {
      '0': '0',
      '1': '4px',
      '2': '8px',
      '3': '16px',
      '4': '24px',
      '5': '32px',
      '6': '64px',
      '7': '128px',
    },
    fontSize: {
      "title-1": '40px',
      "title-1m": '28px',
      "title-2": '32px',
      "title-2m": '24px',
      "title-3": '24px',
      "title-3m": '22px',
      "title-4": '20px',
      "title-5": '18px',
      "title-6": '16px',
      "title-7": '14px',
      "title-8": '12px',
      "body-1": '20px',
      "body-2": '16px',
      "body-3": '14px',
      "body-4": '12px'
    },
    lineHeight: {
      none: '1',
      "title-1": '44px',
      "title-1m": '32px',
      "title-2": '40px',
      "title-2m": '28px',
      "title-3": '32px',
      "title-3m": '28px',
      "title-4": '28px',
      "title-5": '24px',
      "title-6": '24px',
      "title-7": '20px',
      "title-8": '18px',
      "body-1": '28px',
      "body-2": '24px',
      "body-3": '20px',
      "body-4": '18px'
    },
    maxWidth: theme => ({
      none: 'none',
      ...theme('width'),
      '1': '18rem',
      '2': '24rem',
      '3': '28rem',
      '4': '32rem',
      '5': '36rem',
      '6': '42rem',
      '7': '48rem',
      '8': '56rem',
      '9': '64rem',
      '10': '72rem',
      full: '100%'
    }),
    minHeight: {
      none: '0',
      full: '100%',
      screen: '100vh',
    },
    boxShadow: {
      none: 'none',
      '1': '0px 1px 3px rgba(0, 0, 0, 0.1)',
      '2': '0px 2px 4px rgba(0, 0, 0, 0.15)',
      '3': '0px 2px 7px rgba(0, 0, 0, 0.15)',
      '4': '0px 2px 10px rgba(0, 0, 0, 0.2)',
    },
    backgroundPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top',
    },
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
    },
    borderColor: theme => ({
      ...theme('colors'),
      default: theme('colors.gray.default', 'currentColor'),
    }),
    borderRadius: {
      none: '0',
      default: '6px',
      big: '16px',
      full: '50%',
    },
    borderWidth: {
      none: '0',
      default: '1px',
      '2': '2px',
      '4': '4px'
    },
    container: {},
    cursor: {
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      wait: 'wait',
      text: 'text',
      move: 'move',
      'not-allowed': 'not-allowed',
    },
    fill: {
      current: 'currentColor',
    },
    flex: {
      '1': '1 1 0%',
      auto: '1 1 auto',
      initial: '0 1 auto',
      none: 'none',
    },
    flexGrow: {
      '0': '0',
      default: '1',
    },
    flexShrink: {
      '0': '0',
      default: '1',
    },
    fontWeight: {
      "400": '400',
      "600": '600',
      "700": '700'
    },
    height: theme => ({
      auto: 'auto',
      ...theme('spacing'),
      full: '100%',
      screen: '100vh',
    }),
    inset: {
      '0': '0',
      auto: 'auto',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
    },
    margin: (theme, { negative }) => ({
      auto: 'auto',
      ...theme('spacing'),
      ...negative(theme('spacing')),
    }),
    maxHeight: {
      full: '100%',
      screen: '100vh',
    },
    minWidth: theme => ({
      '0': '0',
      ...theme('width'),
    }),
    objectPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top',
    },
    opacity: {
      '0': '0',
      '25': '0.25',
      '50': '0.5',
      '75': '0.75',
      '100': '1',
    },
    order: {
      first: '-9999',
      last: '9999',
      none: '0',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
      '8': '8',
      '9': '9',
      '10': '10',
      '11': '11',
      '12': '12',
    },
    placeholderColor: theme => theme('colors'),
    stroke: {
      current: 'currentColor',
    },
    textColor: theme => theme('colors'),
    width: theme => ({
      auto: 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      full: '100%',
      screen: '100vw',
    }),
    zIndex: {
      auto: 'auto',
      '0': '0',
      '1': '10',
      '2': '20',
      '3': '30',
      '4': '40',
      '5': '50',
    },
  },
  variants: {},
  plugins: []
}
