import { styled } from "~/theme";

export const StyledWrapper = styled.div`
  ${({ theme: { rem } }): string => `
    justify-content: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-inline: auto;
    max-width: ${rem(300)};
    text-align: center;
  `};
`;

export const StyledText = styled.h1`
  ${({ theme: { colors, rem } }): string => `
    color: ${colors.orange};
    font-size: ${rem(22)};
    margin-bottom: ${rem(15)};
    padding: ${rem(8)};
  `};
`;
