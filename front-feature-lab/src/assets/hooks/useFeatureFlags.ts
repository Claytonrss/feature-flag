import { useQuery } from 'react-query';
import { fetchFeatureFlags } from '../../services/FeatureFlagService';

export const useFeatureFlags = () => {
  return useQuery("featureFlags", fetchFeatureFlags);
};
