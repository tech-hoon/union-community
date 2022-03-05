export const tagEliminatingRegex = (rawData: string) => rawData.replace(/(<([^>]+)>)/gi, ' ');

export const urlParsingRegex = (content: string) => {
  const regex1 = /(\b(https?):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim;
  const regex2 = /(^|[^/])(www\.[\S]+(\b|$))/gim;
  const regex3 = /(([a-zA-Z0-9\-.])+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6})+)/gim;

  return content
    .replace(regex1, '<a href="$1" target="_blank">$1</a>')
    .replace(regex2, '$1<a href="http://$2" target="_blank">$2</a>')
    .replace(regex3, '<a href="mailto:$1">$1</a>');
};

export const nicknameRegex = (rawData: string) => {
  const regex = /^[가-힣|a-z|A-Z|0-9|]+$/;
  return regex.test(rawData);
};

export const priceCommaRegex = (str: string): string => {
  if (Number(str) === 0) return '';

  const parsedStr = str.replace(/[^\d]+/g, '');
  return parsedStr.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
};
