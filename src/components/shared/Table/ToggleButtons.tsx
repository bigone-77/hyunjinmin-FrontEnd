interface ToggleButtonsProps {
  isWeekend: boolean;
  setIsWeekend: (value: boolean) => void;
}

const ToggleButtons = ({ isWeekend, setIsWeekend }: ToggleButtonsProps) => {
  return (
    <div className='mb-1 flex'>
      <button
        className={`w-1/2 px-4 py-2 ${!isWeekend ? 'bg-blue text-white rounded' : 'bg-gray-200 text-black rounded'}`}
        onClick={() => setIsWeekend(false)}
      >
        평일
      </button>
      <button
        className={`w-1/2 px-4 py-2 ${isWeekend ? 'bg-blue text-white rounded' : 'bg-gray-200 text-black rounded'}`}
        onClick={() => setIsWeekend(true)}
      >
        주말
      </button>
    </div>
  );
};

export default ToggleButtons;
