import { useState } from 'react';
import axiosInstance from '../../../hooks/useManagerClassAxios';

export const useDupRoomIdx = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkDuplication = async (
    roomIndex: string,
    teacherId: number,
    classDate: string,
    startTime: string,
    endTime: string,
  ) => {
    setIsLoading(true);
    setError(null);

    console.log('Checking duplication with:', {
      roomIndex,
      teacherId,
      classDate,
      startTime,
      endTime,
    });

    try {
      const response = await axiosInstance.post('/checkDupMap', {
        ROOM_IDX: roomIndex,
        TEACHER_SEQ: teacherId,
        CLASS_DATE: classDate,
        START_TIME: startTime,
        END_TIME: endTime,
      });

      if (response.status == 200) {
        switch (response.data.result.dupStatus) {
          case 'teacherDup':
            alert('선택하신 시간에는 해당 선생님이 수업중 입니다.');
            break;
          case 'roomDup':
            alert('선택하신 시간에는 해당 강의실이 사용중입니다.');

            break;
          case 'All':
            alert(
              '선택하신 시간에는 해당 선생님과 해당 강의실이 사용중입니다.',
            );

            break;
          default:
            break;
        }
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error: any) {
      setError(
        error.message || 'Error occurred while checking room duplication.',
      );
      console.error('Error checking duplication:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, checkDuplication };
};
