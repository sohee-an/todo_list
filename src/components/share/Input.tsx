import {
  FieldErrors,
  UseFormRegister,
  FieldValues,
  Path,
} from 'react-hook-form';

interface Props<T extends FieldValues> {
  label?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  type?: string;
  placeholder?: string;
  errors: FieldErrors<T>;
}

const Input = <T extends FieldValues>({
  label,
  name,
  register,
  type = 'text',
  placeholder,
  errors,
}: Props<T>) => {
  return (
    <div className="mb-6">
      {label && (
        <label htmlFor={name} className="block text-gray-700">
          {label}
        </label>
      )}
      <input
        {...register(name)}
        type={type}
        id={name}
        placeholder={placeholder}
        className={`mt-1 block w-full px-3 py-2 bg-white border ${
          errors[name] ? 'border-red-500' : 'border-gray-300'
        } rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50`}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">
          {String(errors[name]?.message)}
        </p>
      )}
    </div>
  );
};

export default Input;
