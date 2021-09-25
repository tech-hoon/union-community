import Footer from 'components/common/Footer';
import Navbar from 'components/common/Navbar';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { fetchPost } from 'api/Post';
import { useLocation, useHistory } from 'react-router-dom';
import { MockPostType } from 'types';
import Avatar from 'components/common/ProfileBox/Avatar';
import PostSkeleton from 'components/common/Skeletons/PostSkeleton';
import CountBox from 'components/Home/CountBox';

interface Props {}

const PostDetail = (props: Props) => {
  const [post, setPost] = useState<MockPostType>();
  const [initialLoading, setInitialLoading] = useState(true);

  const location = useLocation();
  const history = useHistory();
  const id = Number(location.pathname.split('/')[2]);

  useEffect(() => {
    const getPost = async () => {
      setPost(await fetchPost(id));
      setInitialLoading(false);
    };
    getPost();
  }, [id]);

  return (
    <Wrapper>
      <Navbar isLoggedIn={true} />
      {initialLoading ? (
        <PostSkeleton />
      ) : (
        <PostContainer>
          <BackButton onClick={() => history.goBack()}>&#xE000;</BackButton>
          <Title>{post?.name}</Title>
          <ROW_1>
            <ProfileBox>
              <Avatar />
              <Creator>{`홍길동`}</Creator>
            </ProfileBox>
            <CreatedAt>{new Date().toLocaleDateString()}</CreatedAt>
          </ROW_1>
          <ROW_2>
            카테고리 <Category>{`자유`}</Category>
          </ROW_2>
          <HR />
          <Body>{post?.body}</Body>
          <CountBox size='20px' />
          <CommentWrite placeholder='댓글을 입력해주세요.' />
          <SubmitBtn>등록하기</SubmitBtn>
          <CommentList />
        </PostContainer>
      )}
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const PostContainer = styled.section`
  width: 80vw;
  margin: 8% auto;
`;

const BackButton = styled.span`
  font-family: 'Spoqa Bold';
  font-size: 2em;
  cursor: pointer;
`;

const Title = styled.h1`
  font-family: 'Spoqa Bold';
  font-size: 2.5em;
  text-transform: uppercase;
  margin-top: 24px;
`;

const ROW_1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 40px 0;
`;

const ROW_2 = styled.div`
  font-family: 'Spoqa Medium';
  font-size: 1.3em;
`;

const Category = styled.span`
  border: 0.1px solid #dedede;
  background-color: orange;
  color: #eeeeee;
  border-radius: 20px;
  padding: 4px 12px;
`;

const HR = styled.hr`
  height: 3px;
  background-color: #dcdcdc;
  border: none;
  margin: 40px 0;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Creator = styled.span`
  font-family: 'Spoqa Medium';
  font-size: 1.5em;
  color: #999999;
`;

const CreatedAt = styled.span`
  font-family: 'Spoqa Medium';
  font-size: 1.5em;
  color: #999999;
`;

const Body = styled.section`
  margin: 40px 0;
  font-family: 'Spoqa Ligth';
  font-size: 20px;
  line-height: 200%;
`;

const CommentWrite = styled.textarea`
  font-family: 'Spoqa Regular';
  margin: 20px 0;
  padding: 10px;
  height: 100px;
  width: 100%;
`;

const Button = styled.button`
  font-family: 'Spoqa Medium';
  font-size: 1em;
  padding: 12px;
  border: 0.3px solid #eee;
  border-radius: 4px;
`;

const SubmitBtn = styled(Button)`
  float: right;
  background-color: skyblue;
  color: white;
`;

//TODO
const CommentList = styled.ul``;
const Comment = styled.li``;

export default PostDetail;
