import axiosInstance from '../../../hooks/useManagerAxios';

export const useApproveUser = () => {
  const approveUser = async (userId: string, onClose: () => void) => {
    try {
      const response = await axiosInstance.post('/aprovUserInfo', {
        USER_ID: userId,
      });

      if (response.data.status === 'success') {
        alert('승인이 완료되었습니다');
        window.location.reload();
        onClose();
      } else {
        if (response.data.msg === '유효하지 않은 토큰입니다') {
          alert('다시 로그인을 해주세요.');
          window.location.href = '/manager/auth/admin-login';
        } else {
          alert(response.data.msg || '권한 승인에 실패했습니다.');
        }
      }
    } catch (error) {
      console.error('Error approving user:', error);
      alert('승인 중 오류가 발생했습니다.');
    }
  };

  return approveUser;
};
