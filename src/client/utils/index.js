import unorm from 'unorm'

const utils = {
  /**
   * Escape RegExp special characters.
   * @param {String} str The string to escape.
   * @return {String}
   */
  escapeRegExp(str) {
    return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  },

  /**
   * Normalize an unicode string.
   * @param {String} str The string to normalize.
   * @return {String}
   */
  unicodeNormalize(str) {
    return unorm.nfkd(str).replace(/[\u0300-\u036F]/g, '')
  }
}

export default utils
