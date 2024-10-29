import Header from '@/pages/Manager/utils/Header';
import Lnb from '@/pages/Manager/utils/Lnb';

function AcceiptingPage() {
  return (
    <div className='w-full h-screen flex flex-col'>
      <Header />
      <Lnb />
      <div className='p-6 flex-1 bg-gray-100'>
        {/* 페이지 내용 추가 */}
        <h1>가입 승인을 하는 페이지</h1>
      </div>
    </div>
  );
}

export default AcceiptingPage;
