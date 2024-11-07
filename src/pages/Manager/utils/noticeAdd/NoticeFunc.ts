import axios from 'axios';
import { Notice, NoticeDetail } from './NoticeInter';

//////////////////////////////AXIOS함수////////////////////////////////////////
// 공지사항 목록 가져오는 함수
export const fetchNotices = async (
  searchTerm: string = '',
): Promise<Notice[]> => {
  const accessToken = localStorage.getItem('accessToken');

  //JWT토큰 없다면 로그인으로 이동
  if (!accessToken) {
    window.location.href = '/auth/Login';
    return Promise.reject(new Error('No access token found.'));
  }

  try {
    const response = await axios.post(
      '/systemMng/admin/noticeMng/selectList',
      { SEARCH_KEYWORD: searchTerm },
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      },
    );
    if (response.data.status === 'success') {
      return response.data.noticeList;
    } else {
      //JWT토큰 만료
      if (response.data.msg === '유효하지 않은 토큰입니다') {
        alert('다시 로그인을 해주세요.');
        window.location.href = '/auth/Login';
      }
      throw new Error(response.data.msg || '공지사항을 불러오지 못했습니다.');
    }
  } catch (err) {
    console.error('Error fetching notices:', err);
    throw new Error('서버 요청 중 오류가 발생했습니다.');
  }
};

// 공지사항 삭제
export const deleteNotice = async (noticeId: number): Promise<void> => {
  const accessToken = localStorage.getItem('accessToken');

  //JWT토큰 없다면 로그인으로 이동
  if (!accessToken) {
    window.location.href = '/auth/Login';
    return Promise.reject(new Error('No access token found.'));
  }

  try {
    const response = await axios.post(
      '/systemMng/admin/noticeMng/deleteNoticeDtl',
      { NOTICE_IDX: noticeId },
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      },
    );
    if (response.data.status !== 'success') {
      //JWT토큰 만료
      if (response.data.msg === '유효하지 않은 토큰입니다') {
        alert('다시 로그인을 해주세요.');
        window.location.href = '/auth/Login';
      }
      throw new Error(response.data.msg || '삭제에 실패했습니다.');
    }
  } catch (err) {
    console.error('Error deleting notice:', err);
    throw new Error('서버 요청 중 오류가 발생했습니다.');
  }
};

// 공지사항 수정
export const updateNotice = async (updatedNotice: Notice): Promise<void> => {
  const accessToken = localStorage.getItem('accessToken');

  //JWT토큰 없다면 로그인으로 이동
  if (!accessToken) {
    window.location.href = '/auth/Login';
    return Promise.reject(new Error('No access token found.'));
  }

  try {
    const response = await axios.post(
      '/systemMng/admin/noticeMng/updateNoticeDtl',
      {
        NOTICE_IDX: updatedNotice.NOTICE_IDX,
        NOTICE_SUBJ: updatedNotice.NOTICE_SUBJ,
        NOTICE_CONT: updatedNotice.NOTICE_CONT,
      },
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      },
    );
    if (response.data.status !== 'success') {
      //JWT토큰 만료
      if (response.data.msg === '유효하지 않은 토큰입니다') {
        alert('다시 로그인을 해주세요.');
        window.location.href = '/auth/Login';
      }
      throw new Error(response.data.msg || '수정에 실패했습니다.');
    }
  } catch (err) {
    console.error('Error updating notice:', err);
    throw new Error('서버 요청 중 오류가 발생했습니다.');
  }
};

//새 공지사항 작성 함수
export const submitNewNotice = async (
  noticeTitle: string,
  noticeContent: string,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  handleClose: () => void,
) => {
  const accessToken = localStorage.getItem('accessToken');

  //JWT토큰 없다면 로그인으로 이동
  if (!accessToken) {
    window.location.href = '/auth/Login';
    return Promise.reject(new Error('No access token found.'));
  }
  try {
    const response = await axios.post(
      '/systemMng/admin/noticeMng/insertNoticeDtl',
      {
        NOTICE_SUBJ: noticeTitle,
        NOTICE_CONT: noticeContent,
      },
      {
        headers: { Authorization: `${accessToken}` },
      },
    );

    if (response.data.status === 'success') {
      // 공지가 성공적으로 추가되었을 때 처리
      alert('공지사항이 성공적으로 추가되었습니다.');
      handleClose();
      window.location.reload(); // 페이지 새로고침
    } else {
      //JWT토큰 만료
      if (response.data.msg === '유효하지 않은 토큰입니다') {
        alert('다시 로그인을 해주세요.');
        window.location.href = '/auth/Login';
      }
      setMessage(response.data.msg || '공지사항 추가에 실패했습니다.');
    }
  } catch (error) {
    console.error('Error adding notice:', error);
    setMessage('서버 요청 중 오류가 발생했습니다.');
  }
};

//공지 상세정보를 불러오는 함수
export const fetchNoticeDetail = async (
  noticeId: number,
  setNoticeDetail: React.Dispatch<React.SetStateAction<NoticeDetail | null>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  const accessToken = localStorage.getItem('accessToken');

  //JWT토큰 없다면 로그인으로 이동
  if (!accessToken) {
    window.location.href = '/auth/Login';
    return Promise.reject(new Error('No access token found.'));
  }
  try {
    const response = await axios.post(
      '/systemMng/admin/noticeMng/selectNoticeDtl',
      { NOTICE_IDX: noticeId },
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      },
    );

    if (response.data.status === 'success') {
      setNoticeDetail(response.data.noticeMap);
    } else {
      //JWT토큰 만료
      if (response.data.msg === '유효하지 않은 토큰입니다') {
        alert('다시 로그인을 해주세요.');
        window.location.href = '/auth/Login';
      }
      setError(
        response.data.msg || '공지사항 상세 정보를 불러오지 못했습니다.',
      );
    }
  } catch (err) {
    console.error('Error fetching notice detail:', err);
    setError('서버 요청 중 오류가 발생했습니다.');
  }
};

//공지사항의 상세정보를 업데이트 하는 함수
export const updateNoticeDetail = async (
  updatedNotice: Notice,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  onSave: (notice: Notice) => void,
  onClose: () => void,
) => {
  const accessToken = localStorage.getItem('accessToken');

  //JWT토큰 없다면 로그인으로 이동
  if (!accessToken) {
    window.location.href = '/auth/Login';
    return Promise.reject(new Error('No access token found.'));
  }
  try {
    const response = await axios.post(
      '/systemMng/admin/noticeMng/updateNoticeDtl',
      {
        NOTICE_IDX: updatedNotice.NOTICE_IDX,
        NOTICE_SUBJ: updatedNotice.NOTICE_SUBJ,
        NOTICE_CONT: updatedNotice.NOTICE_CONT,
      },
      {
        headers: { Authorization: `${accessToken}` },
      },
    );

    if (response.data.status === 'success') {
      onSave(updatedNotice);
      alert('공지사항이 성공적으로 수정되었습니다.');
      onClose();
    } else {
      //JWT토큰 만료
      if (response.data.msg === '유효하지 않은 토큰입니다') {
        alert('다시 로그인을 해주세요.');
        window.location.href = '/auth/Login';
      }
      alert(response.data.msg || '공지사항 수정에 실패했습니다.');
    }
  } catch (err) {
    console.error('Error updating notice:', err);
    setError('서버 요청 중 오류가 발생했습니다.');
  }
};
//////////////////////////////일반함수////////////////////////////////////////
//팝업 띄우는 함수
export const openPopup = (
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setIsPopupOpen(true);
};

//팝업 닫는 함수
export const closePopup = (
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setIsPopupOpen(false);
};

//공지를 Load해오는 함수
export const loadNotices = async (
  fetchNoticesFunc: () => Promise<Notice[]>,
  setNotices: React.Dispatch<React.SetStateAction<Notice[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  try {
    const data = await fetchNoticesFunc();
    setNotices(data);
  } catch (err) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('알 수 없는 오류가 발생했습니다.');
    }
  }
};

//공지 삭제 함수
export const handleDelete = async (
  noticeId: number,
  deleteNoticeFunc: (noticeId: number) => Promise<void>,
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>,
  setDeleteError: React.Dispatch<React.SetStateAction<string | null>>,
  setNotices: React.Dispatch<React.SetStateAction<Notice[]>>,
) => {
  setIsDeleting(true);
  setDeleteError(null);
  try {
    await deleteNoticeFunc(noticeId);
    setNotices((prevNotices) =>
      prevNotices.filter((notice) => notice.NOTICE_IDX !== noticeId),
    );
    alert('삭제가 완료되었습니다.');
  } catch (err) {
    if (err instanceof Error) {
      setDeleteError(err.message);
    } else {
      setDeleteError('알 수 없는 오류가 발생했습니다.');
    }
  } finally {
    setIsDeleting(false);
  }
};

//공지 추가 함수
export const handleNoticeAdd = async (
  newNotice: Notice,
  addNoticeFunc: (newNotice: Notice) => Promise<Notice>,
  fetchNoticesFunc: () => Promise<Notice[]>,
  setNotices: React.Dispatch<React.SetStateAction<Notice[]>>,
  closePopupFunc: () => void,
) => {
  try {
    await addNoticeFunc(newNotice);
    // 공지사항 추가 후 setNotices를 두 번 호출하지 않도록 fetch 후 상태를 한번만 업데이트
    const updatedNotices = await fetchNoticesFunc();
    setNotices(updatedNotices);
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error adding notice:', err.message);
    } else {
      console.error('알 수 없는 오류가 발생했습니다.');
    }
  } finally {
    closePopupFunc();
  }
};

//공지 수정사항 저장 함수
export const handleSaveEdit = async (
  updatedNotice: Notice,
  updateNoticeFunc: (updatedNotice: Notice) => Promise<void>,
  setNotices: React.Dispatch<React.SetStateAction<Notice[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  try {
    await updateNoticeFunc(updatedNotice);
    setNotices((prevNotices) =>
      prevNotices.map((notice) =>
        notice.NOTICE_IDX === updatedNotice.NOTICE_IDX ? updatedNotice : notice,
      ),
    );
  } catch (err) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('알 수 없는 오류가 발생했습니다.');
    }
  }
};

//공지 수정 버튼 클릭 함수
export const handleEditClick = (
  notice: Notice,
  setSelectedNotice: React.Dispatch<React.SetStateAction<Notice | null>>,
  setIsEditPopupOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setSelectedNotice(notice);
  setIsEditPopupOpen(true);
};

//공지 상세보기 클릭 함수
export const handleNoticeClick = (
  notice: Notice,
  setSelectedNotice: React.Dispatch<React.SetStateAction<Notice | null>>,
  setIsDetailPopupOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setSelectedNotice(notice);
  setIsDetailPopupOpen(true);
};

//닫기 함수
export const handleClose = (
  setNoticeTitle: React.Dispatch<React.SetStateAction<string>>,
  setNoticeContent: React.Dispatch<React.SetStateAction<string>>,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  onClose: () => void,
) => {
  setNoticeTitle('');
  setNoticeContent('');
  setMessage('');
  onClose();
};

//공지사항 저장 함수
export const handleSaveNotice = (
  notice: Notice,
  title: string,
  content: string,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  onSave: (notice: Notice) => void,
  onClose: () => void,
) => {
  const updatedNotice: Notice = {
    ...notice,
    NOTICE_SUBJ: title,
    NOTICE_CONT: content,
  };
  updateNoticeDetail(updatedNotice, setError, onSave, onClose);
};
