const colors = require('~/store/colors.json')

const hexToRgb = hex => {
    // turn hex val to RGB
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
          }
        : null
}

// calc to work out if it will match on black or white better
const setContrast = (rgb) =>
    (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 > 125 ? 'black' : 'white'

export const languageColor = (language) => {
  if (colors[language]) {
    let languageColor = colors[language].color || '#000000'
    return {
      backgroundColor: languageColor,
      textColor: setContrast(hexToRgb(languageColor))
    }
  } else {
    return {
      background: 'white',
      color: 'black'
    }
  }
}
