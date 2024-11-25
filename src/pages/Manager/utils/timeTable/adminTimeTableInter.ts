export interface AdminToggleButtonsProps {
  isWeekend: boolean;
  setDayType: (type: '평일' | '주말') => void;
}

export interface ClassData {
  classSeq: number;
  teacherName: string;
  className: string;
  startTime: string;
  endTime: string;
  roomIndex: string;
  price: number;
  schoolCode: string;
  schoolName: string;
  grade: string;
  regDate: string;
  classColor: string;
  classDate: string[];
}

export interface SearchBarProps {
  schoolLevel: string;
  schoolName: string;
  grade: string;
  setSchoolLevel: (value: string) => void;
  setSchoolName: (value: string) => void;
  setGrade: (value: string) => void;
  isSearchDisabled: boolean;
  selectedResult: string; // 선택된 검색 결과
  setSelectedResult: (value: string) => void;
  onResultSelect: () => void; // 조회 버튼 클릭 시 동작
}

export interface TimeSlotRowProps {
  time: string;
  slotIndex: number;
  timeSlots: string[];
  classes: any[];
  days: string[];
}

export interface PopUpProps {
  classInfo: any;
  onClose: () => void;
}

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
