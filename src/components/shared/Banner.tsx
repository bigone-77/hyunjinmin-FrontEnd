import { IoArrowForwardCircleOutline } from 'react-icons/io5';

import { flexCenter } from '@/styles/flex';

function Banner() {
  return (
    <article className='px-4 py-8 text-white bg-primary'>
      <h1>안녕하세요</h1>
      <div className='flex items-center gap-x-2'>
        <h2 className='text-2xl font-semibold drop-shadow-2xl'>홍길동님!</h2>
        <p
          className={`${flexCenter} px-4 pt-[2px] rounded-[23px] border bg-white text-black text-sm shadow-inner`}
        >
          학생
        </p>
      </div>
      <div className='flex items-center my-3 gap-x-4'>
        <p>월, 수, 금 반</p>|<div className='px-2'>상점: 15점</div>|
        <p>벌점: 5점</p>
      </div>
      <span className='flex items-center gap-x-1'>
        <p className='text-sm'>마이페이지로 가기</p>
        <IoArrowForwardCircleOutline size={25} />
      </span>
    </article>
  );
}

export default Banner;
