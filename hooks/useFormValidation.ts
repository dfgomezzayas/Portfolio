import { useState, useCallback } from "react";
import * as z from "zod";

interface UseFormValidationOptions<T> {
  schema: z.ZodSchema<T>;
  initialValues: T;
  onSubmit?: (data: T) => Promise<void> | void;
  onSubmitSuccess?: () => void;
}

export function useFormValidation<T extends Record<string, unknown>>({
  schema,
  initialValues,
  onSubmit,
  onSubmitSuccess,
}: UseFormValidationOptions<T>) {
  const [formState, setFormState] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focused, setFocused] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateField = useCallback(
    (name: string, value: unknown): string | undefined => {
      try {
        const fieldSchema = (schema as any).shape[name];
        if (!fieldSchema) return undefined;
        fieldSchema.parse(value);
        return undefined;
      } catch (error) {
        if (error instanceof z.ZodError) {
          return error.issues[0]?.message;
        }
        return "Validation error";
      }
    },
    [schema],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormState((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated[name];
          return updated;
        });
      }
    },
    [errors],
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFocused(null);
      const error = validateField(name, value);
      if (error) {
        setErrors((prev) => ({ ...prev, [name]: error }));
      } else {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated[name];
          return updated;
        });
      }
    },
    [validateField],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const result = schema.parse(formState);
        if (onSubmit) {
          await onSubmit(result);
        }
        setSubmitted(true);
        setFormState(initialValues);
        setErrors({});
        setTimeout(() => setSubmitted(false), 3000);
        onSubmitSuccess?.();
      } catch (error) {
        if (error instanceof z.ZodError) {
          const newErrors: Record<string, string> = {};
          error.issues.forEach((issue) => {
            const path = issue.path[0];
            if (path && typeof path === "string") {
              newErrors[path] = issue.message;
            }
          });
          setErrors(newErrors);
        } else {
          setSubmitError(
            error instanceof Error ? error.message : "submit_failed",
          );
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [schema, formState, initialValues, onSubmit, onSubmitSuccess],
  );

  return {
    formState,
    setFormState,
    errors,
    setErrors,
    focused,
    setFocused,
    isSubmitting,
    submitted,
    submitError,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
