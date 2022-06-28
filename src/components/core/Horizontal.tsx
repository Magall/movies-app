import styled from "styled-components";

interface iHorizontal {
  justify?: string;
  widthPixel?: number;
  widthPercent?: number;
  overflowX?: string;
}

const Horizontal = styled.div<iHorizontal>`
  display: flex;
  justify-content: ${(props) => props.justify};
  width: ${(props) => props.widthPercent}%;
  width: ${(props) => props.widthPixel}px;
  overflow-x: ${(props) => props.overflowX};
  ::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
}
`;

export default Horizontal;
