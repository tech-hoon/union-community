import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { dbService } from 'service/firebase';
import { postHasUpdatedState } from 'store/newPosts';

interface Props {
  fetchPosts: () => void;
  fetchUserData: () => void;
}

const useHasNewPosts = ({ fetchPosts, fetchUserData }: Props) => {
  const history = useHistory();
  const historyState = history.location.state;

  const [postHasUpdated, setPostHasUpdated] = useRecoilState(postHasUpdatedState);

  useEffect(() => {
    const unsubscribe = dbService.collection('posts').onSnapshot((snapshot) => {
      // 프로필 변경일 경우, fetch만
      if (historyState === 'profileUpdated') {
        setPostHasUpdated(false);
        fetchUserData();
        fetchPosts();
        history.replace({ state: '' });
        return;
      }

      // 글 등록,수정,삭제일 경우, fetch만
      if (historyState) {
        fetchPosts();
        setPostHasUpdated(false);
        fetchPosts();
        history.replace({ state: '' });
        return;
      }

      snapshot.docChanges().forEach((change) => {
        if (change.type === 'modified' || change.type === 'removed') {
          setPostHasUpdated(true);
        }
      });
    });

    if (postHasUpdated) {
      unsubscribe();
    }

    return () => unsubscribe();
  }, []);

  return { postHasUpdated, setPostHasUpdated };
};

export default useHasNewPosts;
