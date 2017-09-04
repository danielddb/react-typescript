const robotoFonts = `
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-display: swap;
    font-weight: 300;
    src:
      local('Roboto Light '),
      local('Roboto-Light'),
      url(${require('./roboto-latin-300.woff2')}) format('woff2'), /* Super Modern Browsers */
      url(${require('./roboto-latin-300.woff')}) format('woff'); /* Modern Browsers */
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-display: swap;
    font-weight: 400;
    src:
      local('Roboto Regular '),
      local('Roboto-Regular'),
      url(${require('./roboto-latin-400.woff2')}) format('woff2'), /* Super Modern Browsers */
      url(${require('./roboto-latin-400.woff')}) format('woff'); /* Modern Browsers */
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-display: swap;
    font-weight: 500;
    src:
      local('Roboto Medium '),
      local('Roboto-Medium'),
      url(${require('./roboto-latin-500.woff2')}) format('woff2'), /* Super Modern Browsers */
      url(${require('./roboto-latin-500.woff')}) format('woff'); /* Modern Browsers */
  }
`

export default robotoFonts
