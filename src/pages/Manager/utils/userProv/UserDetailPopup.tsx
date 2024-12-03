import UserTableRow from './UserTableRow';
import { UserPopUpProps } from './UserProvInter';

function UserDetailPopUp({ user, onApprove, onClose }: UserPopUpProps) {
  if (!user) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-[600px]'>
        <h2 className='font-bold mb-6 text-center' style={{ fontSize: '32px' }}>
          {user.name}
        </h2>
        <table className='min-w-full mb-4'>
          <tbody>
            <UserTableRow label='나이' value={`${user.age}살`} />
            <UserTableRow label='학교' value={user.schoolName} />
            <UserTableRow label='이메일' value={user.email} />
            <UserTableRow label='휴대폰 번호' value={user.phoneNumber} />
            <UserTableRow label='우편번호' value={user.postalCode} />
            <UserTableRow label='상세 주소' value={user.address} />
          </tbody>
        </table>
        <div className='flex justify-center'>
          <button
            onClick={onApprove}
            className='px-6 py-2 bg-positive text-white rounded-lg hover:bg-positive-hover btn-shadow'
          >
            학생 승인
          </button>
        </div>
        <div className='flex justify-center mt-2'>
          <button
            onClick={onClose}
            className='px-6 py-2 bg-close text-white rounded-lg hover:bg-close-hover btn-shadow'
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDetailPopUp;
