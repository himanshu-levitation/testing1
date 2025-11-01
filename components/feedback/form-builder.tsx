'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FeedbackFormValues } from '@/features/feedback/validations/feedback-form.schema';
import { formFields } from '@/features/feedback/constants/form-fields';

// Define the field configuration type from the existing schema
type FormFieldConfig = typeof formFields[keyof typeof formFields];

// Type guard for select fields
const isSelectField = (config: FormFieldConfig): config is FormFieldConfig & { type: 'select' } => {
  return config.type === 'select';
};

// Type guard for textarea fields
const isTextareaField = (config: FormFieldConfig): config is FormFieldConfig & { type: 'textarea' } => {
  return config.type === 'textarea';
};

// Enhanced field props with proper typing
interface FormFieldProps {
  field: {
    value: any;
    onChange: (value: any) => void;
    onBlur: () => void;
    name: string;
    ref: React.Ref<any>;
  };
  fieldConfig: FormFieldConfig;
}

const renderField = ({ field, fieldConfig }: FormFieldProps) => {
  // Common props for all input types
  const commonProps = {
    id: field.name,
    name: field.name,
    onBlur: field.onBlur,
    'aria-required': !('optional' in fieldConfig) || !fieldConfig.optional,
    'aria-invalid': false,
    className: 'w-full transition-colors',
  };

  // Handle file input
  if (fieldConfig.type === 'file') {
    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Input
          type="file"
          accept={fieldConfig.accept}
          onChange={(e) => field.onChange(e.target.files)}
          className="cursor-pointer"
        />
        <p className="text-xs text-muted-foreground">
          Accepted formats: {fieldConfig.accept}
        </p>
      </div>
    );
  }

  // Handle select fields
  if (isSelectField(fieldConfig)) {
    return (
      <Select
        onValueChange={field.onChange}
        value={field.value}
        defaultValue={field.value}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={fieldConfig.placeholder} />
        </SelectTrigger>
        <SelectContent>
          {fieldConfig.options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  // Handle textarea fields
  if (isTextareaField(fieldConfig)) {
    return (
      <Textarea
        {...commonProps}
        placeholder={fieldConfig.placeholder}
        value={field.value ?? ''}
        onChange={field.onChange}
        rows={4}
      />
    );
  }

  // Handle regular input fields
  return (
    <Input
      {...commonProps}
      type={fieldConfig.type}
      placeholder={'placeholder' in fieldConfig ? fieldConfig.placeholder : ''}
      value={field.value ?? ''}
      onChange={field.onChange}
    />
  );
};

// Group fields into rows based on their className
export function FormBuilder() {
  const { control } = useFormContext<FeedbackFormValues>();
  
  // Convert formFields to an array of entries
  const formFieldsArray = Object.entries(formFields);
  const rows: Array<Array<[string, any]>> = [];
  
  // Group fields into rows
  for (let i = 0; i < formFieldsArray.length; i++) {
    const [name, config] = formFieldsArray[i];
    
    if (config.className?.includes('col-span-2')) {
      // Full width field, add as a single item row
      rows.push([[name, config]]);
    } else {
      // Half width field, try to pair with next field if it's also half width
      if (i + 1 < formFieldsArray.length) {
        const nextConfig = formFieldsArray[i + 1][1];
        if (nextConfig.className?.includes('col-span-1')) {
          rows.push([formFieldsArray[i], formFieldsArray[i + 1]]);
          i++; // Skip the next field as it's been added to this row
          continue;
        }
      }
      // If no pair found or next field is full width, add as single item row
      rows.push([[name, config]]);
    }
  }

  return (
    <div className="space-y-6">
      {rows.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {row.map(([name, config]) => {
            const fieldName = name as keyof FeedbackFormValues;
            const isOptional = 'optional' in config && config.optional === true;
            
            return (
              <FormField
                key={name}
                control={control}
                name={fieldName}
                render={({ field, fieldState: { error } }) => (
                  <div className={config.className || 'col-span-1'}>
                    <FormItem className="space-y-2 h-full">
                      <div className="flex items-center justify-between">
                        <FormLabel htmlFor={field.name} className="text-sm font-medium leading-none">
                          {config.label}
                        </FormLabel>
                        {isOptional && (
                          <span className="text-xs text-muted-foreground">
                            Optional
                          </span>
                        )}
                      </div>
                      <FormControl>
                        {renderField({ field, fieldConfig: config })}
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  </div>
                )}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
