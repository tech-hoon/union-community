import { SITE_URL } from './config';

const redirectIEtoEdge = () => {
  if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
    window.location.pathname = 'microsoft-edge:' + SITE_URL;
    setTimeout(function () {
      window.location.pathname = 'https://go.microsoft.com/fwlink/?linkid=2135547';
    }, 1);
  }
};

export default redirectIEtoEdge;
