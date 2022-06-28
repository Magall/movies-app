import styled from "styled-components";
interface iInput {
  Swidth?: string;
  margin?: string;
}

const Input = styled.input<iInput>`
  padding: 8px;
  box-sizing:border-box;
  border-radius: 4px;
  width: ${props => props.Swidth || "300px"};
  max-width: 100%;
  border: 1px solid #ccc;
  margin: ${props => props.margin || "8px"};;
  box-shadow: 1px 1px 1px 1px rgba(12,12,12,0.2);
  :focus{
    outline:0px
  }

`;
export default Input;
