'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FeedbackForm } from '@/components/feedback/feedback-form';

export default function FeedbackPage() {
  return (
    <div className="container py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Card className="border-border">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Share Your Feedback</CardTitle>
            <CardDescription className="text-muted-foreground">
              We'd love to hear your thoughts, suggestions, or report any issues you're experiencing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FeedbackForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
