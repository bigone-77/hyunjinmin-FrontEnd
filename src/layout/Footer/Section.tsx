import { Link, useLocation } from 'react-router-dom';
import { IconType } from 'react-icons';
import { GoDotFill } from 'react-icons/go';

interface IFooterSectionProps {
  icon: IconType;
  url: string;
}

function FooterSection({ icon: Icon, url }: IFooterSectionProps) {
  const location = useLocation();
  const selected = url === location.pathname;

  return (
    <Link
      to={url}
      className='relative transition-all duration-100 ease-in-out '
    >
      <Icon
        size={30}
        className={`${selected && 'text-primary'} hover:text-primary`}
      />
      {selected && (
        <GoDotFill size={10} className='absolute left-1/3 text-primary' />
      )}
    </Link>
  );
}

export default FooterSection;
