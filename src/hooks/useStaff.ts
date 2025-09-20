import { useQuery } from '@tanstack/react-query';
import { getStaff } from '../repositories';
import { useEffect } from 'react';

const useStaff = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ['staff'],
    queryFn: () =>
      getStaff({
        page: 1,
        size: 100,
      }),
  });

  useEffect(() => {
    console.log('Staff data:', data);
  }, [data]);

  return { data, isPending, error };
};
export default useStaff;
