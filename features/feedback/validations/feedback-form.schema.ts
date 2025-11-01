import { z } from 'zod';

export const feedbackFormSchema = z.object({
  name: z.string()
    .min(5, 'Name must be at least 5 characters')
    .max(50, 'Name must not exceed 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: z.string()
    .email('Invalid email address')
    .min(5, 'Email is required')
    .max(100, 'Email must not exceed 100 characters'),
  phoneNumber: z.string()
    .optional()
    .refine((val) => !val || /^\d{10}$/.test(val), {
      message: 'Phone number must be exactly 10 digits'
    }),
  feedbackType: z.enum(['general', 'bug', 'feature', 'other'] as const),
  suggestions: z.string()
    .min(20, 'Please provide at least 20 characters of detailed feedback')
    .max(1000, 'Feedback must not exceed 1000 characters'),
  attachment: z.any().optional(),
});

export type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;
