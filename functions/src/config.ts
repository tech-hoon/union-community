interface IResidentAuthMsg {
  name: string;
  uid: string;
  email: string;
  resident_auth_image: string;
}

interface IReportedUserMsg {
  id: string;
  type: string;
  content: string;

  reporter: {
    uid: string;
    nickname: string;
    name: string;
  };
  reportee: {
    uid: string;
    nickname: string;
    name: string;
  };
}

export const RESIDENT_AUTH_MSG = ({ name, uid, email, resident_auth_image }: IResidentAuthMsg) => ({
  blocks: [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: '💡 새로운 사용자가 등록되었습니다.',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*이름:*\n${name}\n*아이디:*\n${uid}\n*이메일:*\n${email}\n*Firebase*:\nhttps://console.firebase.google.com/u/0/project/univ-dorm-community/firestore/data/~2Fusers~2F${uid}\n*인증 사진*:${resident_auth_image}\n`,
      },
      accessory: {
        type: 'image',
        image_url: resident_auth_image,
        alt_text: 'resident_auth_image',
      },
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: '거절하기',
          },
          style: 'danger',
          value: 'reject',
        },
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: '동의하기',
          },
          style: 'primary',
          value: 'approve',
        },
      ],
    },
  ],
});

export const REPORTED_USER_MSG = ({
  id,
  type,
  content,

  reporter,
  reportee,
}: IReportedUserMsg) => ({
  blocks: [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: '🚨 신고가 접수되었습니다.',
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '_Reportee_',
      },
    },
    {
      type: 'section',
      fields: [
        {
          text: {
            type: 'mrkdwn',
            text: `*이름:*\n${reportee.name}`,
          },
        },
        {
          text: {
            type: 'mrkdwn',
            text: `*닉네임:*\n${reportee.nickname}`,
          },
        },
        {
          text: {
            type: 'mrkdwn',
            text: `*UID:*\n${reportee.uid}`,
          },
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '_Report Content_',
      },
    },
    {
      type: 'section',
      fields: [
        {
          text: {
            type: 'mrkdwn',
            text: `*신고 유형:*\n${type}`,
          },
        },
        {
          text: {
            type: 'mrkdwn',
            text: `*신고 내용:*\n${content}`,
          },
        },
      ],
    },

    {
      type: 'divider',
    },

    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '_Reporter_',
      },
    },
    {
      type: 'section',
      fields: [
        {
          text: {
            type: 'mrkdwn',
            text: `*이름:*\n${reporter.name}`,
          },
        },
        {
          text: {
            type: 'mrkdwn',
            text: `*닉네임:*\n${reporter.nickname}`,
          },
        },
        {
          text: {
            type: 'mrkdwn',
            text: `*UID:*\n${reporter.uid}`,
          },
        },
      ],
    },
    {
      type: 'divider',
    },
  ],
});
