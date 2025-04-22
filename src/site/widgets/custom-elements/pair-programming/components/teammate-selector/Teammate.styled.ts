import styled from "styled-components";
import theme from "../../theme";

export const AIBadge = styled.span`
  display: inline-block;
  background-color: ${theme.colors.primary};
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: ${theme.borderRadius};
  margin-left: ${theme.spacing.xs};
  vertical-align: middle;
`;
