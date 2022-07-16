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

const Header = ({ session, authenticating }) => {
    const { theme } = useTheme();
    const [tooltipOpen, setTooltipOpen] = useState(true);

    return (
        <HeaderWrapper>
            <HeaderInner>
                <Brand>
                    <div>
                        <Users />
                        <span>crowdly</span>
                    </div>
                    <BrandByline>An experiment by Rod Ritter</BrandByline>
                </Brand>

                {!authenticating && (
                    <ProfilePanel>
                        {session && (
                            <SignOutButton
                                variant="secondary"
                                onClick={() => signOut({ redirect: false })}
                            >
                                Sign Out
                            </SignOutButton>
                        )}

                        {session ? (
                            <BadgeProfile
                                img={session.user.image}
                                topText={session.user.name}
                                bottomText="@rodritter"
                                onClick={() => {}}
                            />
                        ) : (
                            <SignInWrapper>
                                <SignInButton onClick={() => signIn("google")}>
                                    Sign in with Google
                                </SignInButton>

                                {tooltipOpen && (
                                    <TooltipStyled
                                        top={70}
                                        theme={theme}
                                        onClose={() => setTooltipOpen(false)}
                                    >
                                        <h3>Create an account ☝️</h3>
                                        <p>
                                            All new accounts are{" "}
                                            <b>deleted daily</b>. Feel free to
                                            play, break and test the demo.
                                        </p>
                                        <p>
                                            I only have Google login for the
                                            purpose of this demo.
                                        </p>
                                        <p>or</p>
                                        <p>
                                            Sign in with the{" "}
                                            <Link href="/">demo account</Link>.
                                        </p>
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
