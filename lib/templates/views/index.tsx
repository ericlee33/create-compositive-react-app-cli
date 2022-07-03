import React from 'react';
import styled from 'styled-components';

interface IPageProps {
  className?: string;
  style?: React.CSSProperties;
}

const Root = styled.div``;

const Page: React.FC<IPageProps> = ({ className, style }) => {
  return (
    <Root className={className} style={style}>
      {/*  */}
    </Root>
  );
};

export default Page;
