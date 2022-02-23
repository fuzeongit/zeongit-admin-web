module.exports = {
  getColors(themeColors) {
    const colors = []
    Object.keys(themeColors).forEach((it) => {
      if (typeof themeColors[it] === "object") {
        colors.push(
          ...Object.keys(themeColors[it]).map((degrees) => ({
            name: it + "-" + degrees,
            value: themeColors[it][degrees]
          }))
        )
      } else {
        colors.push({ name: it, value: themeColors[it] })
      }
    })
    return colors
  }
}
