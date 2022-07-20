import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { Users } from "react-feather";
import { signIn, signOut } from "next-auth/react";
import { useTheme } from "../lib/ThemeProvider";
import { Loader } from "react-feather";
import BadgeProfile from "../components/BadgeProfile";
import Panel from "../components/Panel";
import Button from "../components/Button";
import Tooltip from "../components/Tooltip";

const HeaderWrapper = styled(Panel)`
    border-radius: 0;
    margin-bottom: 40px;
`;

const HeaderInner = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Brand = styled.div`
    display: flex;
    flex-direction: column;

    > div span {
        font-size: 1.2rem;
        font-weight: bold;
    }

    > div svg {
        margin-right: 10px;
        width: 35px;
    }
`;

const BrandByline = styled.div`
    opacity: 0.3;
    font-weight: 300;
    margin-top: 5px;
    font-size: 0.9rem;
`;

const ProfilePanel = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledBadgeProfile = styled(BadgeProfile)`
    @media screen and (max-width: 1000px) {
        display: none;
    }
`;

const SignOutButton = styled(Button)`
    margin-right: 20px;
`;

const SignInWrapper = styled.div`
    position: relative;
`;
const SignInButton = styled(Button)``;

const tooltipBounce = keyframes`
  0% {
    top: 70px;
  }

  50% {
    top: 60px;
  }

  100% {
    top: 70px;
  }
`;

const TooltipStyled = styled(Tooltip)`
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    transition: all linear 0.1s;
    animation: ${tooltipBounce} 1.5s ease-in-out infinite;

    > p {
        color: ${({ theme }) => theme.lightText};

        a {
            text-decoration: none;
            color: ${({ theme }) => theme.buttonPrimary};
            &:hover {
                color: ${({ theme }) => theme.text};
            }
        }
    }

    @media screen and (max-width: 1400px) {
        left: -20px;
    }
`;

const GuestSignInButton = styled(Button)`
    margin: 0 auto;
`;

const BrandLogo = styled.div`
    display: flex;
    align-items: center;
`;

const loaderRotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const SessionLoader = styled.div`
    position: relative;
    font-size: 16px;
    text-align: center;

    > svg {
        width: 20px;
        height: 20px;
        position: relative;
        top: 30%;
        transform: translateY(-50%);
        animation: ${loaderRotate} 0.8s linear infinite;
    }
`;

const Header = ({ session, authenticating }) => {
    const { theme } = useTheme();
    const [tooltipOpen, setTooltipOpen] = useState(true);
    const [loggingIn, setLoggingIn] = useState(false);

    return (
        <HeaderWrapper>
            <HeaderInner>
                <Brand>
                    <BrandLogo>
                        <Users />
                        <span>crowdly</span>
                    </BrandLogo>
                    <BrandByline>An experiment by Rod Ritter</BrandByline>
                </Brand>

                {authenticating && (
                    <SessionLoader>
                        <Loader />
                        <div>Checking for session</div>
                    </SessionLoader>
                )}

                {!authenticating && (
                    <ProfilePanel>
                        {session && (
                            <SignOutButton
                                variant="secondary"
                                onClick={async () => {
                                    setLoggingIn(true);
                                    await signOut({ callbackUrl: "/" });
                                    setLoggingIn(false);
                                }}
                            >
                                {loggingIn ? "Signing out" : "Sign Out"}
                            </SignOutButton>
                        )}

                        {session ? (
                            <StyledBadgeProfile
                                img={session.user.image}
                                topText={session.user.name}
                                bottomText={
                                    session.user.alias
                                        ? `@${session.user.alias}`
                                        : null
                                }
                                onClick={() => {}}
                            />
                        ) : (
                            <SignInWrapper>
                                <SignInButton
                                    onClick={async () => {
                                        setLoggingIn(true);
                                        await signIn("google", {
                                            callbackUrl: "/feed",
                                        });
                                        setLoggingIn(false);
                                    }}
                                >
                                    {loggingIn
                                        ? "Signing in"
                                        : "Sign in with Google"}
                                </SignInButton>

                                {tooltipOpen && (
                                    <TooltipStyled
                                        top={70}
                                        theme={theme}
                                        onClose={() => setTooltipOpen(false)}
                                    >
                                        <h1>Sign in here ☝️</h1>
                                        <p>
                                            Only Name, Email & Profile Image is
                                            accessed from your Google account.
                                        </p>
                                        <p>
                                            {`OR, if you don't want to use your
                                            own account:`}
                                        </p>

                                        <GuestSignInButton
                                            variant="secondary"
                                            onClick={async () => {
                                                setLoggingIn(true);
                                                await signIn("credentials", {
                                                    username: "guest",
                                                    callbackUrl: "/feed",
                                                });
                                                setLoggingIn(false);
                                            }}
                                        >
                                            {loggingIn
                                                ? "Logging in"
                                                : "Demo Account Sign In"}
                                        </GuestSignInButton>
                                    </TooltipStyled>
                                )}
                            </SignInWrapper>
                        )}
                    </ProfilePanel>
                )}
            </HeaderInner>
        </HeaderWrapper>
    );
};

export default Header;
