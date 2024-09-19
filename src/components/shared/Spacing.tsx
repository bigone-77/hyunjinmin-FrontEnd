interface SpacingProps {
  size: number;
  direction?: 'vertical' | 'horizontal';
}

function Spacing({ size, direction = 'vertical' }: SpacingProps) {
  const style =
    direction === 'vertical' ? { height: `${size}px` } : { width: `${size}px` };

  return <div style={style} />;
}

export default Spacing;
