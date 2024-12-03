import axiosInstance from '@/pages/Manager/hooks/useManagerPointAxios';

export const useManagePoints = () => {
  const addReward = async (studentId: string, rewardScore: number) => {
    try {
      const response = await axiosInstance.post('/addPoint', {
        USER_ID: studentId,
        SCORE_GB: '상점',
        SCORE: rewardScore,
      });

      if (response.data.status === 'success') {
        alert('상점이 성공적으로 추가되었습니다.');
        window.location.reload();
      } else {
        handleError(response.data.msg);
      }
    } catch (error) {
      console.error('Error adding reward points:', error);
      alert('상점 추가 중 오류가 발생했습니다.');
    }
  };

  const addPenalty = async (studentId: string, penaltyScore: number) => {
    try {
      const response = await axiosInstance.post('/addPoint', {
        USER_ID: studentId,
        SCORE_GB: '벌점',
        SCORE: penaltyScore,
      });

      if (response.data.status === 'success') {
        alert('벌점이 성공적으로 추가되었습니다.');
        window.location.reload();
      } else {
        handleError(response.data.msg);
      }
    } catch (error) {
      console.error('Error adding penalty points:', error);
      alert('벌점 추가 중 오류가 발생했습니다.');
    }
  };

  const handleError = (msg: string) => {
    if (msg === '유효하지 않은 토큰입니다') {
      alert('다시 로그인을 해주세요.');
      window.location.href = '/manager/auth/admin-login';
    } else {
      alert(msg || '점수 추가에 실패했습니다.');
    }
  };

  return { addReward, addPenalty };
};
