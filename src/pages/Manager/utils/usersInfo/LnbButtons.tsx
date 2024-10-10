import { Link } from 'react-router-dom';

interface TabButtonProps {
  to: string;
  children: React.ReactNode;
  isSelected: boolean;
}

function LnbButton({ to, children, isSelected }: TabButtonProps) {
  return (
    <Link to={to} className='text-decoration-none'>
      <button
        className={`mx-4 px-4 py-2 rounded relative transition-colors duration-200 hover:font-semibold ${
          isSelected ? 'underline decoration-2 font-bold text-white' : ''
        }`}
      >
        {children}
      </button>
    </Link>
  );
}

export default LnbButton;
