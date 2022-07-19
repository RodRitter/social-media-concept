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
    transition: all ease-in-out 0.3s;
    top: ${({ open }) => (open ? "40px" : "-70px")};
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

const Snackbar = ({ variant, children, className, open, setOpen }) => {
    const { theme } = useTheme();

    useEffect(() => {
        if (open) {
            setTimeout(() => setOpen(false), 4000);
        }
    }, [open, setOpen]);

    return (
        <SnackbarWrapper
            open={open}
            variant={variant}
            theme={theme}
            className={className}
        >
            <CloseButton
                theme={theme}
                variant="link"
                onClick={() => setOpen(false)}
            >
                <X />
            </CloseButton>
            {children}
        </SnackbarWrapper>
    );
};

export default Snackbar;
