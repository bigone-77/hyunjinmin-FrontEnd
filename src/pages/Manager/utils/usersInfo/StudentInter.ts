export interface Student {
  id: string;
  name: string;
  age: number;
  schoolName: string;
  email: string;
  phoneNumber: string;
  postalCode: string;
  address: string;
  rewardPoints: number;
  penaltyPoints: number;
  totalPoints: number;
}

export interface StudentDetail {
  id: string;
  name: string;
  age: number;
  schoolName: string;
  email: string;
  phoneNumber: string;
  postalCode: string;
  address: string;
  rewardPoints: number;
  penaltyPoints: number;
  totalPoints: number;
  classes: string;
  totalPrice: number;
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
  searchSchoolName: string;
  setSearchSchoolName: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
  isSearching: boolean;
  searchError: string | null;
}

export interface PopUpProps {
  studentId: string;
  onUnApprove: (studentId: string) => void;
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
