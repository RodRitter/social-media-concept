import React from "react";
import styled from "styled-components";
import { useTheme } from "../../lib/ThemeProvider";

const BadgeProfileWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    transition: all linear 0.05s;
    cursor: ${({ onClick }) => (onClick ? "pointer" : "default")};

    &:hover {
        background: ${({ theme, onClick }) =>
            onClick ? theme.profileHover : "none"};
    }
`;

const ProfileImage = styled.div`
    overflow: hidden;
    border-radius: 100px;
    width: ${({ size }) => (size === "lg" ? "55px" : "40px")};
    height: ${({ size }) => (size === "lg" ? "55px" : "40px")};
    background: url(${({ img }) => img}) no-repeat center center;
    background-size: cover;
`;

const ProfileDetails = styled.div`
    margin-left: ${({ img }) => (img ? "15px" : 0)};
    display: flex;
    flex-direction: column;
`;

const NameText = styled.div`
    font-weight: 500;
    font-size: ${({ size }) => (size === "lg" ? "1.05rem" : "0.9rem")};
    line-height: ${({ size }) => (size === "lg" ? "1.8rem" : "1.4rem")};
`;

const MetaText = styled.div`
    color: ${({ theme }) => theme.lightText};
    font-size: ${({ size }) => (size === "lg" ? "0.9rem" : "0.9rem")};
    line-height: ${({ size }) => (size === "lg" ? "1.8rem" : "1.4rem")};
`;

const BadgeProfile = ({
    img,
    topText,
    bottomText,
    size,
    onClick,
    className,
}) => {
    const { theme } = useTheme();

    return (
        <BadgeProfileWrapper
            className={className}
            theme={theme}
            onClick={onClick}
        >
            {img && <ProfileImage img={img} size={size} />}
            <ProfileDetails img={img}>
                {topText ? <NameText size={size}>{topText}</NameText> : null}
                {bottomText ? (
                    <MetaText size={size} theme={theme}>
                        {bottomText}
                    </MetaText>
                ) : null}
            </ProfileDetails>
        </BadgeProfileWrapper>
    );
};

export default BadgeProfile;
