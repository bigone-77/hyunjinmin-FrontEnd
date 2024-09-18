import { css } from '@emotion/react';
import styled from '@emotion/styled';

function App() {
  const containerStyles = css`
    background-color: pink;
  `;

  const Button = styled.button`
    width: 200px;
    height: 100px;
  `;

  return (
    <div css={containerStyles}>
      <Button>스타일 버튼</Button>right branch에서 push 할것입니다
    </div>
  );
}

export default App;
