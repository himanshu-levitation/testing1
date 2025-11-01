'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { feedbackFormSchema, FeedbackFormValues } from '../features/feedback/validations/feedback-form.schema';

const submitFeedback = async (data: FeedbackFormValues) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('phoneNumber', data.phoneNumber || '');
  formData.append('feedbackType', data.feedbackType);
  formData.append('suggestions', data.suggestions);
  
  if (data.attachment && data.attachment[0]) {
    formData.append('attachment', data.attachment[0]);
  }

  const response = await fetch('/api/feedback-form', {
    method: 'POST',
    headers: {
      'Authorization': process.env.NEXT_PUBLIC_AUTHORIZATION_TOKEN || '',
    },
    body: formData,
  });
  
  if (!response.ok) throw new Error('Failed to submit feedback');
  return response.json();
};

export function useFeedbackForm() {
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      feedbackType: 'general',
      suggestions: '',
    },
  });

  const mutation = useMutation({
    mutationFn: submitFeedback,
    onSuccess: () => {
      form.reset();
    },
  });

  return {
    ...form,
    submitFeedback: mutation.mutate,
    isSubmitting: mutation.isPending,
    error: mutation.error,
  };
}
