import styled from 'styled-components';
import { SideButton, SubmitButton } from './Buttons';
import LikeCount from 'components/common/Count/LikeCount';
import Avatar from 'components/common/Avatar';
import ReplyArrow from 'assets/icons/ReplyArrow';
import CustomTextarea from 'components/PostDetail/Textarea/CustomTextarea';

const S = {
  CommentWrapper: styled.li`
    position: relative;
  `,

  ReplyWrapper: styled.li`
    display: flex;
    gap: 9px;
    padding-left: 16px;
  `,

  ReplyArrow: styled(ReplyArrow)``,

  ReplyContainer: styled.div`
    width: 100%;
    position: relative;
  `,

  CreatorWrapper: styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    user-select: none;
    cursor: pointer;
  `,

  ROW1: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 5px;
  `,

  ROW2: styled.div`
    margin: 12px 0 20px;
  `,

  COL1: styled.div`
    margin-right: 2px;
  `,
  COL2: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  COL3: styled.div`
    display: flex;
    align-items: center;
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

  ReplyBtn: styled.span`
    margin-left: 7px;
    font-weight: 400;
    font-size: 12px;
    color: #5c5c5c80;
    cursor: pointer;
    user-select: none;
  `,

  EditBtn: styled(SideButton)``,
  DelBtn: styled(SideButton)``,

  CreatedAt: styled.p`
    font-size: 11px;
    font-weight: 600;
    margin-top: 4px;
    color: #b0b0b0;
  `,

  Nickname: styled.p<IComment>`
    font-weight: 700;
    font-size: 15px;
    color: ${({ is_deleted, avatar_id }) => {
      if (is_deleted) return '#666';
      if (avatar_id === 0) return '#18A0FB';
      return 'black';
    }};
  `,

  LikeCount: styled(LikeCount)``,

  EditContent: styled.div`
    margin: 20px 0;
  `,

  CustomTextarea: styled(CustomTextarea)`
    margin: 0 0 12px 0;
  `,

  EditCancelBtn: styled(SubmitButton)`
    background-color: #white;
    border: 1px solid #888;
    color: #888;
    margin-right: 8px;
  `,
  EditSubmitBtn: styled(SubmitButton)`
    background-color: black;
  `,

  Content: styled.span<IComment>`
    font-size: 0.9rem;
    padding: 14px 0;
    /* border-bottom: solid 1.4px #e9ecef; */
    line-height: 1.5;
    word-break: break-all;
    white-space: pre-line;

    font-style: ${({ is_deleted }) => is_deleted && 'italic'};
    color: ${({ is_deleted }) => is_deleted && `#666`};
  `,

  ROW3: styled.div`
    margin-bottom: 20px;
  `,

  ReplySubmitBtn: styled(SubmitButton)`
    background-color: black;
  `,
  ReplyCancleBtn: styled(SubmitButton)`
    background-color: white;
    border: 1px solid #888;
    color: #888;
    margin-right: 8px;
  `,
};

interface IComment {
  is_deleted: boolean;
  avatar_id?: number;
}

export default S;
