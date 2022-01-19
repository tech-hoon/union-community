import IIcon from './icons.type';

const PostUpload = ({ width = '75', height = '75' }: IIcon) => (
  <svg
    width={width}
    height={height}
    viewBox='0 0 75 75'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g filter='url(#filter0_d_511_3685)'>
      <circle cx='37.5' cy='33.5' r='27.5' fill='white' />
    </g>
    <path
      d='M48.1719 19.5684H26.1104V47.1519H48.1719V19.5684Z'
      fill='white'
      stroke='#18A0FB'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M29.9355 28.2607H44.3485'
      stroke='#18A0FB'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M29.9355 33.3613H44.3485'
      stroke='#18A0FB'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M29.9355 38.46H44.3485'
      stroke='#18A0FB'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M36.0107 30.8234L48.8983 17.9401C49.1213 17.7169 49.386 17.5398 49.6774 17.4188C49.9688 17.2979 50.2812 17.2356 50.5967 17.2354C50.9122 17.2351 51.2246 17.2971 51.5162 17.4177C51.8077 17.5382 52.0727 17.715 52.296 17.9379C52.5192 18.1609 52.6963 18.4256 52.8173 18.717C52.9382 19.0084 53.0005 19.3208 53.0007 19.6363C53.0009 19.9518 52.939 20.2643 52.8185 20.5558C52.6979 20.8474 52.5211 21.1124 52.2982 21.3356L39.3928 34.2232L34.9717 35.2887L36.0107 30.8234Z'
      fill='white'
      stroke='#18A0FB'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M49.685 23.9536L46.2852 20.5537'
      stroke='#18A0FB'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <defs>
      <filter
        id='filter0_d_511_3685'
        x='0'
        y='0'
        width='75'
        height='75'
        filterUnits='userSpaceOnUse'
        colorInterpolationFilters='sRGB'
      >
        <feFlood floodOpacity='0' result='BackgroundImageFix' />
        <feColorMatrix
          in='SourceAlpha'
          type='matrix'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          result='hardAlpha'
        />
        <feOffset dy='4' />
        <feGaussianBlur stdDeviation='5' />
        <feComposite in2='hardAlpha' operator='out' />
        <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0' />
        <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_511_3685' />
        <feBlend
          mode='normal'
          in='SourceGraphic'
          in2='effect1_dropShadow_511_3685'
          result='shape'
        />
      </filter>
    </defs>
  </svg>
);

export default PostUpload;
