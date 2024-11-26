export interface SignupStep1Props {
  userId: string;
  password: string;
  passwordConfirm: string;
  setUserId: (value: string) => void;
  setPassword: (value: string) => void;
  setPasswordConfirm: (value: string) => void;
  onNext: () => void;
}

export interface SignupStep2Props {
  userName: string;
  userEmail: string;
  userPhoneNumber: string;
  userAddressNumber: string;
  userAddressDetail: string;
  setUserName: (value: string) => void;
  setUserEmail: (value: string) => void;
  setUserPhoneNumber: (value: string) => void;
  setUserAddressNumber: (value: string) => void;
  setUserAddressDeatil: (value: string) => void;
  onPrevious: () => void;
  onNext: () => void;
}

export interface SignupStep3Props {
  userSchoolName: string;
  userSchool: string;
  userGrade: number;
  userAge: number;
  setUserSchoolName: (value: string) => void;
  setUserSchool: (value: string) => void;
  setUserGrade: (value: number) => void;
  setUserAge: (value: number) => void;
  onPrevious: () => void;
  onNext: () => void;
}

export interface SignupStep4Props {
  userParentName: string;
  userParentPhoneNumber: string;
  userParentGB: string;
  setUserParentName: (value: string) => void;
  setUserParentPhoneNumber: (value: string) => void;
  setUserParentGB: (value: string) => void;
  onPrevious: () => void;
  onNext: () => void;
}

export interface SignupStep5Props {
  setUserClasses: (value: string) => void;
  onPrevious: () => void;
  onNext: () => void;
}
