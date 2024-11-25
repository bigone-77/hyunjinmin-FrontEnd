import axios from 'axios';
import { User } from './UserProvInter';
//////////////////////////////AXIOS함수////////////////////////////////////////
// 유저 승인 함수
export const approveUser = async (userId: string, onClose: () => void) => {
  const accessToken = localStorage.getItem('accessToken');

  //JWT토큰 없다면 로그인으로 이동
  if (!accessToken) {
    window.location.href = '/manager/auth/adminLogin';
    return Promise.reject(new Error('No access token found.'));
  }
  try {
    const response = await axios.post(
      '/systemMng/admin/userMng/aprovUserInfo',
      { USER_ID: userId },
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      },
    );

    if (response.data.status === 'success') {
      alert('승인이 완료되었습니다');
      window.location.reload();
      onClose();
    } else {
      //JWT토큰 만료
      if (response.data.msg === '유효하지 않은 토큰입니다') {
        alert('다시 로그인을 해주세요.');
        window.location.href = '/manager/auth/adminLogin';
      }
      alert(response.data.msg || '권한 승인에 실패했습니다.');
    }
  } catch (error) {
    alert('승인 중 오류가 발생했습니다.');
  }
};

// 유저 정보 가져오는 함수
export const fetchUsers = async (
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  setFilteredUsers: React.Dispatch<React.SetStateAction<User[]>>,
) => {
  const accessToken = localStorage.getItem('accessToken');

  //JWT토큰 없다면 로그인으로 이동
  if (!accessToken) {
    window.location.href = '/manager/auth/adminLogin';
    return Promise.reject(new Error('No access token found.'));
  }

  try {
    const response = await axios.post(
      '/systemMng/admin/userMng/userProv',
      { USER_NM: '' },
      {
        headers: {
          Authorization: `${accessToken}`, // Use JWT accessToken from localStorage
        },
      },
    );
    if (response.data.status === 'success') {
      const usersData = response.data.dl_userList.map((user: any) => ({
        id: user.USER_ID,
        name: user.USER_NM,
        age: user.USER_AGE,
        email: user.USER_EMAIL,
        phone: user.PHONE_NUM,
        school: '',
        postalCode: '',
        address: '',
        classes: [],
        tuitionFees: 0,
        feesDay: 1,
        feesStatus: true,
        aprovStatus: user.APRV_YN,
      }));
      setUsers(usersData);
      setFilteredUsers(usersData);
    } else {
      //JWT토큰 만료
      if (response.data.msg === '유효하지 않은 토큰입니다') {
        alert('다시 로그인을 해주세요.');
        window.location.href = '/manager/auth/adminLogin';
      }
      alert(response.data.msg || '정보를 불러오는데 실패했습니다.');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

// 유저 검색하는 함수
export const handleSearch = async (
  searchName: string,
  setFilteredUsers: React.Dispatch<React.SetStateAction<User[]>>,
) => {
  const accessToken = localStorage.getItem('accessToken');

  //JWT토큰 없다면 로그인으로 이동
  if (!accessToken) {
    window.location.href = '/manager/auth/adminLogin';
    return Promise.reject(new Error('No access token found.'));
  }
  try {
    const response = await axios.post(
      '/systemMng/admin/userMng/userInfo',
      { USER_NM: searchName },
      {
        headers: {
          Authorization: `${accessToken}`, // Use JWT accessToken from localStorage
        },
      },
    );
    if (response.data.status === 'success') {
      const searchedUsers = response.data.dl_userList.map((user: any) => ({
        id: user.USER_ID,
        name: user.USER_NM,
        age: user.USER_AGE,
        email: user.USER_EMAIL,
        phone: user.PHONE_NUM,
        school: '',
        postalCode: '',
        address: '',
        classes: [],
        tuitionFees: 0,
        feesDay: 1,
        feesStatus: true,
        aprovStatus: user.APRV_YN,
      }));
      setFilteredUsers(searchedUsers);
    } else {
      //JWT토큰 만료
      if (response.data.msg === '유효하지 않은 토큰입니다') {
        alert('다시 로그인을 해주세요.');
        window.location.href = '/manager/auth/adminLogin';
      }
      alert(response.data.msg || '유저 검색에 실패했습니다.');
    }
  } catch (error) {
    console.error('Error during search:', error);
  }
};
//////////////////////////////일반함수////////////////////////////////////////
// 유저 검색 함수
export const handleInputChange =
  (setter: React.Dispatch<React.SetStateAction<string>>) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

// detail popup에서 사용하는 유저 클릭함수
export const handleUserClick = (
  user: User,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
) => {
  setSelectedUser(user);
};

//detail popup 닫기 함수
export const handleClosePopUp = (
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
) => {
  setSelectedUser(null);
};
