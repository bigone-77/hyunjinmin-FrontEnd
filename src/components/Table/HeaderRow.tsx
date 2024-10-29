import { HeaderRowProps } from '@/components/Table/Utils/TimeTableIF';

function HeaderRow({ days, isWeekend }: HeaderRowProps) {
  return (
    <thead>
      <tr className='bg-gray-200'>
        <th className='p-2 border border-gray-300 align-middle w-6'></th>
        {days.map((day) => (
          <th
            key={day}
            className={`p-1 border border-gray-300 text-center align-middle ${isWeekend ? 'w-1/2' : 'w-1/5'}`}
          >
            {day}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default HeaderRow;
