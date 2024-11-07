import { UserTableRowProps } from './UserProvInter';

function UserTableRow({ label, value }: UserTableRowProps) {
  return (
    <tr>
      <td className='py-2 px-4 font-semibold border-b border-r-2 border-r-gray-500 border-b-gray-300'>
        {label}
      </td>
      <td className='py-2 px-4 border-b border-b-gray-300'>{value}</td>
    </tr>
  );
}

export default UserTableRow;
