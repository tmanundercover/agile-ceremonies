import React from "react";
import {FeatureContainer, FeatureDescription, FeatureIcon, FeatureItem, FeatureTitle} from "./styled-components";

export const FeatureGrid = ({ features }) => {
    return (
        <FeatureContainer>
            {features.map((feature, index) => (
                <FeatureItem key={index}>
                    <FeatureIcon>{feature.icon}</FeatureIcon>
                    <FeatureTitle>{feature.title}</FeatureTitle>
                    <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureItem>
            ))}
        </FeatureContainer>
    );
};