import { useState } from 'react';
import { PointsPopupProps } from './PointsInter';
import { useManagePoints } from '@/pages/Manager/utils/points/hooks/useManagePoint';
import Spacing from '@/components/shared/Spacing';

function PointsPopup({ isOpen, student, onClose }: PointsPopupProps) {
  const { addReward, addPenalty } = useManagePoints();
  const [rewardScore, setRewardScore] = useState(1);
  const [penaltyScore, setPenaltyScore] = useState(1);

  if (!isOpen || !student) return null;

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-1/3'>
        <h2 className='text-xl font-semibold mb-4'>학생 정보</h2>
        <p>
          <strong>이름:</strong> {student.name}
        </p>
        <Spacing size={6}></Spacing>
        <p>
          <strong>나이:</strong> {student.age}
        </p>
        <Spacing size={6}></Spacing>
        <p>
          <strong>학교:</strong> {student.school}
        </p>
        <Spacing size={6}></Spacing>
        <p>
          <strong>상점:</strong> {student.rewardPoints}
        </p>
        <Spacing size={6}></Spacing>
        <p>
          <strong>벌점:</strong> {student.penaltyPoints}
        </p>
        <Spacing size={6}></Spacing>
        <p>
          <strong>총점:</strong> {student.totalPoints}
        </p>
        <div className='flex mt-4'>
          <label className='block mb-2'>
            상점 점수:
            <select
              value={rewardScore}
              onChange={(e) => setRewardScore(Number(e.target.value))}
              className='ml-2 p-2 border rounded'
            >
              {[1, 2, 3, 4, 5].map((score) => (
                <option key={`reward-${score}`} value={score}>
                  {score}점
                </option>
              ))}
            </select>
          </label>
          <button
            onClick={() => addReward(student.id, rewardScore)}
            className='ml-2 bg-positive text-white p-2 rounded hover:bg-positive-hover btn-shadow'
          >
            상점 주기
          </button>
        </div>

        <div className='flex mt-4'>
          <label className='block mb-2'>
            벌점 점수:
            <select
              value={penaltyScore}
              onChange={(e) => setPenaltyScore(Number(e.target.value))}
              className='ml-2 p-2 border rounded'
            >
              {[1, 2, 3, 4, 5].map((score) => (
                <option key={`penalty-${score}`} value={score}>
                  {score}점
                </option>
              ))}
            </select>
          </label>
          <button
            onClick={() => addPenalty(student.id, penaltyScore)}
            className='ml-2 bg-negative text-white p-2 rounded hover:bg-negative-hover btn-shadow'
          >
            벌점 주기
          </button>
        </div>

        <button
          onClick={onClose}
          className='mt-4 bg-close text-white p-2 rounded w-full hover:bg-close-hover btn-shadow'
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export default PointsPopup;
