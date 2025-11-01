export const formFields = {
  name: {
    type: 'text' as const,
    label: 'Full Name',
    placeholder: 'Enter your name',
    className: 'col-span-1',
  },
  email: {
    type: 'email' as const,
    label: 'Email Address',
    placeholder: 'your.email@example.com',
    className: 'col-span-1',
  },
  phoneNumber: {
    type: 'tel' as const,
    label: 'Phone Number',
    placeholder: '+1 (555) 123-4567',
    optional: true,
    className: 'col-span-1',
  },
  feedbackType: {
    type: 'select' as const,
    label: 'Feedback Type',
    placeholder: 'Select feedback type',
    className: 'col-span-1',
    options: [
      { value: 'general', label: 'General Feedback' },
      { value: 'bug', label: 'Bug Report' },
      { value: 'feature', label: 'Feature Request' },
      { value: 'other', label: 'Other' },
    ],
  },
  suggestions: {
    type: 'textarea' as const,
    label: 'Your Feedback',
    placeholder: 'Please provide detailed feedback...',
    className: 'col-span-2',
  },
  attachment: {
    type: 'file' as const,
    label: 'Attachment',
    accept: 'image/*,.pdf,.doc,.docx',
    optional: true,
    className: 'col-span-2',
  },
} as const;

export type FormFieldName = keyof typeof formFields;
