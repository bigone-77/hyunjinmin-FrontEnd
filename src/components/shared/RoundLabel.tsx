import { flexCenter } from '@/styles/flex';

interface IRoundLabelProps {
  bgColor?: string;
  textColor?: string;
  text: string;
}

function RoundLabel({
  bgColor = 'white',
  textColor = 'black',
  text,
}: IRoundLabelProps) {
  // const labelStyles = `bg-${bgColor} text-${textColor}`;
  return (
    <p
      className={`${flexCenter} px-4 pt-[2px] rounded-[23px] border text-sm shadow-inner font-semibold text-center`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {text}
    </p>
  );
}

export default RoundLabel;
