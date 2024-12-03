import { TeacherTableProps } from './TeacherInter';
import { subjectMap } from '@/utils/getCode';
import { useDeleteTeacher } from '@/pages/Manager/utils/teacher/hooks/useDeleteTeacher';
import { useState } from 'react';
import TeacherAddPopup from '@/pages/Manager/utils/teacher/TeacherAddPopup';

function StudentTable({ teachers, refetch }: TeacherTableProps) {
  const { deleteTeacher, isDeleting, error } = useDeleteTeacher();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleDelete = async (teacherId: number) => {
    const confirmDelete = window.confirm('정말로 이 교사를 삭제하시겠습니까?');
    if (confirmDelete) {
      await deleteTeacher(teacherId);
      if (!error) {
        alert('교사가 성공적으로 삭제되었습니다.');
        refetch();
      }
    }
  };

  return (
    <div className='bg-white p-4 rounded-lg shadow-md mb-6'>
      <table className='min-w-full bg-white rounded-xl'>
        <thead>
          <tr>
            <th className='py-2 px-4 border-b border-gray-400 p-2'>이름</th>
            <th className='py-2 px-4 border-b border-gray-400 p-2'>과목</th>
            <th className='py-2 px-4 border-b border-gray-400 p-2'>작업</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr
              key={teacher.id}
              className='text-center cursor-pointer hover:bg-gray-300'
            >
              <td className='py-2 px-4 border-b border-gray-400 p-2'>
                {teacher.name}
              </td>
              <td className='py-2 px-4 border-b border-gray-400 p-2'>
                {subjectMap[teacher.subject]}
              </td>
              <td className='border-b border-gray-400 p-2'>
                <div className='flex justify-center gap-2'>
                  <button
                    className={`bg-negative text-white p-1 rounded px-5 btn-shadow ${
                      isDeleting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={isDeleting}
                    onClick={() => handleDelete(Number(teacher.id))}
                  >
                    삭제
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex mt-5 justify-end'>
        <button
          onClick={() => setIsPopupOpen(true)}
          className='bg-positive text-white p-2 rounded w-1/8 hover:bg-positive-hover btn-shadow'
        >
          선생님 추가
        </button>
      </div>
      <TeacherAddPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        refetch={refetch}
      />
    </div>
  );
}

export default StudentTable;
