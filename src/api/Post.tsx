import { BASE_URL, ERROR_MESSAGE } from '../utils/config';

const fetcher = async (URL: string) => {
  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error('서버 상태가 이상합니다!');
    return await response.json();
  } catch (error) {
    throw new Error(ERROR_MESSAGE);
  }
};
export const fetchPosts = async (page: number, limit: number) =>
  await fetcher(`${BASE_URL}/comments?_page=${page}&_limit=${limit}`);

export const fetchPost = async (id: number) => await fetcher(`${BASE_URL}/comments/${id}`);
