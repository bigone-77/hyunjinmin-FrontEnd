import { useState } from 'react';
import axiosInstance from '../../../hooks/useManagerClassAxios';

export const useDeleteClass = () => {
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);

  const deleteClass = async (
    classSeq: number,
    onClose: () => void,
    refetch: () => void,
  ) => {
    setDeleteMessage(null);

    try {
      const response = await axiosInstance.post('/deleteClass', {
        CLASS_SEQ: classSeq,
      });

      if (response.data.status === 'success') {
        alert('성공적으로 삭제되었습니다.');
        onClose();
        refetch();
      } else {
        setDeleteMessage(response.data.msg || '삭제 중 오류가 발생했습니다.');
      }
    } catch (err) {
      console.error('Error deleting class:', err);
      setDeleteMessage('서버 요청 중 오류가 발생했습니다.');
    }
  };

  return { deleteClass, deleteMessage };
};
