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
        font-family: "Spoqa Han Sans Neo";
        font-display: fallback;
        font-weight: 700;
        src: local('SpoqaHanSansNeoBold'),
        url(${SpoqaHanSansNeoBold}) format('woff2')
    }

    @font-face{
        font-family: "Spoqa Han Sans Neo";
        font-display: fallback;
        font-weight: 500;
        src: local('SpoqaHanSansNeoMedium'),
        url(${SpoqaHanSansNeoMedium}) format('woff2')
    }

    @font-face{
        font-family: "Spoqa Han Sans Neo";
        font-display: fallback;
        font-weight: 300;
        src: local('SpoqaHanSansNeoRegualr'),
        url(${SpoqaHanSansNeoRegular}) format('woff2')
    }

    @font-face{
        font-family: "Spoqa Han Sans Neo";
        font-display: fallback;
        font-weight: 200;
        src: local('SpoqaHanSansNeoLight'),
        url(${SpoqaHanSansNeoLight}) format('woff2')
    }

    @font-face{
        font-family: "Spoqa Han Sans Neo";
        font-display: fallback;
        font-weight: 100;
        src: local('SpoqaHanSansNeoThin'),
        url(${SpoqaHanSansNeoThin}) format('woff2')
    }
`;
