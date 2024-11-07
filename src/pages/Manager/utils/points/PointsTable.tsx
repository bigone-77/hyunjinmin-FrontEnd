import { useState } from 'react';
import { StudentPoints, StudentPointsTableProps } from './PointsInter';
import PointsPopup from '@/pages/Manager/utils/points/PointsPopup';
import { handleStudentClick, handleClosePopup } from './PointsFunc';

function PointsTable({ students }: StudentPointsTableProps) {
  const [selectedStudent, setSelectedStudent] = useState<StudentPoints | null>(
    null,
  );
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

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
              onClick={() =>
                handleStudentClick(student, setSelectedStudent, setIsPopupOpen)
              }
            >
              <td className='py-2 px-4 border-b'>{student.name}</td>
              <td className='py-2 px-4 border-b'>{student.age}</td>
              <td className='py-2 px-4 border-b'>{student.school}</td>
              <td className='py-2 px-4 border-b'>{student.rewardPoints}</td>
              <td className='py-2 px-4 border-b'>{student.penaltyPoints}</td>
              <td className='py-2 px-4 border-b'>{student.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <PointsPopup
        isOpen={isPopupOpen}
        student={selectedStudent}
        onClose={() => handleClosePopup(setIsPopupOpen, setSelectedStudent)}
      />
    </>
  );
}

export default PointsTable;
