interface ISpacingProps {
  size: number;
  direction?: 'vertical' | 'horizontal';
}

function Spacing({ size, direction = 'vertical' }: ISpacingProps) {
  const spacingStyle =
    direction === 'vertical' ? { height: `${size}px` } : { width: `${size}px` };

  return <div style={spacingStyle} />;
}

export default Spacing;
