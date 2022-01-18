import { PhotoLibrary } from '@styled-icons/material-outlined';
import styled from 'styled-components';

import ViewCount from 'components/common/Count/ViewCount';
import LikeCount from 'components/common/Count/LikeCount';
import CommentCount from 'components/common/Count/CommentCount';
import Avatar from 'components/common/Avatar';

export const Layouts = {
  Wrapper: styled.ul`
    min-height: 40vh;

    max-width: 1120px;
    padding: 0 60px;
    user-select: none;

    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));

    gap: 30px;
    margin: 0 auto;

    @media ${({ theme }) => theme.size.tablet} {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media ${({ theme }) => theme.size.mobile} {
      grid-template-columns: repeat(1, minmax(0, 1fr));
      width: 80%;
      padding: 0px;
    }
  `,

  PostCard: styled.li`
    height: 300px;
    padding: 24px;
    background: #ffffff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    cursor: pointer;
    display: flex;
    flex-direction: column;

    @media ${({ theme }) => theme.size.desktop} {
      height: 15rem;
    }

    @media (hover: hover) {
      transform: scale(103%);
    }
  `,

  Head: styled.div`
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  `,
  Title: styled.p`
    flex: 8;
    font-weight: 700;
    font-size: 1.2rem;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  ImageIcon: styled(PhotoLibrary)`
    flex: 1;
    color: #333;
    margin-right: 8px;
  `,
  Content: styled.div`
    font-weight: 300;
    padding: 0px 4px;

    white-space: nowrap;
    overflow: hidden;
    white-space: normal;
    line-height: 1.2;
    height: 6rem;
    margin-bottom: 1.2rem;

    flex: 1;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  `,

  CardBottom: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  CreatorBox: styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
  `,

  CountBox: styled.div`
    display: flex;
    align-items: center;
  `,

  ViewCount: styled(ViewCount)``,
  LikeCount: styled(LikeCount)``,
  CommentCount: styled(CommentCount)``,

  AvatarWrapper: styled.div``,

  Avatar: styled(Avatar)``,

  Creator: styled.span<ICreator>`
    flex: 1;

    font-weight: 500;
    color: ${({ theme, isSecret }) => (isSecret ? 'gray' : theme.color.MAIN)};
    font-size: 16px;

    @media ${({ theme }) => theme.size.mobile} {
      font-size: 14px;
    }
  `,

  Category: styled.span<ICategory>`
    background-color: ${(props) => props.color};
    color: #eeeeee;
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 0.9em;
    float: right;
  `,
};

export default Layouts;

interface ICreator {
  isSecret: boolean;
}

interface ICategory {
  color: string;
}
