interface AddPointsButtonProps {
  type: 'reward' | 'penalty';
  onClick: () => void;
}

function AddPointsButton({ type, onClick }: AddPointsButtonProps) {
  const buttonStyles =
    type === 'reward' ? 'bg-green hover:bg-green' : 'bg-red hover:bg-red';

  const buttonText = type === 'reward' ? '상점 추가' : '벌점 추가';

  return (
    <button
      onClick={onClick}
      className={`${buttonStyles} text-white p-1 rounded transition-colors`}
    >
      {buttonText}
    </button>
  );
}

export default AddPointsButton;
