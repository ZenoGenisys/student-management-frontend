import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from '../routes';
import { getStaffById, revokeStaffPromotion } from '../repositories';
import { useQuery } from '@tanstack/react-query';
import { useSnackbar } from '../state';

const useStaffDetails = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const { staffId } = useParams<{ staffId: string }>();
  const [tabValue, setTabValue] = useState(0);
  const [showPromote, setShowPromote] = useState(false);

  const handleTabChange = useCallback((_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  }, []);

  const { data, isLoading, error, refetch } = useQuery({
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
    setShowPromote((prev) => !prev);
  }, []);

  const handlePromoteSuccess = useCallback(() => {
    refetch();
    setShowPromote(false);
  }, [refetch]);

  const handleRevoke = useCallback(async () => {
    try {
      await revokeStaffPromotion(Number(staffId));
      showSnackbar({
        message: 'Staff revoked successfully!',
        severity: 'success',
      });
      refetch();
    } catch (error) {
      showSnackbar({
        message: error instanceof Error ? error.message : 'Failed to revoke staff promotion',
        severity: 'error',
      });
    }
  }, [refetch, showSnackbar, staffId]);

  return useMemo(
    () => ({
      data,
      isLoading,
      error,
      tabValue,
      showPromote,
      handleTabChange,
      handleEdit,
      handlePromote,
      handlePromoteSuccess,
      handleRevoke,
    }),
    [
      data,
      isLoading,
      error,
      tabValue,
      showPromote,
      handleTabChange,
      handleEdit,
      handlePromote,
      handlePromoteSuccess,
      handleRevoke,
    ],
  );
};

export default useStaffDetails;
