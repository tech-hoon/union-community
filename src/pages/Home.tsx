import styled from 'styled-components';
import Navbar from 'components/common/Navbar';
import PostCardBox from 'components/Home/PostCardBox';
import MenuBox from 'components/Home/MenuBox';
import OrderBox from 'components/Home/OrderBox';
import Footer from 'components/common/Footer';
import CardSkeleton from 'components/common/Skeletons/CardSkeleton';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { fetchPosts } from 'api/Post';
import { useState, useEffect, useRef } from 'react';
import { DEFAULT_PAGE, CARD_AMOUNT } from 'utils/config';
import { MockPostType } from 'types';

interface Props {}

const Home = (props: Props) => {
  const [posts, setPosts] = useState<MockPostType[]>([]);
  const [page, setPage] = useState<number>(DEFAULT_PAGE);
  const [initialLoading, setInitialLoading] = useState(true);
  const ioRef = useRef<HTMLDivElement | null>(null);
  const handlePageNext = () => setPage((page) => page + 1);
  const entry = useIntersectionObserver(ioRef, {}, handlePageNext);

  const getCards = async () => {
    const newPosts = await fetchPosts(page, CARD_AMOUNT);
    newPosts.length > 0 && setPosts((prevPosts: MockPostType[]) => [...prevPosts, ...newPosts]);
    setInitialLoading(false);
  };

  useEffect(() => {
    getCards();
  }, [page]);

  return (
    <Wrapper>
      <Navbar isLoggedIn={true} />
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
