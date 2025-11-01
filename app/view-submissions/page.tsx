'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import SubmissionsTable from '@/components/feedback/submissions-table';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { useSubmissions } from '@/hooks/useSubmissions';
import type { FeedbackSubmission } from '@/types/database.types';

export default function ViewSubmissionsPage() {
  const { data: submissions = [], isLoading, error } = useSubmissions();

  const handleViewDetails = (submission: FeedbackSubmission) => {
    console.log('View details for:', submission.id);
  };

  const handleMarkResolved = (submission: FeedbackSubmission) => {
    console.log('Mark resolved:', submission.id);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <LoadingSpinner size="lg" />
          <div className="text-lg">Loading submissions...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-500">Error loading submissions</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Feedback Submissions</h1>
          <p className="text-muted-foreground">Manage and review user feedback</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <SubmissionsTable 
        submissions={submissions}
        onViewDetails={handleViewDetails}
        onMarkResolved={handleMarkResolved}
      />
    </div>
  );
}