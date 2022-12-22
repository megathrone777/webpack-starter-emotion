import { styled } from "~/theme";

export const StyledContent = styled.main`
  background-color: ${({ theme: { colors } }): string => colors.orange};
`;
