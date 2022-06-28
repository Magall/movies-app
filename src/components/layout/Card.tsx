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
  width: fit-content;
  img {
    border-radius: 8px 8px 0px 0px;
  }
`;

const Footer = styled(Vertical)`
  padding: 8px;
`;

export default function Card(props:iCard) {
  return (
    <Container>
      <Vertical widthPixel={200} textAlign="center">
        <img
          width={props.width}
          src={props.imgSrc}
          alt=""
        />
        <Footer>
          <Text margin="0 0 8px 0">{props.title}</Text>
          <Text>{props.subtitle}</Text>
        </Footer>
      </Vertical>
    </Container>
  );
}
