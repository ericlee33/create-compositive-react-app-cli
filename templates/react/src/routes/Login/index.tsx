import React from 'react';
import styled from 'styled-components';

interface ILoginProps {
  className?: string;
  style?: React.CSSProperties;
}

const Root = styled.div``;

const Login: React.FC<ILoginProps> = ({ className, style }) => {
  return (
    <Root className={className} style={style}>
      Please Login
    </Root>
  );
};

export default Login;
