import Helmet from 'react-helmet';

const SEO = () => (
  <Helmet>
    <meta name='theme-color' content='#000000' />
    <meta name='description' content='Web site created using create-react-app' />
    <meta property='og:type' content='website' />
    <meta property='og:url' content='https://uni-on.me/' />
    <meta property='og:title' content='대학생 연합기숙사 커뮤니티, 유니온' />
    <meta property='og:image' content='https://uni-on.me/og-image.png' />
    <meta property='og:description' content='대학생 연합기숙사 입주생을 위한 커뮤니티입니다.' />
    <meta property='og:site_name' content='union' />
    <meta property='og:locale' content='kor-KR' />
    <meta charSet='utf-8' />
    <link rel='icon' href='%PUBLIC_URL%/logo192.png' />
    <meta
      name='viewport'
      content='width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
    />
    <link
      href='//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css'
      rel='stylesheet'
      type='text/css'
    />
    <title>대학생 연합기숙사 커뮤니티, 유니온</title>
  </Helmet>
);

export default SEO;
