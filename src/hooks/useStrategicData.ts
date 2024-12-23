import { useState, useCallback, useEffect } from 'react';
import { strategicApi } from '../lib/supabase/strategic';

export const useStrategicData = () => {
  const [metrics, setMetrics] = useState([]);
  const [resources, setResources] = useState([]);
  const [qualityData, setQualityData] = useState([]);
  const [improvements, setImprovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          metricsData,
          resourcesData,
          qualityData,
          improvementsData
        ] = await Promise.all([
          strategicApi.getMetrics(),
          strategicApi.getResources(),
          strategicApi.getQualityData(),
          strategicApi.getImprovements()
        ]);

        setMetrics(metricsData.data || []);
        setResources(resourcesData.data || []);
        setQualityData(qualityData.data || []);
        setImprovements(improvementsData.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Add new data
  const addMetric = useCallback(async (data: any) => {
    try {
      const result = await strategicApi.addMetric(data);
      if (result.data) {
        setMetrics(prev => [result.data, ...prev]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add metric');
    }
  }, []);

  const addResource = useCallback(async (data: any) => {
    try {
      const result = await strategicApi.addResource(data);
      if (result.data) {
        setResources(prev => [result.data, ...prev]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add resource');
    }
  }, []);

  const addQualityData = useCallback(async (data: any) => {
    try {
      const result = await strategicApi.addQualityData(data);
      if (result.data) {
        setQualityData(prev => [result.data, ...prev]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add quality data');
    }
  }, []);

  const addImprovement = useCallback(async (data: any) => {
    try {
      const result = await strategicApi.addImprovement(data);
      if (result.data) {
        setImprovements(prev => [result.data, ...prev]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add improvement');
    }
  }, []);

  return {
    metrics,
    resources,
    qualityData,
    improvements,
    loading,
    error,
    addMetric,
    addResource,
    addQualityData,
    addImprovement
  };
};