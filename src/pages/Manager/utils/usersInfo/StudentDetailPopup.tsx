import { useState } from 'react';
import TableRow from '@/pages/Manager/utils/usersInfo/TableRow';

interface DetailStudent {
  id: number;
  name: string;
  age: number;
  school: string;
  email: string;
  phone: string;
  postalCode: string;
  address: string;
  rewardPoints: number;
  penaltyPoints: number;
  classes: string[]; // 듣는 수업
  tuitionFees: number; // 원비
  feesDay: number; // 원비 납부 일
  feesStatus: boolean; // 원비 납부 여부
}

interface PopUpProps {
  student: DetailStudent | null;
  onClose: () => void;
}

function StudentDetailPopUp({ student, onClose }: PopUpProps) {
  if (!student) return null;

  const [feesStatus, setFeesStatus] = useState(student.feesStatus); // 납부 상태를 상태로 관리

  const handlePaymentCompletion = () => {
    setFeesStatus(true); // 납부 완료로 상태 변경
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-[600px]'>
        <h2 className='font-bold mb-6 text-center' style={{ fontSize: '32px' }}>
          {student.name}
        </h2>
        <table className='min-w-full mb-4'>
          <tbody>
            <TableRow label='나이' value={`${student.age}살`} />
            <TableRow label='학교' value={student.school} />
            <TableRow label='이메일' value={student.email} />
            <TableRow label='휴대폰 번호' value={student.phone} />
            <TableRow label='우편번호' value={student.postalCode} />
            <TableRow label='상세 주소' value={student.address} />
            <TableRow label='상점' value={student.rewardPoints} />
            <TableRow label='벌점' value={student.penaltyPoints} />
            <TableRow
              label='총점'
              value={student.rewardPoints + student.penaltyPoints}
            />
            <TableRow label='듣는 수업' value={student.classes.join(', ')} />
            <TableRow label='원비' value={`${student.tuitionFees} 원`} />
            <TableRow label='원비 납부일' value={`${student.feesDay}일`} />
            <TableRow
              label='원비 납부 여부'
              value={
                feesStatus ? (
                  <span className='text-blue'>납부 완료</span>
                ) : (
                  <span className='text-red'>납부 미완료</span>
                )
              }
            />
          </tbody>
        </table>

        {!feesStatus && (
          <div className='flex justify-center mb-4'>
            <button
              onClick={handlePaymentCompletion}
              className='px-6 py-2 bg-green text-white rounded-lg hover:bg-green transition-colors duration-200'
            >
              납부 완료
            </button>
          </div>
        )}

        <div className='flex justify-center'>
          <button
            onClick={onClose}
            className='px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray transition-colors duration-200'
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentDetailPopUp;
