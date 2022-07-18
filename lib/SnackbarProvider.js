import React, { useContext, useState } from "react";
import styled from "styled-components";
import Snackbar from "../components/Snackbar";

const StyledSnackbar = styled(Snackbar)`
    position: fixed;
    left: 50%;
    translate: transformX(-50%);
    z-index: 20;
`;

export const SnackbarContext = React.createContext({
    open: false,
    content: "",
    setOpen: async () => null,
    setContent: async () => null,
});

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
    const [open, setSnackbarOpen] = useState(false);
    const [snackbarContent, setSnackbarContent] = useState("");
    const [variant, setSnackbarVariant] = useState("");

    return (
        <SnackbarContext.Provider
            value={{
                open,
                setSnackbarOpen,
                snackbarContent,
                setSnackbarContent,
                setSnackbarVariant,
            }}
        >
            <StyledSnackbar
                variant={variant}
                open={open}
                setOpen={setSnackbarOpen}
                setContent={setSnackbarContent}
            >
                {snackbarContent}
            </StyledSnackbar>
            {children}
        </SnackbarContext.Provider>
    );
};
