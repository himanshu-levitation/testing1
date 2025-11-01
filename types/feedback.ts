// For form submission
export type FeedbackType = 'general' | 'bug' | 'feature' | 'other';
export type FeedbackStatus = 'in_review' | 'resolved';

export interface FeedbackFormData {
  name: string;
  email: string;
  phoneNumber?: string;
  feedbackType: FeedbackType;
  suggestions: string;
  attachment?: FileList; 
}

export interface FeedbackResponse {
  success: boolean;
  error?: string;
  data?: {
    id: string;
    status: FeedbackStatus;
  };
}