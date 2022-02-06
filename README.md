![main-logo.png](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/94f0fa83-7dbb-4294-b7f8-dd15a4d7c641/OG.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220201T171951Z&X-Amz-Expires=86400&X-Amz-Signature=ad41b7ab65589c27ea05a92c4806e1dcbb5130e429568f2479351391fdaa1c75&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22OG.png%22&x-id=GetObject)

# 개요

> 거주하고 있는 기숙사에서, 기숙사생 간에 자유롭게 소통할 수단이 없다는 문제를 해결하기 위해서 기숙사생 전용 커뮤니티를 기획하였다.

- 개발 인원: 1인(기획, 디자인, 개발, 배포 총괄)
- 개발 기간: 2021.09 ~ 2021.12
- 운영 기간 : 2021. 12 ~ 운영중

# 주요 기능

- 게시판 기본 CRUD

  - 무한 스크롤
  - 게시물, 댓글, 대댓글, 메시지, 좋아요 CRUD

- 실시간 메시지, 알림

  - `firebase-functions` db trigger

- 모바일/PC 반응형 스타일링

- 가입 인증 절차 자동화

  - `Slack Webhook API`

# 설계

## 개발 환경

- Frontend

  - React
  - TypeScript
  - Recoil
  - styled-components

- Backend

  - firebase
  - firestore-functions

- Etc

  - Slack Webhook API
  - figma

## 아키텍처 설계

![architecture-design](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ebaa2463-9c8f-4903-aae8-60cbcaf70338/Frame_1_%281%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220201T172052Z&X-Amz-Expires=86400&X-Amz-Signature=ce5a4b6514aea33a9f5362a66a956acf7c094e01080dd2b29f00ad38e36f2fe6&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Frame%25201%2520%281%29.png%22&x-id=GetObject)

## 디자인 설계

![figma.img](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9cbc60e8-1a10-46f5-8442-1e44bce5c0d0/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220201T172257Z&X-Amz-Expires=86400&X-Amz-Signature=4662ed44a700b3a238f0fb1b53946ede274db46d77e6c183c615ad5bf61629fc&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject)

## 기능 명세

- [x] 무한 스크롤 및 커뮤니티 기본 CRUD
- [x] Slack과 연동하여 회원가입 인증 처리 자동화
- [x] 마이페이지(나의 글, 나의 좋아요 등)
- [x] 댓글, 대댓글 DB Schema 및 API 설계
- [x] 메시지 송/수신 DB Schema 및 API 설계
- [x] 댓글 및 메시지 수신시 알림
- [x] Slack과 연동하여 사용자 신고 알림 기능
- [x] PWA 적용
- [ ] 디자인팀과 리디자인 - 2022.02~03
- [ ] 댓글 및 메시지 수신시 알림(PWA Notification) - 2022.02~03
- [ ] 장터/나눔 게시판 구현 - 2022.02~03

### 데이터베이스 설계

(작성중)

# 구현

## 구현 기능

(작성중)

## 데모

(작성중)
