import { useParams, useNavigate } from 'react-router-dom';
import { useNotice } from '@/components/Board/hooks/useNotice';

function PostPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const accessToken = localStorage.getItem('accessToken');

  const { data: notices = [] } = useNotice(accessToken);

  if (!id) {
    return <div>잘못된 게시물 ID입니다.</div>;
  }

  const notice = notices.find((notice) => notice.id === parseInt(id));

  if (!notice) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>{notice.noticeTitle}</h1>
      <div className='text-gray-500 mb-2'>작성자: 관리쌤</div>
      <div className='text-gray-500 mb-4'>작성일: {notice.noticeDate}</div>
      <p className='text-gray-700'>{notice.noticeContents}</p>

      <div className='flex justify-end'>
        <button
          onClick={() => navigate(-1)}
          className='mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700'
        >
          뒤로가기
        </button>
      </div>
    </div>
  );
}

export default PostPage;
