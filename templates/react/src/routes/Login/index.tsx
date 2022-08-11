import React from 'react';
import styled from 'styled-components';

interface ILoginProps {
  className?: string;
  style?: React.CSSProperties;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: blue;
  height: 100%;
  font-size: 30px;
`;

const Login: React.FC<ILoginProps> = ({ className, style }) => {
  return (
    <Root className={className} style={style}>
      <div>
        You have created templates by create-compositive-react-app-cli, now it's time to start your
        developing~!
      </div>
      <div style={{ color: 'pink' }}>current page is on ./src/routes/Login/index.tsx</div>
    </Root>
  );
};

export default Login;
