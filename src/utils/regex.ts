export const tagEliminatingRegex = (rawData: string) => rawData.replace(/(<([^>]+)>)/gi, '');
