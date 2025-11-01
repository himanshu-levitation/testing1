'use client';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useFeedbackForm } from '@/hooks/use-feedback-form';
import { FormBuilder } from './form-builder';
import type { FeedbackFormValues } from '@/features/feedback/validations/feedback-form.schema';

export function FeedbackForm() {
  const { submitFeedback, isSubmitting, error, ...form } = useFeedbackForm();

  const onSubmit = (data: FeedbackFormValues) => {
    submitFeedback(data);
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormBuilder />
          {error && (
            <div className="text-red-500 text-sm">
              {error.message}
            </div>
          )}
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
