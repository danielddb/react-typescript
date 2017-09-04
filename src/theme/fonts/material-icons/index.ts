const materialIconsFonts = `
  @font-face {
    font-family: 'Material Icons';
    src: url(${require('./material-icons-regular-webfont.woff2')}) format('woff2'),
      url(${require('./material-icons-regular-webfont.woff')}) format('woff');
    font-weight: normal;
    font-style: normal;
  }

  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;  /* Preferred icon size */
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;

    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;

    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;

    /* Support for IE. */
    font-feature-settings: 'liga';
  }

  /* Rules for sizing the icon. */
  .material-icons.md-18 { font-size: 18px; width: 18px; height: 18px; }
  .material-icons.md-24 { font-size: 24px; width: 24px; height: 24px; }
  .material-icons.md-36 { font-size: 36px; width: 36px; height: 36px; }
  .material-icons.md-48 { font-size: 48px; width: 48px; height: 48px; }

  /* Rules for using icons as black on a light background. */
  .material-icons.md-dark { color: rgba(0, 0, 0, 0.54); }
  .material-icons.md-dark.md-inactive { color: rgba(0, 0, 0, 0.26); }

  /* Rules for using icons as white on a dark background. */
  .material-icons.md-light { color: rgba(255, 255, 255, 1); }
  .material-icons.md-light.md-inactive { color: rgba(255, 255, 255, 0.3); }
`

export default materialIconsFonts