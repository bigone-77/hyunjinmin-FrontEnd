export interface StudentPoints {
  id: string;
  name: string;
  age: number;
  school: string;
  rewardPoints: number;
  penaltyPoints: number;
  totalPoints: number;
}

export interface StudentPointsTableProps {
  students: StudentPoints[];
}

export interface PointsPopupProps {
  isOpen: boolean;
  student: StudentPoints | null;
  onClose: () => void;
}

export interface AddPointsButtonProps {
  type: 'reward' | 'penalty';
  onClick: () => void;
}
