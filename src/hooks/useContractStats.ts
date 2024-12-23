import { useMemo } from 'react';

export const useContractStats = () => {
  const stats = useMemo(() => ({
    active: 12,
    expiring: 3,
    expired: 2
  }), []);

  return { stats };
};