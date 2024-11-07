export interface Student {
  id: string;
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

export interface TabButtonProps {
  to: string;
  children: React.ReactNode;
  isSelected: boolean;
}

export interface SearchBarProps {
  searchName: string;
  setSearchName: React.Dispatch<React.SetStateAction<string>>;
  searchAge: string;
  setSearchAge: React.Dispatch<React.SetStateAction<string>>;
  searchSchool: string;
  setSearchSchool: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}

export interface PopUpProps {
  student: Student | null;
  onClose: () => void;
}

export interface StudentTableProps {
  students: Student[];
  onStudentClick: (student: Student) => void;
}

export interface TableRowProps {
  label: string;
  value: React.ReactNode;
}
