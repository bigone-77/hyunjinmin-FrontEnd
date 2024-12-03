import { useMemo } from 'react';

import { GoHome } from 'react-icons/go';
import {
  RiCalendarScheduleLine,
  RiDashboardHorizontalLine,
} from 'react-icons/ri';
import { LuUser2 } from 'react-icons/lu';

import FooterSection from '@/layout/Footer/Section';
import FloatingButton from '@/components/shared/FloatingButton';

function Footer() {
  const ICONS = useMemo(
    () => [
      {
        id: 'i1',
        icon: GoHome,
        url: '/',
      },
      {
        id: 'i2',
        icon: RiCalendarScheduleLine,
        url: '/time-board',
      },
      {
        id: 'i3',
        icon: RiDashboardHorizontalLine,
        url: '/board',
      },
      {
        id: 'i4',
        icon: LuUser2,
        url: '/profile',
      },
    ],
    [],
  );

  return (
    <footer className='relative grid grid-cols-4 w-full py-6 place-items-center bg-pink mx-auto z-10'>
      {ICONS.map((icon) => (
        <FooterSection key={icon.id} icon={icon.icon} url={icon.url} />
      ))}
      <div className='absolute right-8 -top-20'>
        <FloatingButton />
      </div>
    </footer>
  );
}

export default Footer;
