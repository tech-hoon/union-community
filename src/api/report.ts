import { dbService, firebaseApp } from 'service/firebase';
import { ReportType } from 'types';

export const reportUser = async ({ reportee, reporter, type, content, created_at }: ReportType) => {
  const report = {
    type,
    created_at,
    content,

    reportee: {
      uid: reportee.uid,
      name: reportee.name,
      nickname: reportee.nickname,
    },

    reporter: {
      uid: reporter.uid,
      name: reporter.name,
      nickname: reporter.nickname,
    },
  };

  try {
    await dbService.collection('reports').add(report);
  } catch (error) {
    console.error(error);
  }
};
