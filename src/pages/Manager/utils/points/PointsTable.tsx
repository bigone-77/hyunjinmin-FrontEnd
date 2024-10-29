import { useState } from 'react';
import { Student } from '@/pages/Manager/utils/types/Student';
import PointsPopup from '@/pages/Manager/utils/points/PointsPopup';

interface StudentPointsTableProps {
  students: Student[];
}

function PointsTable({ students }: StudentPointsTableProps) {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedStudent(null);
  };

  const handleAddReward = () => {
    console.log('상점을 추가합니다.');
  };

  const handleAddPenalty = () => {
    console.log('벌점을 추가합니다.');
  };

  return (
    <>
      <table className='min-w-full bg-white rounded-xl mt-4'>
        <thead>
          <tr>
            <th className='py-2 px-4 border-b'>이름</th>
            <th className='py-2 px-4 border-b'>나이</th>
            <th className='py-2 px-4 border-b'>학교</th>
            <th className='py-2 px-4 border-b'>상점</th>
            <th className='py-2 px-4 border-b'>벌점</th>
            <th className='py-2 px-4 border-b'>총점</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr
              key={student.id}
              className='text-center hover:bg-gray-300 cursor-pointer'
              onClick={() => handleStudentClick(student)}
            >
              <td className='py-2 px-4 border-b'>{student.name}</td>
              <td className='py-2 px-4 border-b'>{student.age}</td>
              <td className='py-2 px-4 border-b'>{student.school}</td>
              <td className='py-2 px-4 border-b'>{student.rewardPoints}</td>
              <td className='py-2 px-4 border-b'>{student.penaltyPoints}</td>
              <td className='py-2 px-4 border-b'>
                {student.rewardPoints - student.penaltyPoints}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* PointsPopup 컴포넌트 사용 */}
      <PointsPopup
        isOpen={isPopupOpen}
        student={selectedStudent}
        onClose={handleClosePopup}
        onAddReward={handleAddReward}
        onAddPenalty={handleAddPenalty}
      />
    </>
  );
}

export default PointsTable;
