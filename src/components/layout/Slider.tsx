import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useCurrentWidth } from "../../app/hooks";
import Horizontal from "../core/Horizontal";
import Card from "./Card";
import styled from "styled-components";
import { iSliderCardData } from "../../interfaces";

interface iSlider {
  width: number;
  cardData: Array<iSliderCardData>;
}

const Button = styled.button`
  box-sizing: border-box;
  font-size: 22px;
  font-weight: bold;
  color: white;
  background: #b10240;
  width: 50px;
  height: 50px;
  outline-style: initial;
  border-radius: 100px;
  margin-right: 8px;
  margin-left: 4px;
  cursor: pointer;
  border: 2px solid gold;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

export default function Slider(props: iSlider) {
  const rowLimit = 20;
  const width: number = useCurrentWidth();
  const [cardsAmount, setCardsAmount] = useState(Math.floor(width / 200) + 2);
  const [positioned, setPositioned] = useState(false);
  const sliderRef = useRef<HTMLInputElement>(null);

  // Makes a little scroll on first render to user know it is a slider
  useEffect(() => {
    sliderRef.current!.scrollTo(70, 0);
    setPositioned(true);
  }, []);

  // Recauculates max scroll when new cards are rendered, in order to request more cards properly
  const maxScroll: number = useMemo(() => {
    if (sliderRef.current) {
      return sliderRef.current.scrollWidth - sliderRef.current!.clientWidth;
    } else return 0;
  }, [cardsAmount]);

  function handleScroll() {
    if (positioned) {
      let currentScroll = sliderRef.current!.scrollLeft;
      if (maxScroll - currentScroll < 300) {
        if (cardsAmount + 2 <= rowLimit) setCardsAmount(cardsAmount + 2);
      }
    }
  }

  function renderCards(n: number) {
    let cards = [];
    for (let i = 0; i < n; i++) {
      cards.push(
        <Card
          key={props.cardData[i].title}
          width={props.width}
          imgSrc={props.cardData[i].imgSrc}
          title={props.cardData[i].title}
          subtitle={props.cardData[i].subtitle}
        />
      );
    }
    return cards;
  }

  return (
    <Horizontal
      overflowX="scroll"
      ref={sliderRef}
      onScroll={() => {
        handleScroll();
      }}
    >
      {renderCards(cardsAmount)}
      {cardsAmount + 2 >= rowLimit ? (
        <Container>
          <Button>+</Button>
        </Container>
      ) : null}
    </Horizontal>
  );
}
