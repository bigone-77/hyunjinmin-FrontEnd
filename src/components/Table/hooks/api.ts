import axios from 'axios';

const classApiClient = axios.create({
  baseURL: '/systemMng/user/classInfo', // 공통 베이스 URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchClassList = async (
  userId: string,
  token: string,
  isWeekend: string,
) => {
  try {
    const response = await classApiClient.post(
      '/classList',
      {
        USER_ID: userId,
        DAY_GB: isWeekend,
      },
      {
        headers: { Authorization: token },
      },
    );
    return response.data.classList;
  } catch (error) {
    console.error('fetchClassList error:', error);
    throw error;
  }
};
