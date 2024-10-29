import { useState } from 'react';

function NewClassForm() {
  const [color, setColor] = useState('#000000');
  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>새 강의 추가</h2>
      <div className='flex flex-col gap-4 items-start'>
        <input
          type='text'
          placeholder='과목 입력'
          className='border p-2 rounded w-full'
        />
        <input
          type='text'
          placeholder='강의명 입력'
          className='border p-2 rounded w-full'
        />
        <input
          type='text'
          placeholder='시작시간 입력 (예: 09:00-10:00)'
          className='border p-2 rounded w-full'
        />
        <input
          type='text'
          placeholder='종료시간 입력 (예: 09:00-10:00)'
          className='border p-2 rounded w-full'
        />
        <input
          type='text'
          placeholder='강의실 번호'
          className='border p-2 rounded w-full'
        />
        <input
          type='text'
          placeholder='요일 입력 (예: 월, 화)'
          className='border p-2 rounded w-full'
        />
        <input
          type='text'
          placeholder='가격'
          className='border p-2 rounded w-full'
        />
        {/* 색상 입력 필드 */}
        <div className='flex items-center gap-4 w-full'>
          <label className='w-1/3 text-sm font-semibold'>색 선택:</label>
          <input
            type='color'
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className='border p-2 rounded w-1/3'
          />
          <div
            className='w-8 h-8 rounded-full'
            style={{ backgroundColor: color }}
          ></div>
        </div>
        <button className='bg-blue text-white p-2 rounded mt-2 w-full'>
          새 강의 추가
        </button>
      </div>
    </div>
  );
}

export default NewClassForm;
