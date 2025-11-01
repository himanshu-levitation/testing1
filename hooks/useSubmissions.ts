import { useQuery } from '@tanstack/react-query';
import type { FeedbackSubmission } from '@/types/database.types';

const fetchSubmissions = async (): Promise<FeedbackSubmission[]> => {
  const response = await fetch('/api/feedback-submissions', {
    headers: {
      'Authorization': process.env.NEXT_PUBLIC_AUTHORIZATION_TOKEN || '',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch submissions');
  }
  
  return response.json();
};

export const useSubmissions = () => {
  return useQuery({
    queryKey: ['submissions'],
    queryFn: fetchSubmissions,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime in v5)
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
  });
};