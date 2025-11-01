import { NextRequest, NextResponse } from 'next/server';
import { submitFeedback, type CreateFeedbackInput } from '@/lib/services/feedback';
import type { FeedbackType } from '@/types/database.types';

/**
 * Handles feedback form submission
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    
    // Extract and prepare data for service
    const feedbackInput: CreateFeedbackInput = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone_number: formData.get('phoneNumber') as string || null,
      feedback_type: formData.get('feedbackType') as FeedbackType,
      suggestions: formData.get('suggestions') as string,
      attachment: formData.get('attachment') as File || undefined,
    };

    // Submit feedback using service
    const result = await submitFeedback(feedbackInput);

    return NextResponse.json({
      success: true,
      data: {
        id: result.id,
        status: result.status,
      },
    }, { status: 201 });

  } catch (error) {
    console.error('Feedback submission error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit feedback',
    }, { status: 400 });
  }
}