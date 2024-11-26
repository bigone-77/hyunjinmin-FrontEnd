import { useState } from 'react';

interface PayDatePopupProps {
  currentDay: number;
  onClose: () => void;
  onSelectDay: (selectedDay: number) => void;
}

function PayDatePopup({ currentDay, onClose, onSelectDay }: PayDatePopupProps) {
  const [selectedDay, setSelectedDay] = useState<number | ''>(currentDay);

  const handleSave = () => {
    if (selectedDay) {
      onSelectDay(selectedDay);
      // API 요청을 추가하여 변경된 납부일을 서버에 저장할 수 있습니다.
      console.log(`저장된 납부일: ${selectedDay}일`); // 예시: API 호출 코드 작성
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-[300px]'>
        <h3 className='text-xl font-semibold mb-4 text-center'>
          원비 납부일 변경
        </h3>
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(Number(e.target.value))}
          className='w-full p-2 border rounded'
        >
          <option value=''>날짜 선택</option>
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
            <option key={day} value={day}>
              {day}일
            </option>
          ))}
        </select>
        <div className='flex justify-end mt-4 gap-2'>
          <button
            onClick={handleSave}
            className='px-4 py-2 bg-positive text-white rounded hover:bg-positive-hover btn-shadow'
          >
            변경 저장
          </button>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-close text-white rounded hover:bg-close-hover btn-shadow'
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default PayDatePopup;
