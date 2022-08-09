import React from 'react';
import styled from 'styled-components';

interface IIndexProps {
  className?: string;
  style?: React.CSSProperties;
}

const Root = styled.div``;

const Index: React.FC<IIndexProps> = ({ className, style }) => {
  return (
    <Root className={className} style={style}>
      {/*  */}
    </Root>
  );
};

export default Index;
