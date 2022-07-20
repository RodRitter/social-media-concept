import React from "react";
import styled, { keyframes } from "styled-components";
import { useModal } from "../../hooks/useModal";
import { useTheme } from "../../lib/ThemeProvider";
import Button from "../Button";

const introAnimation = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const ModalWrapper = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.5);
    animation: ${introAnimation} 0.2s ease-in-out;
`;

const ModalInner = styled.div`
    width: 350px;
    background: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text};
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border-radius: 10px;
`;

const ContentWrapper = styled.div`
    padding: 0 0 40px 0;
    text-align: center;
    font-size: 1rem;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Modal = () => {
    const { isOpen, modal, keys } = useModal();
    const { theme } = useTheme();

    if (modal && isOpen && modal.content && modal.actions) {
        return (
            <ModalWrapper>
                <ModalInner theme={theme}>
                    <ContentWrapper>{modal.content}</ContentWrapper>
                    <ButtonsWrapper>
                        {modal.actions.map((action) => (
                            <Button
                                key={action.label}
                                variant={action.variant}
                                onClick={action.onClick}
                            >
                                {action.label}
                            </Button>
                        ))}
                    </ButtonsWrapper>
                </ModalInner>
            </ModalWrapper>
        );
    }

    return null;
};

export default Modal;
