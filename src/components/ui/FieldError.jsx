// components/ui/FieldError.jsx
export function FieldError({ error }) {
    if (!error) return null;
    return <span className="text-red-600 text-sm">{error.message}</span>;
}