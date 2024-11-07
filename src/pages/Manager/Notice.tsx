// import Header from '@/pages/Manager/utils/Header';
// import Lnb from '@/pages/Manager/utils/Lnb';
// import NoticeList from '@/pages/Manager/utils/noticeAdd/NoticeList';

// function NoticePage() {
//   return (
//     <div className='w-full h-screen flex flex-col'>
//       <Header />
//       <Lnb />
//       <div className='p-6 flex-1 bg-gray-100 rounded-xl'>
//         <h1 className='text-2xl font-bold mb-4'>공지사항 목록</h1>

//         {/* 공지사항 목록 컴포넌트 */}
//         <NoticeList />
//       </div>
//     </div>
//   );
// }

// export default NoticePage;
// NoticePage.tsx
import { useState, useEffect } from 'react';
import Header from '@/pages/Manager/utils/Header';
import Lnb from '@/pages/Manager/utils/Lnb';
import NoticeList from '@/pages/Manager/utils/noticeAdd/NoticeList';
import NoticeSearchBar from '@/pages/Manager/utils/noticeAdd/NoticeSearchBar';
import { fetchNotices, loadNotices } from './utils/noticeAdd/NoticeFunc';
import { Notice } from './utils/noticeAdd/NoticeInter';

function NoticePage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [notices, setNotices] = useState<Notice[]>([]);
  const [, setError] = useState<string | null>(null);

  // Load notices based on the search term
  const handleSearch = () => {
    loadNotices(() => fetchNotices(searchTerm), setNotices, setError);
  };

  useEffect(() => {
    loadNotices(() => fetchNotices(''), setNotices, setError);
  }, []);

  return (
    <div className='w-full h-screen flex flex-col'>
      <Header />
      <Lnb />
      <div className='p-6 flex-1 bg-gray-200 rounded-xl'>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-2xl font-bold'>공지사항 목록</h1>
          <NoticeSearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
          />
        </div>
        <NoticeList notices={notices} setNotices={setNotices} />
      </div>
    </div>
  );
}

export default NoticePage;
