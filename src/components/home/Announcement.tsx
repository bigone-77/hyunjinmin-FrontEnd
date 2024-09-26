import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { truncate } from '@/utils/truncate';

function Announcement() {
  const DUMMY_NOTICES = [
    {
      id: 'n1',
      title: '추석 연휴 학원 휴무 안내',
      author: '관리자',
      content:
        '안녕하세요, 추석 연휴로 인해 9월 28일부터 10월 2일까지 휴무입니다. 수업에 참고하시기 바랍니다.',
      date: '2024-09-20',
    },
    {
      id: 'n2',
      title: '9월 모의고사 일정 안내',
      author: '학원장',
      content:
        '9월 모의고사는 9월 15일 오전 9시에 진행됩니다. 시험 범위는 1학기 전 과목입니다. 학생들은 시간을 엄수하여 참석 바랍니다.',
      date: '2024-09-10',
    },
    {
      id: 'n3',
      title: '신규 강좌 개설 안내',
      author: '수강관리팀',
      content:
        '10월부터 신규 강좌인 "고급 수학 문제 풀이" 강좌가 개설됩니다. 수강 신청은 9월 25일부터 가능합니다.',
      date: '2024-09-05',
    },
  ];

  return (
    <div className='p-4'>
      <Swiper
        spaceBetween={16}
        slidesPerView={1} // 기본값: 1개
        breakpoints={{
          362: {
            slidesPerView: 2, // 화면 너비가 350px 이상일 때 슬라이드 2개 보여줌
          },
        }}
        className='w-full'
      >
        {DUMMY_NOTICES.map((notice) => (
          <SwiperSlide key={notice.id} className='flex-shrink-0 w-full'>
            <article className='p-4 text-white rounded-lg shadow-md bg-sub'>
              <h3 className='text-lg font-semibold'>{notice.title}</h3>
              <p className='text-sm text-grey50'>{notice.date}</p>
              <p className='mt-2 text-sm'>{truncate(notice.content, 20)}</p>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Announcement;
