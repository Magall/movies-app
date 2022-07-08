import styled from "styled-components";
import { useState } from "react";
import Text from "../core/Text";
import { BLACK, GOLD, RED } from "../../constants";

const RadioContainer = styled.div`
  border: 1px solid ${GOLD};
  border-radius: 30px;
  height: 30px;
  width: fit-content;
  background: ${RED};
  margin-left: 8px;
  display: flex;
  align-items: center;
`;

interface iRadioItem {
  isActive?: boolean;
}
const SelctorItem = styled.div<iRadioItem>`
  display: flex;
  align-items: center;
  color: white;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: inherit;
  height: 100%;
  width: 100%;
  cursor: pointer;
  -webkit-font-smoothing: antialiased;
  
  ${(props) => {
    if (props.isActive) {
      return {
        background: ` ${GOLD}`,
        color: `${BLACK}!important`,
      };
    }
  }}
`;

interface iRadio {
  onChangeCallBack: Function;
  radioElements: Array<{ id: number; text: string }>;
}

export default function Radio(props: iRadio) {
  const [active, setActive] = useState(0);

  function handleClick(clicked: number): void {
    setActive(clicked);
    props.onChangeCallBack(clicked);
  }

  function isActive(current: number): boolean {
    return current === active;
  }

  function renderRadios() {
    return props.radioElements.map((el) => {
      return(
      <SelctorItem key={el.id} isActive={isActive(el.id)} onClick={() => handleClick(el.id)}>
        <Text fontWeight="700">{el.text}</Text>
      </SelctorItem>);
    });
  }

  return <RadioContainer>{renderRadios()}</RadioContainer>;
}
