export const tagEliminating = (rawData: string) => rawData.replace(/(<([^>]+)>)/gi, ' ');

export const parseUrl = (content: string) => {
  let replacedText = content.replaceAll('<br/>', '\n');

  const regex1 = /(\b(https?):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim;
  const regex2 = /(^|[^/])(www\.[\S]+(\b|$))/gim;
  const regex3 = /(([a-zA-Z0-9\-.])+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6})+)/gim;

  replacedText = replacedText.replace(regex1, '<a href="$1" target="_blank">$1</a>');
  replacedText = replacedText.replace(regex2, '$1<a href="http://$2" target="_blank">$2</a>');
  replacedText = replacedText.replace(regex3, '<a href="mailto:$1">$1</a>');
  replacedText = replacedText.replaceAll('\n', '<br/>');

  return replacedText;
};
