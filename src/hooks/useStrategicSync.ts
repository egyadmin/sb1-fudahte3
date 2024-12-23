import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase/strategic';
import { useToast } from './useToast';

export const useStrategicSync = () => {
  const [syncing, setSyncing] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const metricsSubscription = supabase
      .channel('strategic_metrics_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'strategic_metrics' },
        (payload) => {
          console.log('Metrics changed:', payload);
          // Handle metrics update
      })
      .subscribe();

    const resourcesSubscription = supabase
      .channel('strategic_resources_changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'strategic_resources' },
        (payload) => {
          console.log('Resources changed:', payload);
          // Handle resources update
      })
      .subscribe();

    return () => {
      metricsSubscription.unsubscribe();
      resourcesSubscription.unsubscribe();
    };
  }, []);

  const syncData = async () => {
    try {
      setSyncing(true);
      // Sync logic here
      showToast('Data synchronized successfully', 'success');
    } catch (error) {
      showToast('Failed to sync data', 'error');
    } finally {
      setSyncing(false);
    }
  };

  return { syncing, syncData };
};