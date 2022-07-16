import React from "react";
import styled from "styled-components";
import { X } from "react-feather";
import { useTheme } from "../../lib/ThemeProvider";
import Button from "../Button";

const TooltipWrapper = styled.div`
    ${({ top }) => top !== undefined && `top: ${top}px;`}
    ${({ bottom }) => bottom !== undefined && `bottom: ${bottom}px;`}
    ${({ left }) => left !== undefined && `left: ${left}px;`}
    ${({ right }) => right !== undefined && `right: ${right}px;`}

    position: absolute;
    z-index: 100;
    border: 1px solid ${({ theme }) => theme.tooltipBorder};
    padding: 10px;
    background-color: ${({ theme }) => theme.tooltipBackground};
    width: auto;
    text-align: center;
    border-radius: 5px;
    padding: 20px;
    font-size: 1rem;
    color: ${({ theme }) => theme.lightText}

    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.5);
    -webkit-box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled(Button)`
    position: absolute;
    top: -10px;
    right: -10px;
    padding: 20px;
    height: auto;
    color: ${({ theme }) => theme.tooltipBorder};

    > svg {
        margin: 0;
    }
`;

const Tooltip = ({
    top,
    bottom,
    left,
    right,
    onClose,
    className,
    children,
}) => {
    const { theme } = useTheme();

    return (
        <TooltipWrapper
            theme={theme}
            className={className}
            top={top}
            bottom={bottom}
            left={left}
            right={right}
            onClick={onClose}
        >
            <CloseButton variant="link" theme={theme}>
                <X />
            </CloseButton>
            {children}
        </TooltipWrapper>
    );
};

export default Tooltip;
