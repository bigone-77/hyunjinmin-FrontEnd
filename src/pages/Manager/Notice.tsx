import { useState } from 'react';
import Header from '@/pages/Manager/utils/Header';
import Lnb from '@/pages/Manager/utils/Lnb';
import NoticeList from '@/pages/Manager/utils/noticeAdd/NoticeList';
import NoticeSearchBar from '@/pages/Manager/utils/noticeAdd/NoticeSearchBar';
import { useFetchNotices } from './utils/noticeAdd/hooks/useFetchNotices';

function NoticePage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { notices, isLoading, error, refetch } = useFetchNotices(searchTerm);

  const handleSearch = () => {
    refetch(); // 검색어를 기반으로 다시 공지사항 목록 로드
  };

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
        {isLoading && <p>Loading...</p>}
        {error && <p className='text-red-500'>{error}</p>}
        <NoticeList notices={notices} refetch={refetch} />
      </div>
    </div>
  );
}

export default NoticePage;
