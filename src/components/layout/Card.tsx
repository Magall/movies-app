import styled from "styled-components";
import Vertical from "../core/Vertical";
import Text from "../core/Text";
import { iCard } from "../../interfaces";

const Container = styled.div`
  margin: 4px;
  background: #b10240;
  color: white;
  border: 1px solid gold;
  border-radius: 8px;
  height: auto;
  box-sizing: border-box;
  img {
    border-radius: 8px 8px 0px 0px;
  }
`;

const Footer = styled(Vertical)`
  padding: 8px;
  height: 80px;
  box-sizing: border-box;
`;

export default function Card(props: iCard) {
  return (
    <Container>
      <Vertical widthPixel={200} textAlign="center">
        <img width={props.width} src={props.imgSrc} height={300} alt="" />
        <Footer width={props.width + "px"} >
          <Vertical alignItems="space-between" height="100%" justifyContent="space-around">
            <Text fontWeight="600" margin="0 0 8px 0">
              {props.title}
            </Text>
            <Text fontWeight="600">{props.subtitle}</Text>
          </Vertical>
        </Footer>
      </Vertical>
    </Container>
  );
}
