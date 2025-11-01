import { NextRequest, NextResponse } from 'next/server';
import { getFeedbackList } from '@/lib/services/feedback';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const submissions = await getFeedbackList();
    
    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch submissions:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch submissions',
    }, { status: 500 });
  }
}