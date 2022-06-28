import styled from "styled-components";

interface iText {
  fontSize?: number;
  fontWeight?: string;
  fontFamily?: string;
  margin?: string;
  padding?: string;
  color?: string;
  alignSelf?: string;
}

const Text = styled.span<iText>`
  font-size: ${(props) => props.fontSize + "px" || "14px"};
  font-weight: ${(props) => props.fontWeight || "normal"};
  font-family: ${(props) => props.fontFamily};
  margin: ${(props) => props.margin || "0px 0px 0px 0px"};
  padding: ${(props) => props.padding || "0px 0px 0px 0px"};
  color: ${(props) => props.color || "inherit"};
  align-self: ${(props) => props.alignSelf};
`;
export default Text;