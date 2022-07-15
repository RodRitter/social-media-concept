import React from "react";
import styled from "styled-components";
import Panel from "../components/Panel";
import Button from "../components/Button";
import BadgeProfile from "../components/BadgeProfile";

const LargeBadgeProfile = styled(BadgeProfile)`
    margin-bottom: 10px;

    &:last-child {
        margin-bottom: 0;
    }
`;

const CardHeading = styled.h2`
    margin: 5px 10px 20px 10px;
`;

const RecentSignUps = () => {
    return (
        <Panel>
            <CardHeading>New to the family</CardHeading>

            <LargeBadgeProfile
                size="lg"
                img="/img/profile-1.jpg"
                topText="John Doe"
                bottomText="@johndoe"
                onClick={() => {}}
            />

            <LargeBadgeProfile
                size="lg"
                img="/img/profile-1.jpg"
                topText="John Doe"
                bottomText="@johndoe"
                onClick={() => {}}
            />
        </Panel>
    );
};

export default RecentSignUps;
