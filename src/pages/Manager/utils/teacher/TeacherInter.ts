export interface Teacher {
  id: number;
  name: string;
  subject: string;
}

export interface TeacherTableProps {
  teachers: Teacher[];
  refetch: () => void;
}
