import { createClient } from '../supabase/client';
import type {
  FeedbackSubmission,
  FeedbackSubmissionInsert,
  FeedbackSubmissionUpdate,
  FeedbackStatus
} from "@/types/database.types";

const supabase = createClient();
const FEEDBACK_TABLE = 'feedback_submissions';
const FEEDBACK_ATTACHMENTS_BUCKET = 'feedback-attachments';

export type CreateFeedbackInput = Omit<FeedbackSubmissionInsert, 'status' | 'attachment_url'> & {
  attachment?: File;
};

/**
 * Uploads feedback attachment to storage and returns public URL
 */
export async function uploadFeedbackAttachment(attachment: File): Promise<string> {
  const fileExt = attachment.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `attachments/${fileName}`;
  
  const { error: uploadError } = await supabase.storage
    .from(FEEDBACK_ATTACHMENTS_BUCKET)
    .upload(filePath, attachment);
  
  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from(FEEDBACK_ATTACHMENTS_BUCKET)
    .getPublicUrl(filePath);
  
  if (!publicUrl) {
    throw new Error('Failed to get public URL for uploaded file');
  }

  return publicUrl;
}

/**
 * Creates a new feedback record in the database
 */
export async function createFeedbackRecord(
  feedbackData: Omit<FeedbackSubmissionInsert, 'status' | 'attachment_url'>,
  fileUrl: string | null
): Promise<FeedbackSubmission> {
  const { data, error } = await supabase
    .from(FEEDBACK_TABLE)
    .insert([{ 
      ...feedbackData, 
      attachment_url: fileUrl,
      status: 'in_review' as const 
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Submits feedback with optional file attachment
 */
export async function submitFeedback(feedback: CreateFeedbackInput): Promise<FeedbackSubmission> {
  const { attachment, ...feedbackData } = feedback;
  let fileUrl: string | null = null;

  if (attachment) {
    fileUrl = await uploadFeedbackAttachment(attachment);
  }

  return await createFeedbackRecord(feedbackData, fileUrl);
}

/**
 * Retrieves list of feedback submissions with optional filters
 */
export async function getFeedbackList(filters: Partial<FeedbackSubmission> = {}): Promise<FeedbackSubmission[]> {
  let query = supabase
    .from(FEEDBACK_TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (Object.keys(filters).length > 0) {
    query = query.match(filters);
  }

  const { data, error } = await query;
  if (error) throw error;
  
  return data || [];
}

/**
 * Retrieves a single feedback submission by ID
 */
export async function getFeedbackById(id: string): Promise<FeedbackSubmission> {
  const { data, error } = await supabase
    .from(FEEDBACK_TABLE)
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  if (!data) throw new Error('Feedback not found');
  
  return data;
}

/**
 * Updates the status of a feedback submission
 */
export async function updateFeedbackStatus(id: string, status: FeedbackStatus): Promise<FeedbackSubmission> {
  const updateData: Partial<FeedbackSubmissionUpdate> = { 
    status, 
    updated_at: new Date().toISOString() 
  };

  const { data, error } = await supabase
    .from(FEEDBACK_TABLE)
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  if (!data) throw new Error('Failed to update feedback status');
  
  return data;
}
