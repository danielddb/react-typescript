const robotoFonts = `
  @font-face {
    font-family: 'Roboto Bold';
    src: url(${require('./roboto-bold-webfont.woff2')}) format('woff2'),
      url(${require('./roboto-bold-webfont.woff')}) format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Roboto Regular';
    src: url(${require('./roboto-regular-webfont.woff2')}) format('woff2'),
      url(${require('./roboto-regular-webfont.woff')}) format('woff');
    font-weight: normal;
    font-style: normal;
  }
`

export default robotoFonts
