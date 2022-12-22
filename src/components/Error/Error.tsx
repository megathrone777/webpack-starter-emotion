import React from "react";
import { NavLink } from "react-router-dom";

import { StyledWrapper, StyledText } from "./styled";

const Error: React.FC = () => (
  <StyledWrapper>
    <StyledText>Page not found.</StyledText>
    <NavLink to="/">Main page</NavLink>
  </StyledWrapper>
);

export { Error };
