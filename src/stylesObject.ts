const stylesObject = {
  customs: {
    'UNDERLINE': {
      key: `\\x1b\[4m`,
      textDecoration: 'underline'
    },
    'BLINK': {
      key: `\\x1b\[5m`
    },
    'BRIGHT': {
      key: `\\x1b\[1m`
    },
    'BOLD': {
      key: ''
    },
    'CODE': {
      key: ''
    },
    'ITALIC': {
      key: ''
    },
    'STRIKETHROUGH': {
      key: ''
    },
    'REMOVE_STYLE': {
      key: `\\x1b\[0m`,
      color: 'inherit',
      fontWeight: 'normal',
      textDecoration: 'none',
      backgroundColor: 'transparent'
    }
  },
  colors: {
    'COLOR_BLACK': {
      key: `\\x1b\[30m`,
      color: 'rgb(0, 0, 0)',
    },
    'COLOR_GREEN': {
      key: `\\x1b\[32m`,
      color: 'rgb(0, 128, 0)',
    },
    'COLOR_YELLOW': {
      key: `\\x1b\[33m`,
      color: 'rgb(255, 255, 0)',
    },
    'COLOR_BLUE': {
      key: `\\x1b\[34m`,
      color: 'rgb(0, 0, 255)',
    },
    'COLOR_MAGENTA': {
      key: `\\x1b\[35m`,
      color: 'rgb(255, 0, 255)',
    },
    'COLOR_CYAN': {
      key: `\\x1b\[36m`,
      color: 'rgb(0, 255, 255)',
    },
    'COLOR_GRAY': {
      key: `\\x1b\[37m`,
      color: 'rgb(255, 255, 255)',
    },
    'COLOR_RED': {
      key: `\\x1b\[31m`,
      color: 'rgb(255, 0, 0)',
    },
  },
  backgrounds: {
    'BGCOLOR_BLACK': {
      key: `\\x1b\[40m`,
      backgroundColor: 'rgb(0, 0, 0)',
    },
    'BGCOLOR_GREEN': {
      key: `\\x1b\[42m`,
      backgroundColor: 'rgb(0, 128, 0)',
    },
    'BGCOLOR_YELLOW': {
      key: `\\x1b\[43m`,
      backgroundColor: 'rgb(255, 255, 0)',
    },
    'BGCOLOR_BLUE': {
      key: `\\x1b\[44m`,
      backgroundColor: 'rgb(0, 0, 255)',
    },
    'BGCOLOR_MAGENTA': {
      key: `\\x1b\[45m`,
      backgroundColor: 'rgb(255, 0, 255)',
    },
    'BGCOLOR_CYAN': {
      key: `\\x1b\[46m`,
      backgroundColor: 'rgb(0, 255, 255)',
    },
    'BGCOLOR_GRAY': {
      key: `\\x1b\[47m`,
      backgroundColor: 'rgb(255, 255, 255)',
    },
    'BGCOLOR_RED': {
      key: `\\x1b\[41m`,
      backgroundColor: 'rgb(255, 0, 0)',
    }
  }
};

const additionalMaps = {
  ...stylesObject.colors, 
  ...stylesObject.backgrounds, 
  ...stylesObject.customs,
}

const colorArrays = Object.entries(stylesObject.colors)
const bgArrays = Object.entries(stylesObject.backgrounds)

export {
  additionalMaps,
  colorArrays,
  bgArrays
}