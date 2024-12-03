import Accordion from '@/components/home/Accordion';
import Announcement from '@/components/home/Announcement';

import ClassCard from '@/components/shared/ClassCard';
import Spacing from '@/components/shared/Spacing';

import { useUserTotalInfo } from '@/components/home/hooks/useUserTotalInfo';
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/atoms/user';

function HomePage() {
  // Recoil에서 userId 가져오기
  const { userId } = useRecoilValue(userState);

  // LocalStorage에서 accessToken 가져오기
  const accessToken = localStorage.getItem('accessToken');

  type ClassItem = {
    id: number; // CLASS_SEQ
    room: string; //ROOM_IDX
    title: string; // CLASS_NAME
    teacher: string; // TEACHER_NM
    startTime: string; // 변환된 START_TIME
    endTime: string; // 변환된 END_TIME
    bgColor: string; // CLASS_COLOR
  };

  const {
    data: userMainInfo,
    isLoading,
    error,
  } = useUserTotalInfo(userId, accessToken);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className='pb-20 overflow-hidden'>
      <Spacing size={20} />

      <Accordion
        name={userMainInfo?.name || '에러'}
        school={userMainInfo?.schoolName || '에러'}
        totalPoints={userMainInfo?.totalPoints || 0}
      />

      <Spacing size={20} />

      <p className='text-xl font-bold text-secondary'>📢 학원 공지사항</p>
      <Spacing size={8} />
      <Announcement notices={userMainInfo?.notices} />

      <Spacing size={20} />

      <p className='text-xl font-bold text-secondary'>🗓️ 오늘 수업</p>
      <Spacing size={8} />
      <section className='p-6 border rounded-2xl border-grey50'>
        {userMainInfo?.classes && userMainInfo?.classes.length > 0 ? (
          userMainInfo?.classes.map((data: ClassItem, index: number) => (
            <div key={data.id}>
              <ClassCard
                title={data.title || '제목 없음'}
                room={`Room ${String(data.room)}`}
                teacher={data.teacher || '강사 미정'}
                startTime={data.startTime || '시간 미정'}
                endTime={data.endTime || '시간 미정'}
                bgColor={data.bgColor || '#ccc'}
              />
              {index !== userMainInfo?.classes.length - 1 && (
                <hr className='h-[1px] my-2' />
              )}
            </div>
          ))
        ) : (
          <p className='text-center text-gray-500'>
            🍀 오늘은 수업이 없습니다.
          </p>
        )}
      </section>
    </div>
  );
}

export default HomePage;
