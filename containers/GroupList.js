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

const GroupList = () => {
    return (
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
    );
};

export default GroupList;
