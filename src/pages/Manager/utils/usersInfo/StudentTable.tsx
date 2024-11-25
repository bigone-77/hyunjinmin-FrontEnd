import { StudentTableProps } from './StudentInter';

function StudentTable({ students, onStudentClick }: StudentTableProps) {
  return (
    <table className='min-w-full bg-white rounded-xl'>
      <thead>
        <tr>
          <th className='py-2 px-4 border-b'>이름</th>
          <th className='py-2 px-4 border-b'>나이</th>
          <th className='py-2 px-4 border-b'>학교</th>
          <th className='py-2 px-4 border-b'>이메일</th>
          <th className='py-2 px-4 border-b'>휴대폰 번호</th>
          <th className='py-2 px-4 border-b'>우편번호</th>
          <th className='py-2 px-4 border-b'>상세 주소</th>
          <th className='py-2 px-4 border-b'>상점</th>
          <th className='py-2 px-4 border-b'>벌점</th>
          <th className='py-2 px-4 border-b'>총점</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr
            key={student.id}
            className='text-center cursor-pointer hover:bg-gray-300'
            onClick={() => onStudentClick(student)}
          >
            <td className='py-2 px-4 border-b'>{student.name}</td>
            <td className='py-2 px-4 border-b'>{student.age}</td>
            <td className='py-2 px-4 border-b'>{student.school}</td>
            <td className='py-2 px-4 border-b'>{student.email}</td>
            <td className='py-2 px-4 border-b'>{student.phone}</td>
            <td className='py-2 px-4 border-b'>{student.postalCode}</td>
            <td className='py-2 px-4 border-b'>{student.address}</td>
            <td className='py-2 px-4 border-b'>{student.rewardPoints}</td>
            <td className='py-2 px-4 border-b'>{student.penaltyPoints}</td>
            <td className='py-2 px-4 border-b'>{student.totalPoints}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;
