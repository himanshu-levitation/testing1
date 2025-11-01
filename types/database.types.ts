export interface Database {
  public: {
    Tables: {
      feedback_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone_number: string | null;
          feedback_type: 'general' | 'bug' | 'feature' | 'other';
          suggestions: string;
          attachment_url: string | null;
          status: 'in_review' | 'resolved';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['feedback_submissions']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['feedback_submissions']['Row']>;
      };
    };
    Enums: {
      feedback_status: 'in_review' | 'resolved';
      feedback_type: 'general' | 'bug' | 'feature' | 'other';
    };
  };
}
export type FeedbackSubmission = Database['public']['Tables']['feedback_submissions']['Row'];
export type FeedbackSubmissionInsert = Database['public']['Tables']['feedback_submissions']['Insert'];
export type FeedbackSubmissionUpdate = Database['public']['Tables']['feedback_submissions']['Update'];
export type FeedbackStatus = Database['public']['Enums']['feedback_status'];
export type FeedbackType = Database['public']['Enums']['feedback_type'];