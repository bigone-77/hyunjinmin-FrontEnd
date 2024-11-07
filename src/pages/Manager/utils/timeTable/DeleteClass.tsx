import { useState } from 'react';
import axios from 'axios';

interface DeleteClassProps {
  onDeleteSuccess: () => void; // 삭제 성공 시 호출될 콜백 함수
}

function DeleteClassForm({ onDeleteSuccess }: DeleteClassProps) {
  const [classSeq, setClassSeq] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await axios.post(
        'http://localhost:8080/systemMng/admin/classMng/deleteClass',
        {
          CLASS_SEQ: classSeq,
        },
        {
          headers: {
            Authorization: `${accessToken}`, //localStrage에 저장된 JWT accessToken사용
          },
        },
      );

      if (response.data.status === 'success') {
        setMessage(response.data.msg || '성공적으로 삭제되었습니다.');
        setClassSeq(''); // 입력 필드 초기화
        onDeleteSuccess(); // 삭제 성공 시 부모 컴포넌트에서 처리
      } else {
        setMessage(response.data.msg || '삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('서버 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>강의 삭제</h2>
      <div className='flex flex-col gap-4 items-start'>
        <input
          type='text'
          placeholder='삭제할 강의 번호'
          className='border p-2 rounded w-full'
          value={classSeq}
          onChange={(e) => setClassSeq(e.target.value)}
        />
        <button
          className='bg-red text-white p-2 rounded mt-2 w-full'
          onClick={handleDelete}
        >
          삭제
        </button>
        {message && <p className='text-red mt-2'>{message}</p>}
      </div>
    </div>
  );
}

export default DeleteClassForm;
