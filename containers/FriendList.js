import React, { useEffect } from "react";
import styled from "styled-components";
import Panel from "../components/Panel";
import BadgeProfile from "../components/BadgeProfile";
import { useFollows } from "../hooks/useFollows";

const LargeBadgeProfile = styled(BadgeProfile)`
    margin-bottom: 10px;

    &:last-child {
        margin-bottom: 0;
    }
`;

const CardHeading = styled.h2`
    margin: 5px 10px 20px 10px;
`;

const EmptyMessage = styled.div`
    font-size: 1.2rem;
    color: gray;
    padding: 20px 0;
    text-align: center;
`;

const FriendList = () => {
    const { followData } = useFollows();

    return (
        <Panel>
            <CardHeading>Following</CardHeading>
            {followData &&
                followData.map((user) => (
                    <LargeBadgeProfile
                        key={user._id}
                        size="lg"
                        img={user.image}
                        topText={user.name}
                        onClick={() => {}}
                    />
                ))}

            {!followData ||
                (followData.length === 0 && (
                    <EmptyMessage>{`You're not following anyone`}</EmptyMessage>
                ))}
        </Panel>
    );
};

export default FriendList;
