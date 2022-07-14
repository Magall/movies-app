import styled from "styled-components";
import { BLACK, GOLD } from "../../constants";

interface iSelect {
  handleSelect: Function;
}

export const Select = styled.select`
  padding: 8px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: ${BLACK};
  background: ${GOLD};
  min-width: 90px;
`;


