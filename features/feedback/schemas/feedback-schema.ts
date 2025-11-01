// Pure TypeScript types and interfaces
export type FeedbackType = 'general' | 'bug' | 'feature' | 'other';

export interface FeedbackFormValues {
  name: string;
  email: string;
  phoneNumber?: string;
  feedbackType: FeedbackType;
  suggestions: string;
}

// Field types for the form builder
export type FormFieldType = 'text' | 'email' | 'tel' | 'select' | 'textarea';

export interface FormFieldOption {
  value: string;
  label: string;
}

export interface FormFieldConfig {
  type: FormFieldType;
  label: string;
  placeholder?: string;
  optional?: boolean;
  options?: FormFieldOption[];
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
}
