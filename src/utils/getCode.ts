export const schoolCodeMapping: { [key: string]: string } = {
  전농초등학교: '1',
  전곡초등학교: '2',
  전동초등학교: '3',
  답십리초등학교: '4',
  동대문중학교: '5',
  전농중학교: '6',
  전일중학교: '7',
  숭인중학교: '8',
  청량고등학교: '9',
  동대부고등학교: '10',
  해성여자고등학교: '11',
  휘경여자고등학교: '12',
  휘봉고등학교: '13',
  대광고등학교: '14',
};

export const userSchoolLevel: { [key: string]: number } = {
  초: 1,
  중: 2,
  고: 3,
};
export const schoolOptions: { [key in '초' | '중' | '고']: string[] } = {
  초: ['전농초등학교', '전곡초등학교', '전동초등학교', '답십리초등학교'],
  중: ['동대문중학교', '전농중학교', '전일중학교', '숭인중학교'],
  고: [
    '청량고등학교',
    '동대부고등학교',
    '해성여자고등학교',
    '휘경여자고등학교',
    '휘봉고등학교',
    '대광고등학교',
  ],
};

export const dayToNumberMap: { [key: string]: number } = {
  월: 1,
  화: 2,
  수: 3,
  목: 4,
  금: 5,
  토: 6,
  일: 7,
};

export const classGBMap: { [key: string]: string } = {
  국어: '1',
  수학: '2',
  영어: '3',
  과학: '4',
};

export const subjectMap: { [key: string]: string } = {
  '1': '국어',
  '2': '수학',
  '3': '영어',
  '4': '과학',
};
