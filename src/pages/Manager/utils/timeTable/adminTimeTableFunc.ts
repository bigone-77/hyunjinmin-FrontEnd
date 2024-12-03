export const formatTime24 = (hour: number, minute: string) => {
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const formattedMinute = minute === '00' ? '' : `${minute}분`;
  return `${formattedHour}시 ${formattedMinute}`.trim();
};

export const formatTime24to12 = (hour: number, minute: number): string => {
  const ampm = hour >= 12 ? '오후' : '오전';
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const formattedMinute = minute === 0 ? '' : `${minute}분`; // 00분일 경우 생략
  return `${ampm} ${formattedHour}시 ${formattedMinute}`.trim();
};

export const formatDuration = (duration: number): string => {
  const hours = Math.floor(duration);
  const minutes = Math.round((duration % 1) * 60);

  if (hours > 0 && minutes > 0) {
    return `${hours}시간 ${minutes}분`;
  } else if (hours > 0) {
    return `${hours}시간`;
  } else if (minutes > 0) {
    return `${minutes}분`;
  } else {
    return ''; // duration이 0일 경우 빈 문자열 반환
  }
};

// 요일 숫자를 문자열로 변환하는 함수
export const dayNumberToString = (dayNumber: number) => {
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  return days[dayNumber - 1]; // dayNumber는 1부터 시작
};

// 시간 숫자를 문자열 HH:MM 형식으로 변환하는 함수
export const timeStringToHHMM = (time: string) => {
  const hour = time.slice(0, 2);
  const minute = time.slice(2);
  return `${hour}:${minute}`;
};

/**
 * 한국어 형식으로 날짜 및 시간을 포맷팅합니다.
 * @param dateString - ISO 형식의 날짜 문자열
 * @returns 한국어 형식으로 포맷된 날짜 문자열
 */
export const formatKoreanDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const formattedHours = hours % 12 || 12;
  const period = hours < 12 ? '오전' : '오후';

  return `${year}년${month}월${day}일 ${period} ${formattedHours}시${minutes}분`;
};

/**
 * 시작 시간과 종료 시간을 기반으로 수업 시간을 계산합니다.
 * @param startTimeStr - HHMM 형식의 시작 시간 문자열
 * @param endTimeStr - HHMM 형식의 종료 시간 문자열
 * @returns 수업 시간(시간 및 분) 문자열
 */
export const calculateDuration = (
  startTimeStr: string,
  endTimeStr: string,
): string => {
  const startHours = parseInt(startTimeStr.substring(0, 2), 10);
  const startMinutes = parseInt(startTimeStr.substring(2), 10);

  const endHours = parseInt(endTimeStr.substring(0, 2), 10);
  const endMinutes = parseInt(endTimeStr.substring(2), 10);

  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;

  const durationMinutes = endTotalMinutes - startTotalMinutes;

  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  return `${hours}시간 ${minutes}분`;
};

export const formatDateTime = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const minutes = ['00', '15', '30', '45'];
