interface PopUpProps {
  classInfo: any;
  onClose: () => void;
}

const PopUp = ({ classInfo, onClose }: PopUpProps) => {
  if (!classInfo) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-4 rounded shadow-lg w-80'>
        <h2 className='text-xl font-bold mb-4'>{classInfo.title}</h2>
        <p>
          <strong>강의실:</strong> {classInfo.place}
        </p>
        <p>
          <strong>시작 시간:</strong> {Math.floor(classInfo.startTime)}시{' '}
          {classInfo.startTime % 1 === 0.5 ? '30분' : ''}
        </p>
        <p>
          <strong>소요 시간:</strong> {classInfo.duration}시간
        </p>
        <button
          className='mt-4 border border-black text-black px-4 py-2 rounded'
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default PopUp;
