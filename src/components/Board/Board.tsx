import { Link } from 'react-router-dom';

import { useNotice } from '@/components/Board/hooks/useNotice';

function BoardPage() {
  const accessToken = localStorage.getItem('accessToken');

  const { data: notices = [] } = useNotice(accessToken);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4 text-center'>공지사항</h1>
      {/* 게시물 목록 */}
      <div className='space-y-4 h-[58vh] overflow-y-auto'>
        {notices.map((notice) => (
          <Link to={`/post/${notice.id}`} key={notice.id}>
            <div className='bg-gray-100 shadow-md rounded-lg p-4 cursor-pointer mb-4'>
              <div className='flex justify-between mb-4'>
                <h2 className='text-lg font-bold'>
                  {notice.noticeTitle.length > 15
                    ? `${notice.noticeTitle.substring(0, 15)}...`
                    : notice.noticeTitle}
                </h2>
              </div>
              <p className='text-gray-700 mt-2'>
                {notice.noticeContents.length > 15
                  ? `${notice.noticeContents.substring(0, 15)}...`
                  : notice.noticeContents}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BoardPage;
