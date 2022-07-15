import React from "react";
import styled from "styled-components";
import Panel from "../components/Panel";
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

const FriendList = () => {
    return (
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
    );
};

export default FriendList;
