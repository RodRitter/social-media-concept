import React from "react";
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
    animation: ${tooltipBounce} 1s ease-in-out infinite;

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

const Header = ({ session }) => {
    const { theme } = useTheme();

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

                            <TooltipStyled top={70} theme={theme}>
                                <h3>This is a demo ☝️</h3>
                                <p>
                                    All new accounts are deleted daily. Feel
                                    free to sign up.
                                </p>
                                <p>or</p>
                                <p>
                                    Sign in with the{" "}
                                    <Link href="/">demo account</Link>.
                                </p>
                            </TooltipStyled>
                        </SignInWrapper>
                    )}
                </ProfilePanel>
            </HeaderInner>
        </HeaderWrapper>
    );
};

export default Header;
