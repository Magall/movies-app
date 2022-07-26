import styled from "styled-components";
interface iH2 {
  marginBottom?:number;
}

const H2 = styled.h2<iH2>`
  text-align: center;
  color: gold;
  font-family: Budmo Jiggler;
  margin-bottom: ${props =>props.marginBottom}px;
`;

const MotionInfoTitles = styled.span`
  color: gold;
  font-family: Budmo Jiggler;
  font-weight:800;
  font-size:24px;
`;

const MotionInfoText = styled.p`
  margin:0;
  font-weight:600;
  font-size:16px;
  color:white;
  margin:8px;
`;
export { H2, MotionInfoText,MotionInfoTitles};
