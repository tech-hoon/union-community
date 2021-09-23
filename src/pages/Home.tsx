import styled from 'styled-components';
import Navbar from 'components/common/Navbar';
import PostsBox from 'components/Home/PostsBox';
import MenuBox from 'components/Home/MenuBox';
import OrderBox from 'components/Home/OrderBox';
import { fetchPosts } from 'api/Post';
import { useState, useEffect, useRef } from 'react';
import { DEFAULT_PAGE, CARD_AMOUNT } from 'utils/config';
import { CardType } from 'types';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import Footer from 'components/common/Footer';

interface Props {}

const Home = (props: Props) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [page, setPage] = useState<number>(DEFAULT_PAGE);
  const ioRef = useRef<HTMLDivElement | null>(null);
  const handlePageNext = () => setPage((page) => page + 1);
  const entry = useIntersectionObserver(ioRef, {}, handlePageNext);
  const isLoading = entry?.isIntersecting;

  useEffect(() => {
    const getCards = async () => {
      const newCards = await fetchPosts(page, CARD_AMOUNT);
      newCards.length > 0 && setCards((prevCards: CardType[]) => [...prevCards, ...newCards]);
    };

    getCards();
  }, [page]);

  return (
    <Wrapper>
      <Navbar page='Home' />
      <MenuBox />
      <OrderBox />
      <PostsBox cards={cards} />
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
