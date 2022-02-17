export const toDateStringByFormating = (
  timestamp: number,
  timeInclude = false,
  delimiter = '-'
) => {
  const currTime = new Date().getTime();

  const timeDiff = (currTime - timestamp) / 1000;

  const MIN = 60;
  const HOUR = 60 * MIN;
  const DAY = 24 * HOUR;
  const MONTH = 31 * DAY;
  const YEAR = 12 * MONTH;

  if (timeDiff < 60) {
    return `방금전`;
  }

  if (timeDiff < HOUR) {
    return `${Math.floor(timeDiff / MIN)}분전`;
  }

  if (timeDiff < DAY) {
    return `${Math.floor(timeDiff / HOUR)}시간전`;
  }

  if (timeDiff < MONTH) {
    return `${Math.floor(timeDiff / DAY)}일전`;
  }

  if (timeDiff >= MONTH) {
    return `${Math.floor(timeDiff / MONTH)}달전`;
  }

  const dateInstance = new Date(timestamp);
  const year = dateInstance.getFullYear();
  const month = dateInstance.getMonth() + 1;
  const date = dateInstance.getDate();
  const hours = dateInstance.getHours();
  const minutes = dateInstance.getMinutes();

  return `${[year, month, date].join(delimiter)}${
    timeInclude === true ? ' ' + [hours, minutes].join(':') : ''
  }`;
};
