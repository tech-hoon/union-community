import Footer from 'components/common/Footer';
import Navbar from 'components/common/Navbar';
import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PostSkeleton from 'components/common/Skeletons/PostSkeleton';
import CommentBox from 'components/PostDetail/Comment/CommentBox';
import { useGetPostDetail } from 'hooks/post/useGetPosts';
import { loginUserState } from 'store/loginUser';
import { useRecoilState, useRecoilValue } from 'recoil';
import { deletePost, postLike, postUnlike, viewCountUp } from 'api/post';
import { LoginUserType, PostType, ProductPostType } from 'types';
import { addComment, getComments } from 'api/comment';
import { likeOrUnlike } from 'utils/likeOrUnlike';
import { urlParsingRegex } from 'utils/regex';

import CommentCount from 'components/common/Count/CommentCount';
import ViewCount from 'components/common/Count/ViewCount';
import LikeCount from 'components/common/Count/LikeCount';

import useModal from 'hooks/common/useModal';
import PortalContainer from 'components/common/Portal/PortalContainer';
import AlertModal from 'components/common/Portal/AlertModal';
import UserMenuModal from 'components/common/Portal/UserMenuModal';
import { commentState } from 'store/comment';
import { storageService } from 'service/firebase';
import ImageSlider from 'components/common/Slider/ImageSlider';

import BottomBanner from 'components/common/Banner/BottomBanner';
import CommentTextarea from 'components/PostDetail/Textarea/CommentTextarea';

import ProductContainer from 'components/PostDetail/ProductContainer';
import PostContainer from 'components/PostDetail/PostContainer';
import useRecoilCacheRefresh from 'hooks/comment/useRecoilCacheRefresh';
import { myLikesState, myPostsState } from 'store/myPosts';

const PostDetail = () => {
  const location = useLocation();
  const history = useHistory();
  const id = location.pathname.split('/')[2];
  const loginUser = useRecoilValue(loginUserState) as LoginUserType;

  const { post, fetchPostDetail } = useGetPostDetail();
  const [isCreator, setIsCreator] = useState<boolean>(false);
  const [contentMarkup, setContentMarkup] = useState({ __html: '' });
  const [imageIndex, setImageIndex] = useState<number>(0);

  const [comments, setComments] = useRecoilState(commentState);
  const commentRef = useRef<any>(null);
  const isSecret = post?.category === '비밀' || post?.is_secret || false;

  const myLikesCacheRefresher = useRecoilCacheRefresh(myLikesState);
  const myPostsCacheRefresher = useRecoilCacheRefresh(myPostsState);

  const { modalOpened, onOpenModal, onCloseModal } = useModal();
  const {
    modalOpened: userMenuOpened,
    onOpenModal: onOpenUserMenu,
    onCloseModal: onCloseUserMenu,
  } = useModal();

  const {
    modalOpened: sliderOpened,
    onOpenModal: onOpenSlider,
    onCloseModal: onCloseSlider,
  } = useModal();

  const onDeletePost = async (id: string) => {
    await deletePost(id);
    (post?.attachment_url || []).forEach(async (attachmentUrl: string) => {
      await storageService.refFromURL(attachmentUrl).delete();
    });
    myPostsCacheRefresher();
    history.push({ pathname: '/home', state: 'isDeleted' });
  };

  const onViewCountUp = async () => {
    if (post && !post?.visitor_list.includes(loginUser.uid)) {
      await viewCountUp(post.id, loginUser.uid);
    }
  };

  const onOpenImageSlider = (id: number) => {
    setImageIndex(id);
    onOpenSlider();
  };

  const onUpdatePostClick = () => {
    post &&
      history.push({
        pathname: '/post/upload',
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

  const onUpdateProductClick = () => {
    const __post = JSON.parse(JSON.stringify(post)) as ProductPostType;

    __post &&
      history.push({
        pathname: '/product/upload',
        state: {
          mode: 'update',
          initialProduct: {
            id: __post.id,
            title: __post.title,
            type: __post.type,
            status: __post.status,
            price: __post.price,
            content: __post.content,
            attachment_url: __post.attachment_url,
          },
        },
      });
  };

  const onSubmitComment: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    if (commentRef.current.value) {
      addComment({
        post_id: id,
        uid: loginUser.uid,
        content: commentRef.current.value,
      });
      commentRef.current.value = '';
      fetchComments();
    }
  };

  const onLikePost = async (liker_list: string[], loginUserUid: string) => {
    likeOrUnlike(liker_list, loginUserUid) === 'unlike'
      ? await postUnlike(id, loginUserUid)
      : await postLike(id, loginUserUid);
    fetchPostDetail(id);
    myLikesCacheRefresher();
  };

  const fetchComments = async () => {
    const __comments: any = await getComments(id);
    setComments(__comments);
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    fetchComments();
  }, []);

  useEffect(() => {
    fetchPostDetail(id);
  }, [comments]);

  useEffect(() => {
    if (post) {
      !!loginUser && !!post.creator && setIsCreator(loginUser.uid === post.creator.uid);
      setContentMarkup({
        __html: post.category === '공지' ? post.content : urlParsingRegex(post.content),
      });
      onViewCountUp();
    }
  }, [post]);

  return (
    <>
      <Wrapper>
        <Navbar option='post-detail' />
        {post ? (
          <Container>
            {post.category === '장터/나눔' ? (
              <ProductContainer
                post={post as ProductPostType}
                contentMarkup={contentMarkup}
                isCreator={isCreator}
                onOpenModal={onOpenModal}
                onOpenUserMenu={onOpenUserMenu}
                onOpenImageSlider={onOpenImageSlider}
                onUpdateProductClick={onUpdateProductClick}
              />
            ) : (
              <PostContainer
                post={post as PostType}
                contentMarkup={contentMarkup}
                isCreator={isCreator}
                onOpenModal={onOpenModal}
                onOpenUserMenu={onOpenUserMenu}
                onOpenImageSlider={onOpenImageSlider}
                onUpdatePostClick={onUpdatePostClick}
              />
            )}
            <CountBox>
              <ViewCount size='16px' count={post.visitor_list?.length} />
              <CommentCount size='16px' count={post.comment_count} />
              <LikeCount
                size='16px'
                count={post.liker_list?.length}
                flag={likeOrUnlike(post.liker_list, loginUser.uid)}
                onClick={() => onLikePost(post.liker_list, loginUser.uid!!)}
              />
            </CountBox>

            <CommentTextarea onSubmitComment={onSubmitComment} ref={commentRef} />

            <CommentBox
              postId={id}
              commentList={comments}
              fetchComments={fetchComments}
              category={post.category}
              isSecret={isSecret}
              postCreatorId={post.creator.uid}
            />

            {/* <BottomBanner /> */}
          </Container>
        ) : (
          <PostSkeleton />
        )}
        <Footer />
      </Wrapper>

      {/* 삭제 경고 모달 */}
      {modalOpened && (
        <PortalContainer onClose={onCloseModal}>
          <AlertModal
            title='글을 삭제하시겠습니까?'
            twoButton={true}
            buttonLabels={['취소', '삭제하기']}
            callback={() => onDeletePost(id)}
            onCloseModal={onCloseModal}
          />
        </PortalContainer>
      )}

      {/* 사용자 메뉴 모달 */}
      {userMenuOpened && !isCreator && post && (
        <PortalContainer onClose={onCloseUserMenu}>
          <UserMenuModal
            reciever={post.creator}
            onCloseModal={onCloseUserMenu}
            isSecret={isSecret}
          />
        </PortalContainer>
      )}

      {/* 이미지 슬라이더 모달 */}
      {sliderOpened && post?.attachment_url.length && (
        <PortalContainer onClose={onCloseSlider}>
          <ImageSlider imageUrls={post.attachment_url as string[]} startIndex={imageIndex} />
        </PortalContainer>
      )}
    </>
  );
};

const Wrapper = styled.div`
  overflow-y: hidden;
  min-height: 100vh;
`;

const Container = styled.section`
  max-width: ${({ theme }) => theme.container.maxWidth};
  padding: ${({ theme }) => `0 ${theme.container.paddingLeftRight}`};

  margin: 3% auto;

  @media ${({ theme }) => theme.size.mobile} {
    width: 100%;
    margin: 6% auto;
    padding: 0 20px;
  }
`;

const CountBox = styled.div`
  display: flex;
  align-items: center;
  gap: 2.6px;
`;

export default PostDetail;
