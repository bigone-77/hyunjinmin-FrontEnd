import { useState } from 'react';
import TableRow from '@/pages/Manager/utils/usersInfo/TableRow';
import PayDatePopup from '@/pages/Manager/utils/usersInfo/PayDatePopup';
import { PopUpProps } from './StudentInter';
import { handlePaymentCompletion, unApproveUser } from './StudentFunc';

function StudentDetailPopUp({ student, onClose }: PopUpProps) {
  if (!student) return null;
  const [showPayDatePopup, setShowPayDatePopup] = useState(false); // PayDatePopup 표시 상태
  const [feesDay, setFeesDay] = useState(student.feesDay); // 원비 납부일 상태
  const [feesStatus, setFeesStatus] = useState(student.feesStatus); // 납부 상태를 상태로 관리

  const handleUnApprove = () => {
    unApproveUser(student.id, onClose);
  };

  const handlePayDateChange = (selectedDay: number) => {
    setFeesDay(selectedDay);
    setShowPayDatePopup(false);
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
            <TableRow
              label='원비 납부일'
              value={
                <>
                  {`${feesDay}일 `}
                  <button
                    onClick={() => setShowPayDatePopup(true)}
                    className='px-2 py-1 bg-modify text-white rounded ml-2 hover:bg-modify-hover btn-shadow'
                  >
                    납부일 변경
                  </button>
                </>
              }
            />
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
              onClick={() => handlePaymentCompletion(setFeesStatus)}
              className='px-6 py-2 bg-positive text-white rounded-lg hover:bg-positive-hover btn-shadow'
            >
              납부 완료
            </button>
          </div>
        )}

        <div className='flex justify-center'>
          <button
            onClick={handleUnApprove}
            className='px-6 py-2 bg-negative text-white rounded-lg hover:bg-negative-hover btn-shadow'
          >
            권한 회수
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
      {showPayDatePopup && (
        <PayDatePopup
          currentDay={feesDay}
          onClose={() => setShowPayDatePopup(false)}
          onSelectDay={handlePayDateChange}
        />
      )}
    </div>
  );
}

export default StudentDetailPopUp;
