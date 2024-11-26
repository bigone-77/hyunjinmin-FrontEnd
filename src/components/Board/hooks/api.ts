import axios from 'axios';

const classApiClient = axios.create({
  baseURL: '/systemMng/user/notice', // 공통 베이스 URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchNotices = async (token: string) => {
  try {
    const response = await classApiClient.post(
      '/noticeList',
      {},
      {
        headers: { Authorization: token },
      },
    );
    console.log('response', response);
    return response.data.noticeList;
  } catch (error) {
    console.error('fetchNotices error:', error);
    throw error;
  }
};
