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
  id: string; //
  name: string; //
  age: number; //
  schoolName: string;
  email: string; //
  phoneNumber: string; //
  postalCode: string; //우편 번호
  address: string; //
}

export interface TabButtonProps {
  to: string;
  children: React.ReactNode;
  isSelected: boolean;
}

export interface UserPopUpProps {
  user: User | null;
  onApprove: () => void;
  onClose: () => void;
}
