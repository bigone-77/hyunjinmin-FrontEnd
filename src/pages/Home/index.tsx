import Spacing from '@/components/shared/Spacing';
import Banner from '@/components/shared/Banner';
import Button from '@/components/shared/Button';
import TimeTable from '@/components/shared/TimeTable';

function HomePage() {
  return (
    <div className='pb-6 overflow-hidden'>
      <Banner />
      <main className='px-4 pt-6'>
        <Button.Group>
          <Button theme='secondary' onClick={() => {}} isGroup>
            공지사항
          </Button>
          <Button theme='secondary' onClick={() => {}} isGroup>
            게시판
          </Button>
        </Button.Group>

        <Spacing size={20} />

        <TimeTable />

        <Spacing size={20} />

        <Button.Group>
          <Button theme='sub' onClick={() => {}} isGroup>
            수업 목록 검색
          </Button>
          <Button theme='sub' onClick={() => {}} isGroup>
            직접 추가
          </Button>
        </Button.Group>
      </main>
    </div>
  );
}

export default HomePage;
