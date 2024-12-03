export interface AdminToggleButtonsProps {
  isWeekend: boolean;
  setDayType: (type: '평일' | '주말') => void;
}

export interface Class {
  classSeq: string;
  teacherName: string;
  className: string;
  startTime: number;
  endTime: number;
  duration: number;
  roomIndex: string;
  price: string;
  schoolName: string;
  grade: string;
  regDate: string;
  classColor: string;
  classDate: string;
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
  setTimeTableYN: (value: string) => void;
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
