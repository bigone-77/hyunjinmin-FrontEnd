type ButtonTheme = 'primary' | 'secondary' | 'sub' | 'login';

interface PrimaryButtonProps {
  theme?: ButtonTheme;
  children: string;
  disabled?: boolean;
  isGroup?: boolean;
  onClick: () => void;
}

const primary = 'bg-primary text-white rounded-lg';
const secondary = 'bg-secondary text-white rounded-lg';
const sub = 'bg-sub text-white rounded-lg';
const login = 'text-white';
const disabledStyle = 'disabled:bg-mono100 disabled:text-mono200';

const color: Record<ButtonTheme, string> = {
  primary,
  secondary,
  sub,
  login,
};

function BaseButton({
  onClick,
  theme = 'primary',
  disabled = false,
  isGroup = false,
  children,
}: PrimaryButtonProps) {
  return (
    <button
      className={`
        ${isGroup && 'flex-1'}
        text-center
        text-base
        h-[59px]
        ${disabledStyle} 
        ${color[theme]}`}
      disabled={disabled}
      type='button'
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function ButtonGroup({ children }: { children: React.ReactNode }) {
  return <div className='flex flex-wrap w-full gap-2'>{children}</div>;
}

const Button = BaseButton as typeof BaseButton & {
  Group: typeof ButtonGroup;
};

Button.Group = ButtonGroup;

export default Button;