
module.exports = {

  /**
   * Group array elements in chunk.
   *
   * @param {Array} array Array input.
   * @param {Number} size The size of the chunks.
   *
   * @return {Array} A new array.
   */
  chunk(array, size) {
    return array.reduce((acc, value, i) => {
      if (i % size === 0) {
        acc.push([value])
      } else {
        acc[acc.length - 1].push(value)
      }
      return acc
    }, [])
  }
}
