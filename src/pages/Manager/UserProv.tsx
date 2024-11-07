import { useEffect, useState } from 'react';

import Header from '@/pages/Manager/utils/Header';
import Lnb from '@/pages/Manager/utils/Lnb';
import UserDetailPopUp from '@/pages/Manager/utils/userProv/UserDetailPopup';
import UserSearchBar from '@/pages/Manager/utils/userProv/UserSearchBar';
import UserTable from '@/pages/Manager/utils/userProv/UserTable';

import { User } from './utils/userProv/UserProvInter';
import {
  fetchUsers,
  handleSearch,
  handleUserClick,
  handleClosePopUp,
} from './utils/userProv/UserProvFunc';

function UserProvPage() {
  const [, setUsers] = useState<User[]>([]);
  const [searchName, setSearchName] = useState('');
  const [searchAge, setSearchAge] = useState('');
  const [searchSchool, setSearchSchool] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers(setUsers, setFilteredUsers);
  }, []);

  return (
    <div className='w-full h-screen flex flex-col'>
      <Header />
      <Lnb />
      <div className='p-6 flex-1 bg-gray-200 rounded-xl'>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-2xl font-bold'>학생 가입승인 관리</h1>
          <UserSearchBar
            searchName={searchName}
            setSearchName={setSearchName}
            searchAge={searchAge}
            setSearchAge={setSearchAge}
            searchSchool={searchSchool}
            setSearchSchool={setSearchSchool}
            handleSearch={() => handleSearch(searchName, setFilteredUsers)}
          />
        </div>
        <UserTable
          users={filteredUsers}
          onUserClick={(user) => handleUserClick(user, setSelectedUser)}
        />
      </div>
      {selectedUser && (
        <UserDetailPopUp
          user={selectedUser}
          onClose={() => handleClosePopUp(setSelectedUser)}
        />
      )}
    </div>
  );
}

export default UserProvPage;
