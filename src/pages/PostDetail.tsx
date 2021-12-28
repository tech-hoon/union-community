import Footer from 'components/common/Footer';
import Navbar from 'components/common/Navbar';
import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Avatar from 'components/common/Avatar';
import PostSkeleton from 'components/common/Skeletons/PostSkeleton';
import CommentBox from 'components/PostDetail/Comment/CommentBox';
import { useGetPostDetail } from 'hooks/post/useGetPosts';
import { loginUserState } from 'store/loginUser';
import { useRecoilState, useRecoilValue } from 'recoil';
import { deletePost, postLike, postUnlike, viewCountUp } from 'api/post';
import { LoginUserType } from 'types';
import { addComment, getComments } from 'api/comment';
import { categoryColor } from 'utils/categoryColor';
import { likeOrUnlike } from 'utils/likeOrUnlike';
import { urlParsingRegex } from 'utils/regex';
import { debounce } from 'lodash';

import { storageService } from 'service/firebase';
import { PhotoLibrary } from '@styled-icons/material-outlined';
import CommentCount from 'components/common/Count/CommentCount';
import ViewCount from 'components/common/Count/ViewCount';
import LikeCount from 'components/common/Count/LikeCount';

import useModal from 'hooks/common/useModal';
import PortalContainer from 'components/common/Portal/PortalContainer';
import AlertModal from 'components/common/Portal/AlertModal';
import UserMenuModal from 'components/common/Portal/UserMenuModal';
import { commentState } from 'store/comment';
import { toDateStringByFormating } from 'utils/date';

const PostDetail = () => {
  const location = useLocation();
  const history = useHistory();
  const id = location.pathname.split('/')[2];
  const loginUser = useRecoilValue(loginUserState) as LoginUserType;

  const { post, fetchPostDetail } = useGetPostDetail();
  const [isCreator, setIsCreator] = useState<boolean>();
  const [contentMarkup, setContentMarkup] = useState({ __html: '' });
  const [comments, setComments] = useRecoilState(commentState);
  const commentRef = useRef<any>(null);
  const isSecret = post?.category === '비밀';

  const { modalOpened, onOpenModal, onCloseModal } = useModal();
  const {
    modalOpened: userMenuOpened,
    onOpenModal: onOpenUserMenu,
    onCloseModal: onCloseUserMenu,
  } = useModal();

  const onDeletePost = async (id: string) => {
    await deletePost(id);
    post?.attachment_url!! && (await storageService.refFromURL(post?.attachment_url!!).delete());
    history.push({ pathname: '/home', state: 'isDeleted' });
  };

  const onViewCountUp = async () => {
    if (post && !post?.visitor_list.includes(loginUser.uid)) {
      await viewCountUp(post.id, loginUser.uid);
    }
  };

  const onUpdateClick = () => {
    post &&
      history.push({
        pathname: '/upload',
        state: {
          mode: 'update',
          initialPost: {
            id: post.id,
            title: post.title,
            category: post.category,
            content: post.content,
            attachment_url: post.attachment_url,
          },
        },
      });
  };

  const onSubmitComment: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    if (commentRef.current.value) {
      addComment({ post_id: id, uid: loginUser.uid, content: commentRef.current.value });
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
      setContentMarkup({ __html: urlParsingRegex(post.content) });
    }
  }, [post]);

  useEffect(() => {
    fetchPostDetail(id);
  }, [comments]);

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    onViewCountUp();
  }, [post]);

  return (
    <>
      <Wrapper>
        <Navbar isLoggedIn={true} />
        {post ? (
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
              <IsEdited>{post.is_edited && `수정됨 `}</IsEdited>
            </ROW_1>
            <ROW_2>
              <ProfileBox onClick={onOpenUserMenu}>
                <Avatar avatarId={isSecret ? -1 : post.creator.avatar_id} />
                <Creator isSecret={isSecret}>{isSecret ? '익명' : post.creator.nickname}</Creator>
              </ProfileBox>
              {!!post.attachment_url && <ImageIcon size='24px' />}
              <Category color={categoryColor(post.category)}>{post.category}</Category>
            </ROW_2>
            <ROW_3>
              {isCreator && (
                <EditBox>
                  <UpdateBtn onClick={onUpdateClick}>수정하기</UpdateBtn>
                  <DeleteBtn onClick={onOpenModal}>삭제하기</DeleteBtn>
                </EditBox>
              )}
              <CreatedAt>{toDateStringByFormating(post.created_at, false, '.')}</CreatedAt>
            </ROW_3>
            <ContentWrapper>
              <Content dangerouslySetInnerHTML={contentMarkup} />
              {post.attachment_url?.length ? <Images src={post.attachment_url} alt='' /> : <></>}
            </ContentWrapper>
            <CountBox>
              <ViewCount size='16px' count={post.visitor_list?.length} />
              <CommentCount size='16px' count={post.comment_count} />
              <LikeCount
                size='16px'
                count={post.liker_list?.length}
                flag={likeOrUnlike(post.liker_list, loginUser.uid)}
                onClick={debounce(() => onLikePost(post.liker_list, loginUser.uid!!), 800)}
              />
            </CountBox>

            <CommentWriteWrapper>
              <CommentWrite
                ref={commentRef}
                placeholder='댓글을 입력해주세요.'
                spellCheck='false'
              />
              <SubmitBtn onClick={onSubmitComment} type='submit'>
                등록하기
              </SubmitBtn>
            </CommentWriteWrapper>

            <CommentBox
              postId={id}
              commentList={comments}
              fetchComments={fetchComments}
              category={post.category}
            />
          </PostContainer>
        ) : (
          <PostSkeleton />
        )}
        <Footer />
      </Wrapper>

      {modalOpened && (
        <PortalContainer onClose={onCloseModal}>
          <AlertModal
            title='글을 삭제하시겠습니까?'
            twoButton={true}
            callback={() => onDeletePost(id)}
            onCloseModal={onCloseModal}
          />
        </PortalContainer>
      )}

      {userMenuOpened && !isCreator && post && (
        <PortalContainer onClose={onCloseUserMenu}>
          <UserMenuModal
            reciever={post.creator}
            onCloseModal={onCloseUserMenu}
            isSecret={isSecret}
          />
        </PortalContainer>
      )}
    </>
  );
};

const Wrapper = styled.div`
  overflow-y: hidden;
`;

const PostContainer = styled.section`
  max-width: 1120px;
  padding: 0 60px;
  margin: 3% auto;

  @media ${({ theme }) => theme.size.mobile} {
    width: 90%;
    padding: 0 20px;
  }
`;

const BackButton = styled.span`
  font-weight: 700;
  font-size: 2em;
  cursor: pointer;
`;

const ROW_1 = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 18px;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 1;
  flex: 8;
  word-break: break-all;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1.5rem;
  }
`;

const Category = styled.div`
  max-width: 80px;
  text-align: center;
  background-color: ${(props) => props.color};
  color: #eeeeee;
  border-radius: 16px;
  padding: 4px 12px;
  font-size: 1rem;
  line-height: 1;
`;

const ImageIcon = styled(PhotoLibrary)`
  color: #333;
`;

const ROW_2 = styled.div`
  display: flex;
  align-items: center;
  margin-top: 18px;
  gap: 8px;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 0.8em;
  }
`;

const ROW_3 = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.3em;
  margin-top: 16px;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1em;
  }
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  margin-right: auto;
`;

interface ICreator {
  isSecret: boolean;
}

const Creator = styled.span<ICreator>`
  font-weight: 500;
  font-size: 1.2em;
  margin-bottom: 1.2px;
  color: ${({ theme, isSecret }) => (isSecret ? 'gray' : theme.color.MAIN)};
`;

const CountBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Btn = styled.button`
  font-size: 1em;
  font-weight: 500;
  color: #999;
`;

const EditBox = styled.div`
  display: flex;
  align-items: center;
  /* margin-left: auto; */
  font-size: 0.8rem;
`;

const UpdateBtn = styled(Btn)``;

const DeleteBtn = styled(Btn)``;

const CreatedAt = styled.span`
  font-weight: 500;
  font-size: 1rem;
  color: #999;
  margin-left: auto;
  padding-right: 1.2px;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 0.9rem;
  }
`;

const IsEdited = styled(CreatedAt)`
  line-height: 1.5;
  font-size: 0.8rem;
  align-self: flex-end;
`;

const ContentWrapper = styled.section`
  min-height: 100px;
  margin: 12px 0 36px;
`;

const Content = styled.div`
  font-size: 1.2rem;
  line-height: 1.6;
  padding: 0 4px;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1rem;
  }
`;

const Images = styled.img`
  max-width: 500px;
  margin-bottom: 24px;

  @media ${({ theme }) => theme.size.mobile} {
    max-width: 300px;
  }
`;

const Button = styled.button`
  font-weight: 500;
  font-size: 1rem;
  padding: 4px 0px;
  border-radius: 4px;
`;

const CommentWriteWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 4px;
  border: 0.3px solid #666;
  border-radius: 4px;
  margin: 24px 0;
`;

const CommentWrite = styled.textarea`
  font-weight: 400;
  font-size: 0.95rem;
  width: 100%;
  flex: 1;
  padding-top: 15px;
  padding-left: 5px;

  background: none;
  border: none;
  overflow: auto;
  outline: none;
  resize: none;

  display: flex;
  align-items: center;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 0.8rem;
  }
`;

const SubmitBtn = styled(Button)`
  width: 80px;
  font-size: 0.8rem;
  padding: 10px 0;
  color: #666;

  @media ${({ theme }) => theme.size.mobile} {
    width: 64px;
    font-size: 0.7rem;
  }
`;

export default PostDetail;
