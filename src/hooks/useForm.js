import { useState } from 'react';

export default function useForm({ initialValues, validate, onSubmit }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (name) => (value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setSubmitted(false);
  };

  const handleSubmit = () => {
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return false;
    }
    onSubmit(values);
    setSubmitted(true);
    return true;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setSubmitted(false);
  };

  return { values, errors, submitted, handleChange, handleSubmit, reset };
}
