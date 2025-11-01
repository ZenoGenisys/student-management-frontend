import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from '../routes';
import { getStaffById, revokeStaffPromotion } from '../repositories';
import { useQuery } from '@tanstack/react-query';
import { useLoading, useSnackbar } from '../state';

const useStaffDetails = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const { setLoading } = useLoading();
  const { staffId } = useParams<{ staffId: string }>();
  const [tabValue, setTabValue] = useState(0);
  const [showPromote, setShowPromote] = useState(false);
  const [showRevoke, setShowRevoke] = useState(false);

  const handleTabChange = useCallback((_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  }, []);

  const { data, error, refetch } = useQuery({
    queryKey: ['staff', staffId],
    queryFn: async () => {
      if (!staffId) {
        return null;
      }
      setLoading(true);
      try {
        const response = await getStaffById(staffId as string);
        return response;
      } finally {
        setLoading(false);
      }
    },
    enabled: !!staffId,
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

  const handleToggleRevoke = useCallback(() => {
    setShowRevoke((prev) => !prev);
  }, []);

  const handleRevoke = useCallback(async () => {
    setLoading(true);
    try {
      await revokeStaffPromotion(Number(staffId));
      showSnackbar({
        message: 'Staff revoked successfully!',
        severity: 'success',
      });
      setShowRevoke(false);
      refetch();
    } catch (error) {
      showSnackbar({
        message: error instanceof Error ? error.message : 'Failed to revoke staff promotion',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [refetch, showSnackbar, staffId, setLoading]);

  return useMemo(
    () => ({
      data,
      error,
      tabValue,
      showPromote,
      showRevoke,
      handleTabChange,
      handleEdit,
      handlePromote,
      handlePromoteSuccess,
      handleToggleRevoke,
      handleRevoke,
    }),
    [
      data,
      error,
      tabValue,
      showPromote,
      showRevoke,
      handleTabChange,
      handleEdit,
      handlePromote,
      handlePromoteSuccess,
      handleToggleRevoke,
      handleRevoke,
    ],
  );
};

export default useStaffDetails;
