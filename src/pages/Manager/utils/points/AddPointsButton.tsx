import { AddPointsButtonProps } from './PointsInter';

function AddPointsButton({ type, onClick }: AddPointsButtonProps) {
  const buttonStyles =
    type === 'reward'
      ? 'bg-positive hover:bg-positive-hover'
      : 'bg-negative hover:bg-negative-hover';

  const buttonText = type === 'reward' ? '상점 추가' : '벌점 추가';

  return (
    <button
      onClick={onClick}
      className={`${buttonStyles} text-white p-1 rounded btn-shadow`}
    >
      {buttonText}
    </button>
  );
}

export default AddPointsButton;
