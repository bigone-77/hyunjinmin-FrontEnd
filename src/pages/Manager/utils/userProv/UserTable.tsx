import { UserTableProps } from './UserProvInter';

function UserTable({ users, onUserClick }: UserTableProps) {
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
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user.id}
            className='text-center cursor-pointer hover:bg-gray-300'
            onClick={() => onUserClick(user)}
          >
            <td className='py-2 px-4 border-b'>{user.name}</td>
            <td className='py-2 px-4 border-b'>{user.age}</td>
            <td className='py-2 px-4 border-b'>{user.schoolName}</td>
            <td className='py-2 px-4 border-b'>{user.email}</td>
            <td className='py-2 px-4 border-b'>{user.phoneNumber}</td>
            <td className='py-2 px-4 border-b'>{user.postalCode}</td>
            <td className='py-2 px-4 border-b'>{user.address}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
