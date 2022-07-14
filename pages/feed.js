import React from "react";
import styled from "styled-components";
import { useTheme } from "../lib/ThemeProvider";
import { themes } from "../globals";

import Header from "../containers/Header";
import CreatePost from "../containers/CreatePost";

import Panel from "../components/Panel";
import BadgeProfile from "../components/BadgeProfile";

const FeedWrapper = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.text};
  height: 100%;
`;

const InnerWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;

  > div {
    padding: 10px 20px;
  }
`;

const LeftSection = styled.div`
  flex: 8;
`;

const RightSection = styled.div`
  flex: 4;

  > div {
    margin-bottom: 30px;
  }
`;

const LargeBadgeProfile = styled(BadgeProfile)`
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CardHeading = styled.h2`
  margin: 5px 10px 20px 10px;
`;

const Feed = ({ className }) => {
  const { theme, setTheme } = useTheme();

  const toggle = () => {
    setTheme(theme === themes.dark ? themes.light : themes.dark);
  };

  return (
    <FeedWrapper theme={theme} className={className}>
      <Header />
      <InnerWrapper>
        <LeftSection>
          <CreatePost />
        </LeftSection>
        <RightSection>
          <Panel>
            <CardHeading>Friends</CardHeading>

            <LargeBadgeProfile
              size="lg"
              img="/img/profile-1.jpg"
              name="John Doe"
              meta="@johndoe"
              onClick={() => {}}
            />

            <LargeBadgeProfile
              size="lg"
              img="/img/profile-1.jpg"
              name="Riaan van der Westhuizen"
              meta="@riaanvdwest"
              onClick={() => {}}
            />
          </Panel>

          <Panel>
            <CardHeading>Groups</CardHeading>

            <LargeBadgeProfile
              size="lg"
              img="/img/profile-1.jpg"
              name="Gaming"
              meta="24 members"
            />

            <LargeBadgeProfile
              size="lg"
              img="/img/profile-1.jpg"
              name="Coding"
              meta="99 members"
            />
          </Panel>
        </RightSection>
      </InnerWrapper>
    </FeedWrapper>
  );
};

export default Feed;
