import React from 'react';
import styled from 'styled-components';
import { PostType } from 'types';
import Avatar from 'components/common/Avatar';
import { toDateStringByFormating } from 'utils/date';
import CategoryLabel from 'components/common/PillLabel/CategoryLabel';
import KebabMenu from 'components/common/KebabMenu';
import { PhotoLibrary } from '@styled-icons/material-outlined';
import { categoryColor } from 'utils/categoryColor';

interface IProps {
  post: PostType;
  contentMarkup: { __html: string };
  isCreator: boolean;

  onOpenModal: () => void;
  onOpenUserMenu: () => void;
  onOpenImageSlider: (id: number) => void;
  onUpdatePostClick: () => void;
}
const PostContainer = ({
  post,
  isCreator,
  contentMarkup,
  onOpenModal,
  onOpenUserMenu,
  onOpenImageSlider,
  onUpdatePostClick,
}: IProps) => {
  const { category, title, creator, created_at, attachment_url } = post;
  const isSecret = post?.category === '비밀';

  return (
    post && (
      <Wrapper>
        <Category size='sm' color={categoryColor(category)} isClicked={true}>
          {category}
        </Category>
        <ROW_1>
          <Title>{title}</Title>
          {/* <IsEdited>{post.is_edited && `수정됨 `}</IsEdited> */}
        </ROW_1>
        <ROW_2>
          <ProfileBox onClick={onOpenUserMenu}>
            <Avatar avatarId={isSecret ? -1 : creator.avatar_id} />
            <Creator isSecret={isSecret}>{isSecret ? '익명' : creator.nickname}</Creator>
          </ProfileBox>
          <CreatedAt>{toDateStringByFormating(created_at, false, '.')}</CreatedAt>
          {!!attachment_url.length && <ImageIcon size='24px' />}

          {isCreator && (
            <KebabMenu>
              <UpdateBtn onClick={onUpdatePostClick}>수정하기</UpdateBtn>
              <DeleteBtn onClick={onOpenModal}>삭제하기</DeleteBtn>
            </KebabMenu>
          )}
        </ROW_2>
        <ROW_3></ROW_3>
        <ContentWrapper>
          <Content dangerouslySetInnerHTML={contentMarkup} />
          <ImagesContainer>
            {!!attachment_url &&
              (attachment_url || []).map((url, id) => (
                <Image src={url} alt='image' key={id} onClick={() => onOpenImageSlider(id)} />
              ))}
          </ImagesContainer>
        </ContentWrapper>
      </Wrapper>
    )
  );
};

const Wrapper = styled.div``;

const ROW_1 = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  margin: 18px 0;
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

const ImageIcon = styled(PhotoLibrary)`
  color: #333;
`;

const ROW_2 = styled.div`
  display: flex;
  align-items: center;
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
  gap: 5px;
  cursor: pointer;
`;

interface ICreator {
  isSecret: boolean;
}

const Creator = styled.span<ICreator>`
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 1.2px;
  color: ${({ theme, isSecret }) => (isSecret ? '#000' : theme.color.main)};
  user-select: none;
`;

const Btn = styled.button`
  font-size: 14px;
  font-weight: 400;
  color: black;
  padding: 12px 14px;
`;

const UpdateBtn = styled(Btn)``;

const DeleteBtn = styled(Btn)``;

const CreatedAt = styled.span`
  font-weight: 500;
  font-size: 14px;
  color: #999;
  margin-right: auto;
  padding-right: 1.2px;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 10px;
  }
`;

const IsEdited = styled(CreatedAt)`
  line-height: 1.5;
  font-size: 0.8rem;
  align-self: flex-end;
`;

const ContentWrapper = styled.section`
  min-height: 20vh;
  margin: 12px 0 36px;
`;

const Content = styled.div`
  font-size: 1.2rem;
  line-height: 1.6;
  padding: 0 4px;
  white-space: pre-line;

  @media ${({ theme }) => theme.size.mobile} {
    font-size: 1rem;
  }
`;

const ImagesContainer = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
`;

const Image = styled.img`
  flex: none;
  height: 150px;
  margin-top: 30px;
  margin-bottom: 24px;
  cursor: pointer;
  -webkit-user-drag: none;
`;

const Button = styled.button`
  font-weight: 500;
  font-size: 1rem;
  padding: 4px 0px;
  border-radius: 4px;
`;

const Category = styled(CategoryLabel)`
  font-weight: 500;
`;

export default PostContainer;
