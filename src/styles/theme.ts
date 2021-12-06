const size = {
  mobileS: '425px',
  mobile: '768px',
  tablet: '1024px',
  desktop: '1440px',
};

const theme = {
  size: {
    mobileS: `(max-width:${size.mobileS})`,
    mobile: `(max-width:${size.mobile})`,
    tablet: `(max-width:${size.tablet})`,
    desktop: `(max-width:${size.desktop})`,
  },
  color: {
    MAIN: '#18A0FB',
  },
};
export default theme;
