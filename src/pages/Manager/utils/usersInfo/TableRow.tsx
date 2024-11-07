import { TableRowProps } from './StudentInter';

function TableRow({ label, value }: TableRowProps) {
  return (
    <tr>
      <td className='py-2 px-4 font-semibold border-b border-r-2 border-r-gray-500'>
        {label}
      </td>
      <td className='py-2 px-4 border-b'>{value}</td>
    </tr>
  );
}

export default TableRow;
