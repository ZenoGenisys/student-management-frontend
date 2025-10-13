import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStudentById } from '../repositories';
import { PATH } from '../routes';

const useStudentDetails = () => {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  const [tabValue, setTabValue] = useState(0);

  const { data } = useQuery({
    queryKey: ['student-details', studentId],
    queryFn: () => {
      if (!studentId) {
        return null;
      }
      return getStudentById(studentId as string);
    },
  });

  const handleTabChange = useCallback((_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  }, []);

  const handleEdit = useCallback(() => {
    if (studentId) {
      navigate(PATH.EDIT_STUDENT.replace(':studentId', studentId));
    }
  }, [navigate, studentId]);

  return useMemo(
    () => ({
      data,
      tabValue,
      handleEdit,
      handleTabChange,
    }),
    [data, tabValue, handleEdit, handleTabChange],
  );
};

export default useStudentDetails;
