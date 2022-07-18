import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "../lib/ThemeProvider";
import { SnackbarProvider } from "../lib/SnackbarProvider";
import { StoreProvider } from "../lib/StoreProvider";
import "../styles/globals.css";

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}) {
    return (
        <SessionProvider session={session}>
            <StoreProvider>
                <ThemeProvider>
                    <SnackbarProvider>
                        <Component {...pageProps} />
                    </SnackbarProvider>
                </ThemeProvider>
            </StoreProvider>
        </SessionProvider>
    );
}
