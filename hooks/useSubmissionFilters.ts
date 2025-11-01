import { useMemo, useState } from 'react';
import type { FeedbackSubmission } from '@/types/database.types';

interface FilterState {
  searchTerm: string;
  statusFilter: string;
  typeFilter: string;
}

export const useSubmissionFilters = (submissions: FeedbackSubmission[]) => {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    statusFilter: 'all',
    typeFilter: 'all',
  });

  const filteredSubmissions = useMemo(() => {
    let filtered = submissions;

    if (filters.searchTerm) {
      filtered = filtered.filter(sub => 
        sub.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        sub.email.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        sub.suggestions.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    if (filters.statusFilter !== 'all') {
      filtered = filtered.filter(sub => sub.status === filters.statusFilter);
    }

    if (filters.typeFilter !== 'all') {
      filtered = filtered.filter(sub => sub.feedback_type === filters.typeFilter);
    }

    return filtered;
  }, [submissions, filters]);

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return {
    filters,
    filteredSubmissions,
    updateFilter,
  };
};