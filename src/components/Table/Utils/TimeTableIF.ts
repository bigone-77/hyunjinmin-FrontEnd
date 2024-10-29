export interface ToggleButtonsProps {
  isWeekend: boolean;
  setIsWeekend: (value: boolean) => void;
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

export interface HeaderRowProps {
  days: string[];
  isWeekend: boolean;
}

export interface ClassCellProps {
  currentClass: any;
  timeSlots: string[];
  slotIndex: number;
  minute: string;
  day: string;
  isManagerPage?: boolean;
}
