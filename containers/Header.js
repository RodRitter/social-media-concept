import React from "react";
import styled from "styled-components";
import { useSession, signIn, signOut } from "next-auth/react";
import { useTheme } from "../lib/ThemeProvider";
import BadgeProfile from "../components/BadgeProfile";
import Panel from "../components/Panel";
import Button from "../components/Button";

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

const Brand = styled.h2`
  margin: 0;
`;

const ProfilePanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SignOutButton = styled(Button)`
  margin-right: 20px;
`;

const Header = () => {
  const { theme } = useTheme();
  const { data: session } = useSession();

  return (
    <HeaderWrapper>
      <HeaderInner>
        <Brand>Social Media Concept</Brand>

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
              img="/img/profile-1.jpg"
              name="Rod Ritter"
              meta="@rodritter"
              onClick={() => {}}
            />
          ) : (
            <Button onClick={() => signIn()}>Sign In</Button>
          )}
        </ProfilePanel>
      </HeaderInner>
    </HeaderWrapper>
  );
};

export default Header;
