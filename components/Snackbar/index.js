import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { X } from "react-feather";
import { useTheme } from "../../lib/ThemeProvider";
import Button from "../Button";

const SnackbarWrapper = styled.div`
    background: ${({ variant, theme }) => {
        switch (variant) {
            case "error":
                return theme.snackbarError;
            default:
                return theme.snackbarSuccess;
        }
    }};
    color: ${({ theme }) => theme.snackbarText};
    padding: 15px 40px 15px 15px;
    border-radius: 5px;
    position: relative;
    width: fit-content;
    font-size: 1rem;
    top: -70px;
`;

const CloseButton = styled(Button)`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 5px;
    padding: 5px;
    height: auto;
    color: ${({ theme }) => theme.snackbarText};

    > svg {
        margin: 0;
    }
`;

const Snackbar = ({ variant, children, className }) => {
    const { theme } = useTheme();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(open) {
            setTimeout(() => setOpen(false), 3000);
        }
    }, [open])

    return (
        <SnackbarWrapper variant={variant} theme={theme} className={className}>
            <CloseButton theme={theme} variant="link">
                <X />
            </CloseButton>
            {children}
        </SnackbarWrapper>
    );
};

export default Snackbar;
