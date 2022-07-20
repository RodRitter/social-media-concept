import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { Users } from "react-feather";
import { signIn, signOut } from "next-auth/react";
import { useTheme } from "../lib/ThemeProvider";
import BadgeProfile from "../components/BadgeProfile";
import Panel from "../components/Panel";
import Button from "../components/Button";
import Tooltip from "../components/Tooltip";

const HeaderWrapper = styled(Panel)`
    border-radius: 0;
    margin-bottom: 40px;
`;

const HeaderInner = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Brand = styled.div`
    display: flex;
    flex-direction: column;

    > div span {
        font-size: 1.3rem;
        font-weight: bold;
    }

    > div svg {
        margin-right: 10px;
        width: 35px;
    }
`;

const BrandByline = styled.div`
    opacity: 0.4;
    font-weight: 300;
    margin-top: 5px;
`;

const ProfilePanel = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    animation: ${tooltipBounce} 1.5s ease-in-out infinite;

    > p {
        font-size: 1rem;
        color: ${({ theme }) => theme.lightText};

        a {
            text-decoration: none;
            color: ${({ theme }) => theme.buttonPrimary};
            &:hover {
                color: ${({ theme }) => theme.text};
            }
        }
    }
`;

const GuestSignInButton = styled(Button)`
    margin: 0 auto;
`;

const BrandLogo = styled.div`
    display: flex;
    align-items: center;
`;

const Header = ({ session, authenticating }) => {
    const { theme } = useTheme();
    const [tooltipOpen, setTooltipOpen] = useState(true);

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

                {!authenticating && (
                    <ProfilePanel>
                        {session && (
                            <SignOutButton
                                variant="secondary"
                                onClick={() => signOut({ callbackUrl: "/" })}
                            >
                                Sign Out
                            </SignOutButton>
                        )}

                        {session ? (
                            <BadgeProfile
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
                                    onClick={() =>
                                        signIn("google", {
                                            callbackUrl: "/feed",
                                        })
                                    }
                                >
                                    Sign in with Google
                                </SignInButton>

                                {tooltipOpen && (
                                    <TooltipStyled
                                        top={70}
                                        theme={theme}
                                        onClose={() => setTooltipOpen(false)}
                                    >
                                        <h3>Sign in? ☝️</h3>
                                        <p>
                                            Register with your Google account. I
                                            try to remove and cleanup accounts
                                            as often as possible.
                                        </p>
                                        <p>
                                            The only Google account data that I
                                            use is: Name, Email, Profile Image.
                                        </p>
                                        <p>
                                            OR, if you don't want to use your
                                            own account:
                                        </p>

                                        <GuestSignInButton
                                            variant="secondary"
                                            onClick={() => {
                                                signIn("credentials", {
                                                    username: "guest",
                                                    callbackUrl: "/feed",
                                                });
                                            }}
                                        >
                                            {authenticating
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
