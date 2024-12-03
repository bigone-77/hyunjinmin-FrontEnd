import { useState } from 'react';

import Header from '@/pages/Manager/utils/Header';
import Lnb from '@/pages/Manager/utils/Lnb';
import UserDetailPopUp from '@/pages/Manager/utils/userProv/UserDetailPopup';
import UserTable from '@/pages/Manager/utils/userProv/UserTable';

import { User } from './utils/userProv/UserProvInter';
import { handleClosePopUp } from './utils/userProv/UserProvFunc';

import { useFetchUsers } from '../Manager/utils/userProv/hooks/useFetchUsers'; // 커스텀 훅
import { useApproveUser } from '../Manager/utils/userProv/hooks/useApproveUser'; // 커스텀 훅

function UserProvPage() {
  const { users, isLoading, error } = useFetchUsers(); // 유저 데이터 가져오기
  const approveUser = useApproveUser(); // 유저 승인

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleApprove = (userId: string) => {
    approveUser(userId, () => setSelectedUser(null)); // 승인 후 팝업 닫기
  };

  return (
    <div className='w-full h-screen flex flex-col'>
      <Header />
      <Lnb />
      <div className='p-6 flex-1 bg-gray-200 rounded-xl'>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-2xl font-bold'>학생 가입승인 관리</h1>
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p className='text-red-500'>{error}</p>}
        <UserTable
          users={users}
          onUserClick={(user) => setSelectedUser(user)} // 직접 처리
        />
      </div>
      {selectedUser && (
        <UserDetailPopUp
          user={selectedUser}
          onApprove={() => handleApprove(selectedUser.id)}
          onClose={() => handleClosePopUp(setSelectedUser)}
        />
      )}
    </div>
  );
}

export default UserProvPage;
