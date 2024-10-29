interface BoardToggleButtonsProps {
  isNotice: boolean;
  setIsNotice: (value: boolean) => void;
}

const ToggleButtons = ({ isNotice, setIsNotice }: BoardToggleButtonsProps) => {
  return (
    <div className='mb-2 flex'>
      <button
        className={`w-1/2 px-4 py-2 ${isNotice ? 'bg-blue text-white rounded' : 'bg-gray-200 text-black rounded'}`}
        onClick={() => setIsNotice(true)}
      >
        공지게시판
      </button>

      <button
        className={`w-1/2 px-4 py-2 ${!isNotice ? 'bg-blue text-white rounded' : 'bg-gray-200 text-black rounded'}`}
        onClick={() => setIsNotice(false)}
      >
        자유게시판
      </button>
    </div>
  );
};

export default ToggleButtons;
