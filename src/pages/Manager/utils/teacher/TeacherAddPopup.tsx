import { useState } from 'react';
import { useInsertTeacher } from './hooks/useInsertTeacher';
import { classGBMap } from '@/utils/getCode';

interface TeacherAddPopupProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}

function TeacherAddPopup({ isOpen, onClose, refetch }: TeacherAddPopupProps) {
  const [teacherName, setTeacherName] = useState('');
  const [subject, setSubject] = useState('');
  const { insertTeacher, isLoading, message } = useInsertTeacher();

  const handleAddTeacher = async () => {
    const subjectCode = classGBMap[subject]; // 과목을 코드로 변환
    if (!subjectCode) {
      alert('유효한 과목을 선택하세요.');
      return;
    }
    await insertTeacher(teacherName, subjectCode, () => {
      refetch(); // 선생님 추가 후 refetch 호출
      onClose(); // 팝업 닫기
    });
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-1/3'>
        <h2 className='text-xl font-semibold mb-4'>새로운 선생님 추가</h2>
        <input
          type='text'
          placeholder='선생님 이름'
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
          className='border p-2 mt-5 rounded w-full'
        />
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className='border p-2 mt-5 rounded w-full mb-5 '
        >
          <option value=''>과목을 선택해 주세요</option>
          {Object.keys(classGBMap).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddTeacher}
          className='bg-positive text-white p-2 rounded w-full hover:bg-positive-hover btn-shadow'
          disabled={isLoading}
        >
          {isLoading ? '추가 중...' : '선생님 추가 추가'}
        </button>
        {message && <p className='text-red mt-2'>{message}</p>}
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

export default TeacherAddPopup;
