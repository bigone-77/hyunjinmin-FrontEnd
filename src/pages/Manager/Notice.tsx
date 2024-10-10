import Header from '@/pages/Manager/utils/Header';
import Lnb from '@/pages/Manager/utils/Lnb';

function NoticePage() {
  return (
    <div className='w-full h-screen flex flex-col'>
      <Header />
      <Lnb />
      <div className='mt-4 p-6 flex-1 bg-gray-100'>
        {/* 페이지 내용 추가 */}
        <h1>Notice</h1>
      </div>
    </div>
  );
}

export default NoticePage;
