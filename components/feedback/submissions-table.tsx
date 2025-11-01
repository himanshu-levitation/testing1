'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Search, Filter } from 'lucide-react';
import type { FeedbackSubmission, FeedbackStatus, FeedbackType } from '@/types/database.types';

const FEEDBACK_TYPES = ['general', 'bug', 'feature', 'other'] as const;
const FEEDBACK_STATUSES = ['in_review', 'resolved'] as const;

const TYPE_LABELS = { general: 'General', bug: 'Bug Report', feature: 'Feature Request', other: 'Other' };
const STATUS_LABELS = { in_review: 'In Review', resolved: 'Resolved' };
const STATUS_COLORS = { resolved: 'bg-green-100 text-green-800', in_review: 'bg-yellow-100 text-yellow-800' };
const TYPE_COLORS = { general: 'bg-blue-100 text-blue-800', bug: 'bg-red-100 text-red-800', feature: 'bg-purple-100 text-purple-800', other: 'bg-gray-100 text-gray-800' };

const TABLE_COLUMNS = [
  { key: 'name', label: 'Name', width: 'w-1/6' },
  { key: 'email', label: 'Email', width: 'w-1/6' },
  { key: 'feedback_type', label: 'Type', width: 'w-1/8' },
  { key: 'status', label: 'Status', width: 'w-1/8' },
  { key: 'suggestions', label: 'Feedback', width: 'w-1/4' },
  { key: 'created_at', label: 'Date', width: 'w-1/8' },
  { key: 'actions', label: 'Actions', width: 'w-1/8' }
];

interface SubmissionsTableProps {
  submissions: FeedbackSubmission[];
  onViewDetails?: (submission: FeedbackSubmission) => void;
  onMarkResolved?: (submission: FeedbackSubmission) => void;
}

export default function SubmissionsTable({ 
  submissions, 
  onViewDetails, 
  onMarkResolved 
}: SubmissionsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<FeedbackStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<FeedbackType | 'all'>('all');

  const filteredSubmissions = useMemo(() => {
    let filtered = submissions;

    if (searchTerm) {
      filtered = filtered.filter(sub => 
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.suggestions.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(sub => sub.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(sub => sub.feedback_type === typeFilter);
    }

    return filtered;
  }, [submissions, searchTerm, statusFilter, typeFilter]);
  const getStatusColor = (status: string) => {
    return STATUS_COLORS[status as keyof typeof STATUS_COLORS] || STATUS_COLORS.in_review;
  };

  const getTypeColor = (type: string) => {
    return TYPE_COLORS[type as keyof typeof TYPE_COLORS] || TYPE_COLORS.other;
  };

  const handleDownload = async (attachmentUrl: string, submissionName: string) => {
    try {
      const response = await fetch(attachmentUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${submissionName}_attachment`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as FeedbackStatus | 'all')}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {FEEDBACK_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {STATUS_LABELS[status]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as FeedbackType | 'all')}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {FEEDBACK_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {TYPE_LABELS[type]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {filteredSubmissions.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">
              {submissions.length === 0 ? 'No submissions found' : 'No submissions match your filters'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            {TABLE_COLUMNS.map((column) => (
              <th key={column.key} className={`text-left p-4 font-medium ${column.width}`}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredSubmissions.map((submission) => (
            <tr key={submission.id} className="border-b">
              <td className="p-4">
                <div className="font-medium">{submission.name}</div>
                {submission.phone_number && (
                  <div className="text-xs text-muted-foreground">{submission.phone_number}</div>
                )}
              </td>
              <td className="p-4 text-sm">{submission.email}</td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(submission.feedback_type)}`}>
                  {TYPE_LABELS[submission.feedback_type]}
                </span>
              </td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                  {STATUS_LABELS[submission.status]}
                </span>
              </td>
              <td className="p-4">
                <div className="text-sm line-clamp-2 max-w-xs">
                  {submission.suggestions}
                </div>
                {submission.attachment_url && (
                  <div className="text-xs text-muted-foreground mt-1">📎 Has attachment</div>
                )}
              </td>
              <td className="p-4 text-sm">
                <div>{new Date(submission.created_at).toLocaleDateString()}</div>
                <div className="text-xs text-muted-foreground">
                  {new Date(submission.created_at).toLocaleTimeString()}
                </div>
              </td>
              <td className="p-4">
                <div className="flex gap-2">
                  {submission.attachment_url && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownload(submission.attachment_url!, submission.name)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                  {submission.status === 'in_review' && (
                    <Button 
                      size="sm"
                      onClick={() => onMarkResolved?.(submission)}
                    >
                      Resolve
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
      )}

      <div className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Showing {filteredSubmissions.length} of {submissions.length} submissions
        </p>
      </div>
    </div>
  );
}