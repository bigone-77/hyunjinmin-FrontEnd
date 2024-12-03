// import { useState } from 'react';
import TableRow from '@/pages/Manager/utils/usersInfo/TableRow';
// import PayDatePopup from '@/pages/Manager/utils/usersInfo/PayDatePopup';
import { PopUpProps } from './StudentInter';
import {} from //handlePaymentCompletion,
'./StudentFunc';
import { useFetchStudentDetail } from '@/pages/Manager/utils/usersInfo/hooks/useFetchStudentDetail';

function formatPrice(price: number): string {
  return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
    .format(price)
    .replace('₩', '') // "₩" 제거, 원 단위로 표시
    .trim();
}

function StudentDetailPopUp({ studentId, onUnApprove, onClose }: PopUpProps) {
  const { student, isLoading, error } = useFetchStudentDetail(studentId);
  if (!studentId) return null;
  // const [showPayDatePopup, setShowPayDatePopup] = useState(false); // PayDatePopup 표시 상태

  const handleUnApprove = () => {
    onUnApprove(studentId); // 권한 회수 함수 호출
  };

  if (isLoading) {
    return <div className='text-center'>로딩 중...</div>;
  }

  if (error) {
    return <div className='text-center text-red-500'>에러: {error}</div>;
  }

  if (!student) {
    return <div className='text-center'>학생 정보를 찾을 수 없습니다.</div>;
  }

  return (
    // <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
    //   <div className='bg-white p-8 rounded-lg shadow-lg w-[600px]'>
    //     <h2 className='font-bold mb-6 text-center' style={{ fontSize: '32px' }}>
    //       {student.name}
    //     </h2>
    //     <table className='min-w-full mb-4'>
    //       <tbody>
    //         <TableRow label='나이' value={`${student.age}살`} />
    //         <TableRow label='학교' value={student.schoolName} />
    //         <TableRow label='이메일' value={student.email} />
    //         <TableRow label='휴대폰 번호' value={student.phoneNumber} />
    //         <TableRow label='우편번호' value={student.postalCode} />
    //         <TableRow label='상세 주소' value={student.address} />
    //         <TableRow label='상점' value={student.rewardPoints} />
    //         <TableRow label='벌점' value={student.penaltyPoints} />
    //         <TableRow
    //           label='총점'
    //           value={student.rewardPoints + student.penaltyPoints}
    //         />
    //       </tbody>
    //     </table>
    //     <div className='flex justify-center'>
    //       <button
    //         onClick={handleUnApprove}
    //         className='px-6 py-2 bg-negative text-white rounded-lg hover:bg-negative-hover btn-shadow'
    //       >
    //         권한 회수
    //       </button>
    //     </div>
    //     <div className='flex justify-center mt-2'>
    //       <button
    //         onClick={onClose}
    //         className='px-6 py-2 bg-close text-white rounded-lg hover:bg-close-hover btn-shadow'
    //       >
    //         닫기
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-[600px]'>
        <h2 className='font-bold mb-6 text-center' style={{ fontSize: '32px' }}>
          {student.name}
        </h2>
        <table className='min-w-full mb-4'>
          <tbody>
            <TableRow label='나이' value={`${student.age}살`} />
            <TableRow label='학교' value={student.schoolName} />
            <TableRow label='이메일' value={student.email} />
            <TableRow label='휴대폰 번호' value={student.phoneNumber} />
            <TableRow label='우편번호' value={student.postalCode} />
            <TableRow label='상세 주소' value={student.address} />
            <TableRow label='상점' value={student.rewardPoints} />
            <TableRow label='벌점' value={student.penaltyPoints} />
            <TableRow label='총점' value={student.totalPoints} />
            <TableRow label='수강 과목' value={student.classes} />
            <TableRow
              label='원비'
              value={`${formatPrice(student.totalPrice)} 원`}
            />
          </tbody>
        </table>
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
    </div>
  );
}

export default StudentDetailPopUp;
