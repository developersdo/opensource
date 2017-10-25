const utils = {
  /**
   * Escape RegExp special characters.
   * @param {String} str The string to escape.
   * @return {String}
   */
  escapeRegExp(str) {
    return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }
}

export default utils
