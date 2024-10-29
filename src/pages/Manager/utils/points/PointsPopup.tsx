import { Student } from '@/pages/Manager/utils/types/Student';

interface PointsPopupProps {
  isOpen: boolean;
  student: Student | null;
  onClose: () => void;
  onAddReward: () => void;
  onAddPenalty: () => void;
}

function PointsPopup({
  isOpen,
  student,
  onClose,
  onAddReward,
  onAddPenalty,
}: PointsPopupProps) {
  if (!isOpen || !student) return null;

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-1/3'>
        <h2 className='text-xl font-semibold mb-4'>학생 정보</h2>
        <p>
          <strong>이름:</strong> {student.name}
        </p>
        <p>
          <strong>나이:</strong> {student.age}
        </p>
        <p>
          <strong>학교:</strong> {student.school}
        </p>
        <p>
          <strong>상점:</strong> {student.rewardPoints}
        </p>
        <p>
          <strong>벌점:</strong> {student.penaltyPoints}
        </p>
        <p>
          <strong>총점:</strong> {student.rewardPoints - student.penaltyPoints}
        </p>
        <div className='flex gap-4 mt-4'>
          <button
            onClick={onAddReward}
            className='bg-green text-white p-2 rounded hover:bg-green transition-colors'
          >
            상점 주기
          </button>
          <button
            onClick={onAddPenalty}
            className='bg-red text-white p-2 rounded hover:bg-red transition-colors'
          >
            벌점 주기
          </button>
        </div>
        <button
          onClick={onClose}
          className='mt-4 bg-gray-500 text-white p-2 rounded w-full hover:bg-gray-600 transition-colors'
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export default PointsPopup;
