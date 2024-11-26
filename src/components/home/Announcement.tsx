import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import 'swiper/css';

import { truncate } from '@/utils/truncate';
import { noticeDeatil } from '@/pages/Home/HomeInter';
function Announcement({ notices }: { notices: noticeDeatil[] | null }) {
  if (!notices || notices.length === 0) {
    return <p className='text-center text-grey50'>공지사항이 없습니다.</p>;
  }

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
        {notices.map((notice) => (
          <SwiperSlide key={notice.id} className='flex-shrink-0 w-full'>
            <Link to={`/post/${notice.id}`}>
              <article className='p-4 text-white rounded-lg shadow-md bg-sub'>
                <h3 className='text-lg font-semibold'>{notice.noticeTitle}</h3>
                <p className='text-sm text-grey50'>{notice.noticeDate}</p>
                <p className='mt-2 text-sm'>
                  {truncate(notice.noticeContents, 20)}
                </p>
              </article>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Announcement;
