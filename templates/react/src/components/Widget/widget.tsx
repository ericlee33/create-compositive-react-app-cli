import React from 'react';
import styled from 'styled-components';

interface IWidgetProps {
  className?: string;
  style?: React.CSSProperties;
}

const Root = styled.div``;

const Widget: React.FC<IWidgetProps> = ({ className, style }) => {
  return (
    <Root className={className} style={style}>
      {/*  */}
    </Root>
  );
};

export default Widget;
