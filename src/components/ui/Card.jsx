// src/components/ui/Card.jsx

export default function Card({ children, className = "", ...props }) {
  return (
    <div className={`bg-white rounded-2xl shadow-md overflow-hidden p-8 text-center ${className}`}
    // props -> id du scenario
      {...props}>
      {children}
    </div>
  );
}