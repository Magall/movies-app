import styled, { css } from "styled-components";

interface iVertical {
  alignItems?: string;
  widthPixel?: number;
  widthPercent?: number;
  makeOnCenter?: boolean;
  justifyContent?: string;
  textAlign?:string;
}

const Vertical = styled.div<iVertical>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.alignItems};
  width: ${(props) => props.widthPercent}%;
  width: ${(props) => props.widthPixel}px;
  text-align: ${props => props.textAlign};
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
