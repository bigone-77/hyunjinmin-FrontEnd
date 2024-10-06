export const formatTime24to12 = (hour: number, minute: number): string => {
  const ampm = hour >= 12 ? '오후' : '오전';
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const formattedMinute = minute === 0 ? '' : `${minute}분`; // 00분일 경우 생략
  return `${ampm} ${formattedHour}시 ${formattedMinute}`.trim();
};

export const formatTime24 = (hour: number, minute: string) => {
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const formattedMinute = minute === '00' ? '' : `${minute}분`;
  return `${formattedHour}시 ${formattedMinute}`.trim();
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
