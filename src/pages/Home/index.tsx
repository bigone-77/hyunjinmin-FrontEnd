import Accordion from '@/components/home/Accordion';
import Announcement from '@/components/home/Announcement';

import ClassCard from '@/components/shared/ClassCard';
import Spacing from '@/components/shared/Spacing';

const DUMMY_CLASSES = [
  {
    id: 'e1',
    title: '수학의 정석',
    teacher: '정승제',
    room: '316호',
    startTime: '10:20',
    endTime: '12:00',
    color: '#41A3FE',
  },
  {
    id: 'e2',
    title: '소프트웨어적사고',
    teacher: '노정규',
    room: '103호',
    startTime: '15:30',
    endTime: '17:10',
    color: '#5DAD6E',
  },
];

function HomePage() {
  return (
    <div className='pb-20 overflow-hidden'>
      <Spacing size={20} />

      <Accordion
        name='신태일'
        school='대진고등학교'
        classDay='월,수,금'
        totalPoints={-3}
      />

      <Spacing size={20} />

      <p className='text-xl font-bold text-secondary'>📢 학원 공지사항</p>
      <Spacing size={8} />
      <Announcement />

      <Spacing size={20} />

      <p className='text-xl font-bold text-secondary'>🗓️ 수강중인 수업</p>
      <Spacing size={8} />
      <section className='p-6 border rounded-2xl border-grey50'>
        {DUMMY_CLASSES.map((data, index) => (
          <div key={data.id}>
            <ClassCard
              title={data.title}
              room={data.room}
              teacher={data.teacher}
              startTime={data.startTime}
              endTime={data.endTime}
              bgColor={data.color}
            />
            {index !== DUMMY_CLASSES.length - 1 && (
              <hr className='h-[1px] my-2' />
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

export default HomePage;
