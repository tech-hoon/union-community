import { createGlobalStyle } from 'styled-components';
import {
  SpoqaHanSansNeoBold,
  SpoqaHanSansNeoRegular,
  SpoqaHanSansNeoMedium,
  SpoqaHanSansNeoThin,
  SpoqaHanSansNeoLight,
} from 'assets/fonts';

export default createGlobalStyle`
    @font-face{
        font-family: "Spoqa Bold";
        font-display: swap;
        src: local('SpoqaHanSansNeoBold'),
        url(${SpoqaHanSansNeoBold}) format('woff2')
    }

    @font-face{
        font-family: "Spoqa Medium";
        font-display: swap;
        src: local('SpoqaHanSansNeoMedium'),
        url(${SpoqaHanSansNeoMedium}) format('woff2')
    }

    @font-face{
        font-family: "Spoqa Regular";
        font-display: swap;
        src: local('SpoqaHanSansNeoRegualr'),
        url(${SpoqaHanSansNeoRegular}) format('woff2')
    }

    @font-face{
        font-family: "Spoqa Light";
        font-display: swap;
        src: local('SpoqaHanSansNeoLight'),
        url(${SpoqaHanSansNeoLight}) format('woff2')
    }

    @font-face{
        font-family: "Spoqa Thin";
        font-display: swap;
        src: local('SpoqaHanSansNeoThin'),
        url(${SpoqaHanSansNeoThin}) format('woff2')
    }
`;
