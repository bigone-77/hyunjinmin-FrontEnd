import axiosInstance from '../../../hooks/useManagerAxios';

export const useUnApproveUser = () => {
  const unApproveUser = async (studentId: string, onClose: () => void) => {
    try {
      const response = await axiosInstance.post('/unAprovUserInfo', {
        USER_ID: studentId,
      });

      if (response.data.status === 'success') {
        alert('권한을 성공적으로 회수했습니다.');
        window.location.reload();
        onClose();
      } else {
        //JWT토큰 만료
        if (response.data.msg === '유효하지 않은 토큰입니다') {
          alert('다시 로그인을 해주세요.');
          window.location.href = '/manager/auth/admin-login';
        }
        alert(response.data.msg || '회수에 실패했습니다.');
      }
    } catch (error) {
      alert('권한 회수 중 오류가 발생했습니다.');
    }
  };

  return unApproveUser;
};
