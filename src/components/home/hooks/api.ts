import axios from 'axios';

// const apiClient = axios.create({
//   baseURL: '/systemMng/user', // 공통 베이스 URL
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

const mainApiClient = axios.create({
  baseURL: '/systemMng/user/main', // 공통 베이스 URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// export const fetchUserDetails = async (userId: string, token: string) => {
//   const response = await apiClient.post(
//     '/userInfo/userDtl',
//     { USER_ID: userId },
//     {
//       headers: { Authorization: token },
//     },
//   );
//   return response.data.userMap;
// };
//
// export const fetchNotices = async (token: string) => {
//   const response = await apiClient.post(
//     '/notice/noticeList',
//     {},
//     {
//       headers: { Authorization: token },
//     },
//   );
//   return response.data.noticeList;
// };

// export const fetchClassList = async (userId: string, token: string) => {
//   const response = await apiClient.post(
//     '/classInfo/classList',
//     { USER_ID: userId },
//     {
//       headers: { Authorization: token },
//     },
//   );
//   return response.data.classList;
// };

export const fetchUserTotalInfo = async (userId: string, token: string) => {
  if (!userId || !token) {
    window.location.href = '/auth/Login';
    return;
  }
  const response = await mainApiClient.post(
    '/',
    { USER_ID: userId },
    {
      headers: { Authorization: token },
    },
  );

  if (response.data.msg === '유효하지 않은 토큰입니다') {
    alert('다시 로그인을 해주세요.');
    window.location.href = '/auth/Login';
  }
  return response.data;
};
