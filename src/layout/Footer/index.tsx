import { useMemo } from 'react';

import { GoHome } from 'react-icons/go';
import {
  RiCalendarScheduleLine,
  RiDashboardHorizontalLine,
} from 'react-icons/ri';
import { LuUser2 } from 'react-icons/lu';

import FooterSection from '@/layout/Footer/Section';

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
        url: '/timeBoard',
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
    <footer className='grid grid-cols-4 py-6 place-items-center rounded-3xl bg-pink'>
      {ICONS.map((icon) => (
        <FooterSection key={icon.id} icon={icon.icon} url={icon.url} />
      ))}
    </footer>
  );
}

export default Footer;