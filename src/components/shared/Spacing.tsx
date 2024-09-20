interface ISpacingProps {
  size: number;
  direction?: 'vertical' | 'horizontal';
  backgroundColor?: string;
}

function Spacing({
  size,
  direction = 'vertical',
  backgroundColor,
}: ISpacingProps) {
  const spacingStyle = {
    ...(direction === 'vertical'
      ? { marginTop: `${size}px`, marginBottom: `${size}px`, height: '2px' } // 세로 방향인 경우 marginY
      : { marginLeft: `${size}px`, marginRight: `${size}px` }), // 가로 방향인 경우 marginX
    backgroundColor: backgroundColor || 'transparent',
  };

  return <div style={spacingStyle} />;
}

export default Spacing;
