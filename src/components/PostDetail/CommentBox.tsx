import React from 'react';
import styled from 'styled-components';
import { SuitHeart } from '@styled-icons/bootstrap';
import { MOCK_COMMENT_LIST } from 'assets/mockData';

interface Props {}

const CommentBox = (props: Props) => {
  return (
    <Wrapper>
      <CommentWrite placeholder='댓글을 입력해주세요.' />
      <SubmitBtn>등록하기</SubmitBtn>
      <CommentList>
        {MOCK_COMMENT_LIST.map(({ user_id, avatar_img, content, like_count }) => (
          <Comment>
            <ROW1>
              <COL1>
                <Avatar src={avatar_img} />
              </COL1>
              <COL2>
                <Nickname>{user_id}</Nickname>
                <CreatedAt>{new Date().toLocaleDateString()}</CreatedAt>
              </COL2>
              <COL3>
                <LikeButton />
                <LikeCount>{like_count}</LikeCount>
              </COL3>
            </ROW1>
            <ROW2>
              <Content>{content}</Content>
            </ROW2>
          </Comment>
        ))}
      </CommentList>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Button = styled.button`
  font-family: 'Spoqa Medium';
  font-size: 1em;
  padding: 12px;
  border: 0.3px solid #eee;
  border-radius: 4px;
`;

const CommentWrite = styled.textarea`
  font-family: 'Spoqa Regular';
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

const CommentList = styled.ul``;
const Comment = styled.li`
  margin-bottom: 48px;
`;

const ROW1 = styled.div`
  display: flex;
  width: 100%;
  gap: 4px;
`;
const ROW2 = styled.div``;

const COL1 = styled.div``;
const COL2 = styled.div`
  display: flex;
  flex-direction: column;
`;
const COL3 = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
  gap: 8px;
`;
const Avatar = styled.img`
  width: 32px;
`;
const CreatedAt = styled.p`
  color: gray;
`;
const Nickname = styled.p`
  font-family: 'Spoqa Bold';
  font-size: 20px;
`;
const Content = styled.div`
  font-size: 20px;
  padding: 20px 0 40px;
  border-bottom: solid 2px #e9ecef;
`;
const LikeButton = styled(SuitHeart)`
  width: 24px;
  color: red;
  cursor: pointer;
`;
const LikeCount = styled.div``;

export default CommentBox;
