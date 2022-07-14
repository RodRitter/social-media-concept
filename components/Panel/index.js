import React, { useContext } from "react";
import styled from "styled-components";
import { useTheme } from "../../lib/ThemeProvider";

const PanelWrapper = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  padding: 15px;
  color: ${({ theme }) => theme.text};
`;

const Panel = ({ children, className }) => {
  const { theme } = useTheme();
  return (
    <PanelWrapper theme={theme} className={className}>
      {children}
    </PanelWrapper>
  );
};

export default Panel;
