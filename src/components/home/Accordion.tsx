import { useState } from 'react';

import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

import { flexCenter, flexColumn, flexRow } from '@/styles/flex';

import Spacing from '@/components/shared/Spacing';
import RoundLabel from '@/components/shared/RoundLabel';

interface IAccordionProps {
  name: string;
  school: string;
  classDay: string;
  totalPoints: number;
}

const Accordion = ({
  name,
  school,
  classDay,
  totalPoints,
}: IAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const pointsString =
    totalPoints > 0 ? `상점 ${totalPoints}점` : `벌점 ${totalPoints}점`;

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='pt-4 pl-4 pr-4 text-white rounded-2xl bg-primary'>
      <button
        className={`flex items-center justify-between w-full`}
        onClick={toggleAccordion}
      >
        <div className={`${flexCenter} gap-x-4`}>
          <p className='text-xl font-bold'>{name}</p>
          <RoundLabel text='학생' />
        </div>
        {isOpen ? (
          <IoIosArrowUp color='white' size={20} />
        ) : (
          <IoIosArrowDown color='white' size={20} />
        )}
      </button>
      <Spacing size={10} />

      <div
        className={`overflow-hidden duration-500 ease-in-out gap-y-2 ${flexColumn} ${
          isOpen ? 'max-h-52 pb-4' : 'max-h-0'
        }`}
      >
        <p>{school}</p>
        <div className={`${flexRow} gap-x-4`}>
          <p>{classDay} 반</p>
          <p className={`${totalPoints > 0 ? 'text-green' : 'text-red'}`}>
            {pointsString}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
