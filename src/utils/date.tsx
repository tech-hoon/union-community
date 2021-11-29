export const toDateStringByFormating = (
  timestamp: number,
  timeInclude = false,
  delimiter = '-'
) => {
  const dateInstance = new Date(timestamp);

  const year = dateInstance.getFullYear();
  const month = dateInstance.getMonth() + 1;
  const date = dateInstance.getDate();
  const hours = dateInstance.getHours();
  const minutes = dateInstance.getMinutes();
  const seconds = dateInstance.getSeconds();

  return `${[year, month, date].join(delimiter)}${
    timeInclude === true ? ' ' + [hours, minutes, seconds].join(':') : ''
  }`;
};
