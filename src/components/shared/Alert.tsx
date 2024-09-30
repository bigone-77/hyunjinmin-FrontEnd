import Dimmed from './Dimmed';

interface AlertProps {
  open?: boolean;
  title: React.ReactNode;
  description?: React.ReactNode;
  buttonLabel?: string;
  onButtonClick: () => void;
}

function Alert({
  open,
  title,
  description,
  buttonLabel = '확인',
  onButtonClick,
}: AlertProps) {
  if (open === false) {
    return null;
  }

  return (
    <Dimmed>
      <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg overflow-hidden z-alert w-80 p-6 box-border'>
        <p className='mb-[6px] text-base'>{title}</p>
        {description ? <p className='text-sm'>{description}</p> : null}
        <div>
          <button onClick={onButtonClick}>{buttonLabel}</button>
        </div>
      </div>
    </Dimmed>
  );
}

export default Alert;
