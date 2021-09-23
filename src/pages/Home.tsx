/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import Navbar from 'components/common/Navbar';
import PostCardBox from 'components/Home/PostCardBox';
import MenuBox from 'components/Home/MenuBox';
import OrderBox from 'components/Home/OrderBox';
import { fetchPosts } from 'api/Post';
import { useState, useEffect, useRef } from 'react';
import { DEFAULT_PAGE, CARD_AMOUNT } from 'utils/config';
import { PostType } from 'types';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import Footer from 'components/common/Footer';
import CardSkeleton from 'components/common/Skeletons/CardSkeleton';

interface Props {}

const Home = (props: Props) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [page, setPage] = useState<number>(DEFAULT_PAGE);
  const [initialLoading, setInitialLoading] = useState(false);
  const ioRef = useRef<HTMLDivElement | null>(null);
  const handlePageNext = () => setPage((page) => page + 1);
  const entry = useIntersectionObserver(ioRef, {}, handlePageNext);

  const getCards = async () => {
    const newPosts = await fetchPosts(page, CARD_AMOUNT);
    newPosts.length > 0 && setPosts((prevPosts: PostType[]) => [...prevPosts, ...newPosts]);
    setInitialLoading(false);
  };

  useEffect(() => {
    setInitialLoading(true);
    getCards();
  }, []);

  useEffect(() => {
    getCards();
  }, [page]);

  return (
    <Wrapper>
      <Navbar page='Home' />
      <MenuBox />
      <OrderBox />
      {initialLoading ? <CardSkeleton /> : <PostCardBox posts={posts} />}
      <Observer ref={ioRef} />
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Observer = styled.div`
  bottom: 0;
`;

export default Home;
