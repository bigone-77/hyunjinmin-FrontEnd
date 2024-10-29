import Header from '@/pages/Manager/utils/Header';
import Lnb from '@/pages/Manager/utils/Lnb';
import SearchBar from '@/pages/Manager/utils/timeTable/SearchBar';
import TimeTable from '@/components/Table/TimeTable';
import NewTimeTableForm from '@/pages/Manager/utils/timeTable/NewTimeTable';
import NewClassForm from '@/pages/Manager/utils/timeTable/NewClass';

function TimeTablePage() {
  return (
    <div className='w-full h-screen flex flex-col'>
      <Header />
      <Lnb />
      <div className='p-6 flex-1 bg-gray-200 rounded-xl'>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-2xl font-bold'>시간표 관리</h1>
          <SearchBar
            school={''}
            grade={''}
            setSchool={() => {}}
            setGrade={() => {}}
            onSearch={() => {}}
            isSearchDisabled={true}
          />
        </div>
        <div className='flex gap-8'>
          {/* Left side */}
          <div className='w-2/3 bg-white p-4 rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold mb-4'>청량고 3학년 시간표</h2>
            <TimeTable data={[]} />
          </div>

          {/* Right side */}

          <NewTimeTableForm />
          <NewClassForm />
        </div>
      </div>
    </div>
  );
}

export default TimeTablePage;
