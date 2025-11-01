import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStudentById } from '../repositories';
import { PATH } from '../routes';
import { useLoading } from '../state';

const useStudentDetails = () => {
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const { studentId } = useParams<{ studentId: string }>();
  const [tabValue, setTabValue] = useState(0);

  const { data } = useQuery({
    queryKey: ['student-details', studentId],
    queryFn: async () => {
      if (!studentId) {
        return null;
      }
      setLoading(true);
      try {
        const response = await getStudentById(studentId as string);
        return response;
      } finally {
        setLoading(false);
      }
    },
    enabled: !!studentId,
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
