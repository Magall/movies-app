import { useState, useRef, useEffect } from "react";
import { useCurrentWidth } from "../../app/hooks";
import Horizontal from "../core/Horizontal";
import Card from "./Card";
import Text from "../core/Text";
import styled from "styled-components";
import { iSliderCardData } from "../../interfaces";

interface iSlider {
  width: number;
  cardData: Array<iSliderCardData>;
}


const Buttonn = styled.div`
  font-size:60px;
  font-weight:bold;
  color:white;
  background:#b10240;
  height:80px
`

export default function Slider(props: iSlider) {
  const rowLimit = 20;
  const width: number = useCurrentWidth();
  const [cardsAmount, setCardsAmount] = useState(Math.floor(width / 200) + 2);
  const [maxScroll, setMaxScroll] = useState(0);
  const [positioned, setPositioned] = useState(false);
  const sliderRef = useRef<HTMLInputElement>(null);



  // Makes a little scroll on first render to user know it is a slider
  useEffect(() => {
    sliderRef.current!.scrollTo(70, 0);
    setPositioned(true);
  }, []);

  // Recauculates max scroll when new cards are rendered, in order to request more cards properly
  useEffect(() => {
    setMaxScroll(
      sliderRef.current!.scrollWidth - sliderRef.current!.clientWidth
    );
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
          key={i}
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
      {cardsAmount + 2 >= rowLimit ? <Buttonn >+</Buttonn> : null}
    </Horizontal>
  );
}
