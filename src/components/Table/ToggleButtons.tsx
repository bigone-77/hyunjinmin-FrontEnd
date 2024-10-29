import { ToggleButtonsProps } from '@/components/Table/Utils/TimeTableIF';

function ToggleButtons({ isWeekend, setIsWeekend }: ToggleButtonsProps) {
  return (
    <div className='mb-1 flex mt-5 bg-gray-300 rounded-xl p-1 relative'>
      <div
        style={{
          backgroundColor: '#4739af',
          transform: isWeekend ? 'translateX(100%)' : 'translateX(0)',
          transition: 'transform 0.3s ease-in-out',
        }}
        className='absolute top-0 left-0 h-full w-1/2 rounded-xl'
      />
      <button
        style={{ color: !isWeekend ? '#ffffff' : '#000000' }}
        className='w-1/2 px-4 py-2 relative z-8'
        onClick={() => setIsWeekend(false)}
      >
        평일
      </button>
      <button
        style={{ color: isWeekend ? '#ffffff' : '#000000' }}
        className='w-1/2 px-4 py-2 relative z-8'
        onClick={() => setIsWeekend(true)}
      >
        주말
      </button>
    </div>
  );
}

export default ToggleButtons;
