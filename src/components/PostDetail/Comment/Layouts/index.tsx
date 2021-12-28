import styled from 'styled-components';
import { SideButton, SubmitButton } from './Buttons';
import CommentInput from './CommentInput';
import LikeCount from 'components/common/Count/LikeCount';
import Avatar from 'components/common/Avatar';

const S = {
  ReplyWrapper: styled.li`
    margin-bottom: 18px;
    margin-left: 24px;
  `,

  CommentWrapper: styled.li`
    margin-bottom: 18px;
    position: relative;
  `,

  CreatorWrapper: styled.div`
    display: flex;
    gap: 4px;
    user-select: none;
    cursor: pointer;
  `,

  ROW1: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 4px;
  `,
  ROW2: styled.div`
    margin: 0 4px;
  `,

  COL1: styled.div`
    margin-right: 2px;
  `,
  COL2: styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
  `,
  COL3: styled.div`
    display: flex;
    align-items: center;
    margin-left: 8px;
    gap: 4px;
    user-select: none;
  `,

  Avatar: styled(Avatar)``,

  IsEdited: styled.p`
    font-size: 0.5rem;
    color: gray;
  `,

  COL5: styled.div`
    display: flex;
    margin-left: auto;
    align-items: center;
    gap: 4px;
  `,

  ReplyBtn: styled(SideButton)``,
  EditBtn: styled(SideButton)``,
  DelBtn: styled(SideButton)``,

  CreatedAt: styled.p`
    max-width: 82px;
    font-size: 0.9rem;
    color: gray;

    @media ${({ theme }) => theme.size.mobile} {
      font-size: 0.8rem;
    }
  `,
  Nickname: styled.p<IDeleted>`
    font-weight: 700;
    font-size: 0.9rem;
    color: ${({ is_deleted }) => is_deleted && `#666`};
  `,

  LikeCount: styled(LikeCount)``,

  EditContent: styled.div``,

  EditInput: styled(CommentInput)``,

  EditCancelBtn: styled(SubmitButton)`
    background-color: #888;
    margin-right: 8px;
  `,
  EditSubmitBtn: styled(SubmitButton)`
    background-color: black;
  `,

  Content: styled.div<IDeleted>`
    font-size: 0.9rem;
    padding: 14px 0;
    border-bottom: solid 1.4px #e9ecef;
    line-height: 1.2;
    word-break: break-all;

    font-style: ${({ is_deleted }) => is_deleted && 'italic'};
    color: ${({ is_deleted }) => is_deleted && `#666`};
  `,

  ROW3: styled.div``,

  ReplyInput: styled(CommentInput)``,
  ReplySubmitBtn: styled(SubmitButton)`
    background-color: black;
  `,
  ReplyCancleBtn: styled(SubmitButton)`
    background-color: #888;
    margin-right: 8px;
  `,
};

interface IDeleted {
  is_deleted: boolean;
}

export default S;
