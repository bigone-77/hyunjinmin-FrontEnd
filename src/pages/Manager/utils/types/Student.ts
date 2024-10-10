export interface Student {
  id: number;
  name: string;
  age: number;
  school: string;
  email: string;
  phone: string;
  postalCode: string;
  address: string;
  rewardPoints: number;
  penaltyPoints: number;
  classes: string[]; // 듣는 수업
  tuitionFees: number; // 원비
  feesDay: number; // 원비 납부 일
  feesStatus: boolean; // 원비 납부 여부
}
