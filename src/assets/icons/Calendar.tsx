import IIcon from './icons.type';

const Calendar = ({ width = '20', height = '21', color }: IIcon) => (
  <svg
    width={width}
    height={height}
    viewBox='0 0 20 21'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M4.46508 19.841C2.55238 19.841 1 18.0529 1 15.8476V7.07248C1 4.86447 2.55238 3.0791 4.46508 3.0791H15.5376C17.4503 3.0791 19 4.86447 19 7.07248V15.8476C19 18.0529 17.4503 19.841 15.5376 19.841H4.46508Z'
      fill='none'
      stroke={color}
      strokeWidth='1.5'
      strokeMiterlimit='10'
    />
    <path
      d='M1 7.07248C1 4.86447 2.55238 3.0791 4.46508 3.0791H15.5376C17.4503 3.0791 19 4.86447 19 7.07248H1Z'
      fill={color}
    />
    <path
      d='M7.53223 15.8003V10.1299L10.003 13.003L12.4738 15.8761V10.1299'
      stroke={color}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M5 4V1'
      stroke={color}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M15 4V1'
      stroke={color}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default Calendar;
