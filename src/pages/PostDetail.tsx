import Footer from 'components/common/Footer';
import Navbar from 'components/common/Navbar';
import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { Heart, HeartOutlined } from '@styled-icons/entypo';
import { useLocation, useHistory } from 'react-router-dom';
import Avatar from 'components/common/Avatar';
import PostSkeleton from 'components/common/Skeletons/PostSkeleton';
import CountBox from 'components/common/CountBox';
import CommentBox from 'components/PostDetail/CommentBox';
import { useGetPostDetail } from 'hooks/post/useGetPosts';
import { loginUserState } from 'store/loginUser';
import { useRecoilValue } from 'recoil';
import { deletePost, postLike, postUnlike, viewCountUp } from 'api/post';
import { CommentType, loginUserType } from 'types';
import { addComment, getComments } from 'api/comment';
import { categoryColor } from 'utils/categoryColor';
import { likeOrUnlike } from 'utils/likeOrUnlike';
import { debounce } from 'lodash';
import { storageService } from 'service/firebase';

interface Props {}

// TODO: Comment 모듈화
// TODO: API 호출 최소화

const PostDetail = (props: Props) => {
  const location = useLocation();
  const history = useHistory();
  const id = location.pathname.split('/')[2];
  const loginUser = useRecoilValue(loginUserState) as loginUserType;

  const { post, fetchPostDetail, resetPostDetail } = useGetPostDetail(id);
  const [isCreator, setIsCreator] = useState<boolean>();
  const [contentMarkup, setContentMarkup] = useState({ __html: '' });

  const [comments, setComments] = useState<CommentType[]>([]);
  const commentRef = useRef<any>(null);

  const onViewCountUp = async () => {
    //TODO: 쿠키로 조회수 중복방지
    // await viewCountUp(id);
    await fetchPostDetail(id);
  };

  const onDeleteClick = async () => {
    const ok = window.confirm('정말 삭제하시겠습니까?');
    if (ok) {
      await deletePost(id);
      post?.attachment_url && (await storageService.refFromURL(post.attachment_url).delete());
      history.push({ pathname: '/home', state: 'isDeleted' });
    }
  };

  const onUpdateClick = () => {
    post &&
      history.push({
        pathname: '/upload',
        state: { mode: 'update', postId: id },
      });
  };

  const onSubmitComment: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    if (commentRef.current.value) {
      addComment({ post_id: id, creator: loginUser, content: commentRef.current.value });

      commentRef.current.value = '';
      fetchComments();
    }
  };

  const onLikePost = async (liker_list: string[], loginUserUid: string) => {
    likeOrUnlike(liker_list, loginUserUid) === 'unlike'
      ? await postUnlike(id, loginUserUid)
      : await postLike(id, loginUserUid);
    fetchPostDetail(id);
  };

  const fetchComments = async () => {
    const __comments: any = await getComments(id);
    setComments(__comments);
  };

  useEffect(() => {
    if (post) {
      !!loginUser && !!post.creator && setIsCreator(loginUser.uid === post.creator.uid);
      setContentMarkup({ __html: post.content });
    }
  }, [post]);

  useEffect(() => {
    onViewCountUp();
    fetchComments();

    return () => resetPostDetail();
  }, []);

  return (
    <Wrapper>
      <Navbar isLoggedIn={true} />
      {!!post ? (
        <PostContainer>
          <BackButton
            onClick={() =>
              history.push({
                pathname: '/home',
                state: history.location.state,
              })
            }
          >
            &#xE000;
          </BackButton>
          <ROW_1>
            <Title>{post.title}</Title>
            <Category color={categoryColor(post.category)}>{post.category}</Category>
          </ROW_1>
          <ROW_2>
            <ProfileBox>
              <Avatar avatarId={post.creator.avatar_id} />
              <Creator>{post.creator?.nickname}</Creator>
            </ProfileBox>
            <CreatedAt>{new Date(post.created_at).toLocaleDateString()}</CreatedAt>
          </ROW_2>
          <ROW_3>
            {isCreator && (
              <EditBox>
                <UpdateBtn onClick={onUpdateClick}>수정하기</UpdateBtn>
                <DeleteBtn onClick={onDeleteClick}>삭제하기</DeleteBtn>
              </EditBox>
            )}
          </ROW_3>
          <HR />
          <Content dangerouslySetInnerHTML={contentMarkup} />
          {post.attachment_url?.length && <Images src={post.attachment_url} alt='' />}
          <CountBox size='20px' viewCount={post.view_count} commentCount={comments.length} />
          <LikeButtonWrapper
            onClick={debounce(() => onLikePost(post.liker_list, loginUser?.uid!!), 800)}
          >
            {likeOrUnlike(post.liker_list, loginUser?.uid!!) === 'unlike' ? (
              <UnlikeButton />
            ) : (
              <LikeButton />
            )}
          </LikeButtonWrapper>
          <LikeCount>{post.liker_list.length}</LikeCount>

          <CommentWrite ref={commentRef} placeholder='댓글을 입력해주세요.' />
          <SubmitBtn onClick={onSubmitComment}>등록하기</SubmitBtn>
          <CommentBox postId={id} commentList={comments} fetchComments={fetchComments} />
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
  /* width: 70vw; */
  max-width: 1120px;
  padding: 0 60px;
  margin: 3% auto;

  @media ${({ theme }) => theme.size.mobile} {
    width: 90%;
    padding: 0;
  }
`;

const BackButton = styled.span`
  font-weight: 700;
  font-size: 2em;
  cursor: pointer;
`;

const ROW_1 = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 24px;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 2em;
  line-height: 1;
`;

const Category = styled.span`
  border: 0.1px solid #dedede;
  background-color: ${(props) => props.color};
  color: #eeeeee;
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 1rem;
  line-height: 1;
`;

const ROW_2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 0.8em;
    margin: 20px 0;
  }
`;

const ROW_3 = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.3em;
  margin: 20px 0;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1em;
    margin: 20px 0;
  }
`;

const HR = styled.hr`
  height: 3px;
  background-color: #dcdcdc;
  border: none;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  width: 12rem;
  gap: 4px;
`;

const Creator = styled.span`
  font-weight: 500;
  font-size: 1.2em;
  color: #999999;
`;

const LikeButtonWrapper = styled.div`
  width: 20px;
  color: #ed384f;
  cursor: pointer;
`;
const LikeButton = styled(HeartOutlined)``;
const UnlikeButton = styled(Heart)``;
const LikeCount = styled.div``;

const Btn = styled.button`
  font-size: 1em;
  font-weight: 500;
  color: #999;
`;

const EditBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  font-size: 0.8rem;
`;

const UpdateBtn = styled(Btn)``;

const DeleteBtn = styled(Btn)``;

const CreatedAt = styled.span`
  font-weight: 500;
  font-size: 1.2rem;
  color: #999;
`;

const Content = styled.section`
  margin: 40px 0;
  font-size: 1.2rem;
  line-height: 1.5;
`;

const Images = styled.img`
  max-width: 500px;
  margin-bottom: 24px;
`;

const Button = styled.button`
  font-weight: 500;
  font-size: 1em;
  padding: 12px;
  border: 0.3px solid #eee;
  border-radius: 4px;
`;

const CommentWrite = styled.textarea`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 400;
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
