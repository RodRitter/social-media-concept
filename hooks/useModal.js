import { useEffect, useState } from "react";
import { useStore } from "../lib/StoreProvider";

const MODAL_STORE_KEY = "modal";
const MODAL_OPEN_STORE_KEY = "modalOpen";
const MODAL_CONTENT_STORE_KEY = "modalContent";
const MODAL_ACTIONS_STORE_KEY = "modalActions";

export const useModal = () => {
    const { store, setStore } = useStore();

    const setModal = (content, actions) => {
        setStore(MODAL_STORE_KEY, { content, actions });
    };

    useEffect(() => {
        setStore(MODAL_OPEN_STORE_KEY, true);
    }, [store[MODAL_STORE_KEY]]);

    // useEffect(() => {
    //     console.log(store);
    // }, [store]);

    return {
        openModal: () => setStore(MODAL_OPEN_STORE_KEY, true),
        closeModal: () => setStore(MODAL_OPEN_STORE_KEY, false),
        setModal,
        isOpen: store[MODAL_OPEN_STORE_KEY],
        modal: store[MODAL_STORE_KEY],
        keys: {
            MODAL_STORE_KEY,
            MODAL_OPEN_STORE_KEY,
            MODAL_CONTENT_STORE_KEY,
            MODAL_ACTIONS_STORE_KEY,
        },
    };
};
