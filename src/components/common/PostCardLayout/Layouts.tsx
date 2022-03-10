import { PhotoLibrary } from '@styled-icons/material-outlined';
import styled from 'styled-components';

import ViewCount from 'components/common/Count/ViewCount';
import LikeCount from 'components/common/Count/LikeCount';
import CommentCount from 'components/common/Count/CommentCount';
import Avatar from 'components/common/Avatar';
import CategoryLabel from '../PillLabel/CategoryLabel';

interface ICreator {
  isSecret: boolean;
}

export const Layouts = {
  Wrapper: styled.div`
    min-height: 60vh;
  `,
  Container: styled.ul`
    max-width: ${({ theme }) => theme.container.maxWidth};
    padding: ${({ theme }) => `0 ${theme.container.paddingLeftRight}`};
    transition: 0.3s;
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
      width: 100%;
      padding: 0 20px;
    }
  `,

  PostCard: styled.li`
    height: 240px;
    padding: 24px;
    background: #ffffff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    cursor: pointer;
    display: flex;
    flex-direction: column;

    transition: 0.3s;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        transform: scale(104%);
        transition: 0.3s;
      }
    }
  `,

  Head: styled.div`
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 23px;
  `,
  Title: styled.p`
    flex: 8;
    font-weight: 700;
    font-size: 1.2rem;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 2px;
    line-height: 1.15;
  `,

  ImageIcon: styled(PhotoLibrary)`
    flex: 1;
    color: #333;
    margin-right: 8px;
  `,
  Content: styled.div`
    font-weight: 300;
    padding: 0px;

    white-space: nowrap;
    overflow: hidden;
    white-space: normal;
    line-height: 1.2;
    height: 6em;
    margin-bottom: 17px;

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

  CreatedAt: styled.p`
    font-size: 11px;
    font-weight: 500;
    color: #b0b0b0;
    margin-left: 5px;
    margin-top: 1.5px;
    flex: 1;
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
    color: ${({ theme, isSecret }) => (isSecret ? '#000' : theme.color.main)};
    font-size: 16px;

    @media ${({ theme }) => theme.size.mobile} {
      font-size: 14px;
    }
  `,

  Category: styled(CategoryLabel)`
    font-weight: 500;
    float: right;
  `,

  NoPost: styled.span`
    font-weight: 500;
    margin-top: 4px;
    font-size: 16px;
    color: gray;
  `,
};
