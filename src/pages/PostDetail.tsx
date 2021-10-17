import Footer from 'components/common/Footer';
import Navbar from 'components/common/Navbar';
import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Avatar from 'components/common/Avatar';
import PostSkeleton from 'components/common/Skeletons/PostSkeleton';
import CountBox from 'components/common/CountBox';
import CommentBox from 'components/PostDetail/CommentBox';
import { useGetPostDetail } from 'hooks/useGetPosts';
import { loginUserState } from 'store/loginUser';
import { useRecoilValue } from 'recoil';
import { deletePost } from 'api/post';
import { CommentType } from 'types';
import { addComment, getComments } from 'api/comment';

interface Props {}

// TODO: Comment 모듈화
const PostDetail = (props: Props) => {
  const location = useLocation();
  const history = useHistory();
  const id = location.pathname.split('/')[2];
  const loginUser = useRecoilValue(loginUserState);

  const { post } = useGetPostDetail(id);
  const [isCreator, setIsCreator] = useState<boolean>();
  const [contentMarkup, setContentMarkup] = useState({ __html: '' });
  const [comments, setComments] = useState<CommentType[]>([]);
  const commentRef = useRef<any>(null);

  const onDeleteClick = async () => {
    const ok = window.confirm('정말 삭제하시겠습니까?');
    ok && deletePost(id) && history.push('/');
  };

  const onUpdateClick = () => {
    post &&
      history.push({
        pathname: '/update',
        state: {
          id: id,
          title: post.title,
          content: post.content,
          category: post.category,
        },
      });
  };

  const onSubmitComment: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const commentId = await addComment({
      post_id: id,
      creator: loginUser,
      content: commentRef.current.value,
    });
    commentRef.current.value = '';

    fetchComments(id);
  };

  const fetchComments = async (id: string) => {
    const _comments: any = await getComments(id);
    setComments(_comments);
  };

  useEffect(() => {
    if (post) {
      !!loginUser && !!post.creator && setIsCreator(loginUser.uid === post.creator.uid);
      setContentMarkup({ __html: post.content });
    }
  }, [post, comments]);

  useEffect(() => {
    fetchComments(id);
  }, []);

  return (
    <Wrapper>
      <Navbar isLoggedIn={true} />
      {!!post ? (
        <PostContainer>
          <BackButton onClick={() => history.push('/')}>&#xE000;</BackButton>
          <Title>{post.title}</Title>
          <ROW_1>
            <ProfileBox>
              <Avatar avatarId={post.creator.avatarId} />
              <Creator>{post.creator?.nickname}</Creator>
            </ProfileBox>
            <CreatedAt>{new Date(post.created_at).toLocaleDateString()}</CreatedAt>
          </ROW_1>
          <ROW_2>
            카테고리 <Category>{post.category}</Category>
            {isCreator && (
              <EditBox>
                <UpdateBtn onClick={onUpdateClick}>수정하기</UpdateBtn>
                <DeleteBtn onClick={onDeleteClick}>삭제하기</DeleteBtn>
              </EditBox>
            )}
          </ROW_2>
          <HR />
          <Content dangerouslySetInnerHTML={contentMarkup} />
          <CountBox
            size='20px'
            viewCount={post.view_count!!}
            likeCount={post.like_count!!}
            commentCount={comments?.length!!}
          />
          <CommentWrite ref={commentRef} placeholder='댓글을 입력해주세요.' />
          <SubmitBtn onClick={onSubmitComment}>등록하기</SubmitBtn>
          <CommentBox commentList={comments} />
        </PostContainer>
      ) : (
        <PostSkeleton />
      )}
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const PostContainer = styled.section`
  width: 70vw;
  margin: 8% auto;
`;

const BackButton = styled.span`
  font-weight: 700;
  font-size: 2em;
  cursor: pointer;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 2.5em;
  margin-top: 24px;
`;

const ROW_1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 40px 0;
`;

const ROW_2 = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
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
  font-weight: 500;
  font-size: 1.5em;
  color: #999999;
`;

const EditBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const Btn = styled.button`
  font-size: 1em;
  font-weight: 500;
  color: #999;
`;

const UpdateBtn = styled(Btn)``;

const DeleteBtn = styled(Btn)``;

const CreatedAt = styled.span`
  font-weight: 500;
  font-size: 1.5em;
  color: #999;
`;

const Content = styled.section`
  margin: 40px 0;
  font-size: 20px;
  line-height: 200%;
`;

const Button = styled.button`
  font-weight: 500;
  font-size: 1em;
  padding: 12px;
  border: 0.3px solid #eee;
  border-radius: 4px;
`;

const CommentWrite = styled.textarea`
  font-weight: 300;
  margin: 20px 0;
  padding: 10px;
  height: 100px;
  width: 100%;
`;

const SubmitBtn = styled(Button)`
  width: 100px;
  margin-bottom: 40px;
  background-color: skyblue;
  color: white;
`;

export default PostDetail;
