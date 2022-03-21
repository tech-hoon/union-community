export const SITE_URL = 'https://uni-on.me';

export const ERROR_MESSAGE = 'Failed to fetch data, please check your API or internet connection';
export const PAGE_START = 1;
export const CARD_LIMIT = 6;

export const CATEGORY_LIST = [
  { eng: 'all', kor: '전체', color: '#18A0FB' },
  { eng: 'notice', kor: '공지', color: '#0E27AC' },
  { eng: 'free', kor: '자유', color: '#E8581A' },
  { eng: 'store', kor: '장터/나눔', color: '#18B828' },
  { eng: 'delivery', kor: '배달/공동구매', color: '#2AC1BC' },
  { eng: 'study/club', kor: '스터디/동아리', color: '#F03D4E' },
  { eng: 'info/ad', kor: '정보/홍보', color: '#EFBE3F' },
  { eng: 'secret', kor: '비밀', color: '#884DD9' },
];

//Login Step
export const AUTH_REJECTED_STEP = -1;
export const SNS_LOGIN_STEP = 1;
export const NICKNAME_STEP = 2;
export const RESIDENT_AUTH_STEP = 3;
export const AUTH_WAITING_STEP = 4;
export const LOGIN_DONE = 5;

export const NICKNAME_LENGTH = 6;

export const OPEN_KAKAOTALK_URL = 'https://open.kakao.com/o/sqksiTPd';

export const ADMIN_UID = 'PYuphfo1SrYQMBTxdME3Q57s1xV2';

export const REPORT_LIST = [
  '게시판 성격에 부적절함',
  '욕설/비하',
  '음란물/불건전한 만남 및 대화',
  '상업적 광고 및 판매',
  '유출/사칭/사기',
  '낚시/놀람/도배',
  '정당/정치인 비하 및 선거운동',
];

// export const AVATAR_COUNT = 10;

export const AVATAR_ARRAY_MALE = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112];
export const AVATAR_ARRAY_FEMALE = [201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212];

//Product

export const PRODUCT_TYPE = [
  { kor: '판매', color: '#00229B' },
  { kor: '교환', color: '#007458' },
  { kor: '나눔', color: '#FFC700' },
];

export const PRODUCT_STATUS = [
  { kor: '판매중', color: '#18A0FB' },
  { kor: '거래완료', color: '#9A9A9A' },
  { kor: '예약중', color: '#FF0000' },
];
