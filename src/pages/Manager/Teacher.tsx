import Header from '@/pages/Manager/utils/Header';
import Lnb from '@/pages/Manager/utils/Lnb';
import { useFetchTeachers } from '@/pages/Manager/utils/teacher/hooks/useFetchTeachers';
import TeacherTable from '@/pages/Manager/utils/teacher/TeacherTable';

function TeacherPage() {
  const { teachers, isLoading, error, fetchTeachers } = useFetchTeachers();
  return (
    <div className='w-full h-screen flex flex-col'>
      <Header />
      <Lnb />
      <div className='p-6 flex-1 bg-gray-200 rounded-xl'>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-2xl font-bold'>선생님 정보 관리</h1>
        </div>
        {isLoading ? (
          <p>로딩 중...</p>
        ) : error ? (
          <p className='text-red-500'>에러: {error}</p>
        ) : (
          <TeacherTable teachers={teachers} refetch={fetchTeachers} />
        )}
      </div>
    </div>
  );
}

export default TeacherPage;
