import styled from "styled-components";
import { RED } from "../../constants";

interface Ibtn {
  width?: string;
}

const Button = styled.button<Ibtn>`
  padding: 8px;
  margin: 8px;
  border-radius: 4px;
  border: none;
  background-color: ${RED};
  color: white;
  font-size: 14px;
  width: ${(props) => props.width || '160px'};
`;
export default Button;
