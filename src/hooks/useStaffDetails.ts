import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from '../routes';
import { getStaffById } from '../repositories';
import { useQuery } from '@tanstack/react-query';

const useStaffDetails = () => {
  const navigate = useNavigate();
  const { staffId } = useParams<{ staffId: string }>();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = useCallback((_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ['staff', staffId],
    queryFn: () => {
      if (!staffId) {
        return null;
      }
      return getStaffById(staffId as string);
    },
  });

  const handleEdit = useCallback(() => {
    if (staffId) {
      navigate(PATH.EDIT_STAFF.replace(':staffId', staffId));
    }
  }, [navigate, staffId]);

  const handlePromote = useCallback(() => {
    // TODO: Implement promote functionality
  }, []);

  return useMemo(
    () => ({ data, isLoading, error, tabValue, handleTabChange, handleEdit, handlePromote }),
    [data, isLoading, error, tabValue, handleTabChange, handleEdit, handlePromote],
  );
};

export default useStaffDetails;
