import RoundLabel from '@/components/shared/RoundLabel';
import Spacing from '@/components/shared/Spacing';
import { flexColumn, flexRow, flexRowSpaceBetweenCenter } from '@/styles/flex';

interface IClassCardProps {
  title: string;
  room: string;
  teacher: string;
  startTime: string;
  endTime: string;
  bgColor: string;
}

function ClassCard({
  title,
  room,
  teacher,
  startTime,
  endTime,
  bgColor,
}: IClassCardProps) {
  return (
    <section className={`${flexColumn}`}>
      <div className={`${flexRowSpaceBetweenCenter}`}>
        <p className='text-xl font-bold'>{title}</p>
        <RoundLabel text={room} bgColor={bgColor} textColor='white' />
      </div>

      <Spacing size={4} />

      <p>{teacher}</p>

      <Spacing size={2} />

      <span className={`${flexRow}`}>
        <p>{startTime}</p>~<p>{endTime}</p>
      </span>
    </section>
  );
}

export default ClassCard;
