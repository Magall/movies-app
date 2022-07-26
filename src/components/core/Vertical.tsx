import styled, { css } from "styled-components";

interface iVertical {
  alignItems?: string;
  widthPixel?: number;
  widthPercent?: number;
  makeOnCenter?: boolean;
  justifyContent?: string;
  textAlign?: string;
  width?: string;
  height?: string;
  margin?: string;
}

const Vertical = styled.div<iVertical>`
  display: flex;
  flex-direction: column;
  margin: ${(props) => props.margin};
  align-items: ${(props) => props.alignItems};
  width: ${(props) => props.widthPercent}%;
  width: ${(props) => props.widthPixel}px;
  width: ${(props) => props.width};
  text-align: ${(props) => props.textAlign};
  height: ${(props) => props.height};
  justify-content: ${(props) => props.justifyContent};
  ${(props) => {
    if (props.makeOnCenter) {
      return css`
        position: absolute;
        top: 35%;
        left: 50%;
        transform: translate(-50%, -50%);
      `;
    }
  }};
`;

export default Vertical;
