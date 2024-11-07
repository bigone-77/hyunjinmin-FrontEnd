export interface UserTableRowProps {
  label: string;
  value: React.ReactNode;
}

export interface UserSearchBarProps {
  searchName: string;
  setSearchName: React.Dispatch<React.SetStateAction<string>>;
  searchAge: string;
  setSearchAge: React.Dispatch<React.SetStateAction<string>>;
  searchSchool: string;
  setSearchSchool: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}

export interface UserTableProps {
  users: User[];
  onUserClick: (user: User) => void;
}

export interface User {
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
  aprovStatus: string; //가입 승인 여부
}

export interface TabButtonProps {
  to: string;
  children: React.ReactNode;
  isSelected: boolean;
}

export interface UserPopUpProps {
  user: User | null;
  onClose: () => void;
}
