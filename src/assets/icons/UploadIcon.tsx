import IIcon from './icons.type';

const UploadIcon = ({ width = '75', height = '75' }: IIcon) => (
  <svg
    width={width}
    height={height}
    viewBox='0 0 75 75'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g filter='url(#filter0_d_541_4199)'>
      <circle cx='37.5' cy='33.5' r='27.5' fill='#18A0FB' />
    </g>
    <path
      d='M24 34H51'
      stroke='white'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <path
      d='M38 20V47'
      stroke='white'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <defs>
      <filter
        id='filter0_d_541_4199'
        x='0'
        y='0'
        width='75'
        height='75'
        filterUnits='userSpaceOnUse'
        color-interpolation-filters='sRGB'
      >
        <feFlood flood-opacity='0' result='BackgroundImageFix' />
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
        <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_541_4199' />
        <feBlend
          mode='normal'
          in='SourceGraphic'
          in2='effect1_dropShadow_541_4199'
          result='shape'
        />
      </filter>
    </defs>
  </svg>
);

export default UploadIcon;
