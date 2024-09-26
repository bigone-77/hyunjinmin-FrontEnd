import { FcAssistant } from 'react-icons/fc';

function FloatingButton() {
  return (
    <div className='p-2 border border-secondary rounded-full z-[9999px] cursor-pointer bg-secondary'>
      <FcAssistant size={40} />
    </div>
  );
}

export default FloatingButton;
