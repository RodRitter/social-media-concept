import React from "react";
import styled from "styled-components";
import { useTheme } from "../../lib/ThemeProvider";

const ButtonStyled = styled.button`
    border: none;
    font-size: 1rem;
    height: 40px;
    padding: 0 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: all ease-in 0.1s;
    display: flex;
    align-items: center;

    > svg {
        width: 20px;
        margin-right: 10px;
    }

    border: ${({ theme, variant }) => {
        switch (variant) {
            case "secondary":
                return `1px solid ${theme.buttonSecondaryBorder}`;
            default:
                return "none";
        }
    }};
    background: ${({ theme, variant }) => {
        switch (variant) {
            case "secondary":
                return theme.buttonSecondary;
            default:
                return theme.buttonPrimary;
        }
    }};
    color: ${({ theme, variant }) => {
        switch (variant) {
            case "secondary":
                return theme.buttonSecondaryText;
            default:
                return theme.buttonPrimaryText;
        }
    }};

    &:hover {
        background: ${({ theme, variant }) => {
            switch (variant) {
                case "secondary":
                    return theme.buttonSecondaryHoverBackground;
                default:
                    return theme.buttonPrimaryHoverBackground;
            }
        }};

        color: ${({ theme, variant }) => {
            switch (variant) {
                case "secondary":
                    return theme.buttonSecondaryHoverText;
                default:
                    return theme.buttonPrimaryHoverText;
            }
        }};
    }
`;

const Button = ({ variant, icon, children, onClick, className }) => {
    const { theme } = useTheme();

    return (
        <ButtonStyled
            theme={theme}
            variant={variant}
            className={className}
            onClick={onClick}
        >
            {icon}
            {children}
        </ButtonStyled>
    );
};

export default Button;
