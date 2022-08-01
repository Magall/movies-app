import { iMultiSearchResponse } from "../../interfaces";
import Vertical from "../core/Vertical";
import Text from "../core/Text";
import Horizontal from "../core/Horizontal";
import { GOLD, RED } from "../../constants";
import styled from "styled-components";
import { useState } from "react";
import Selector from "./Radio";
import { Select } from "../core/Select";

const ListContainer = styled.div`
  background: ${RED};
  border: 1px solid ${GOLD};
  width: 500px;
  padding: 12px;
  margin: 8px;
  border-radius: 8px;
`;

interface SelectorElement {
  id: number;
  text: string;
}

interface iList {
  data: iMultiSearchResponse;
  rowComponent: Function;
  handlePageChange: Function;
  handleListSelected?: Function;
  handleSort?: Function;
  radioElements: Array<SelectorElement>;
  sortOptions?: Array<any>;
}

export default function List(props: iList) {
  const size = 5;
  const [start, setStart] = useState(1);

  function renderRows() {
    if (props.data?.results) {
      return props.data?.results.map((el) => {
        return <props.rowComponent data={el} />;
      });
    }
  }

  function handlePrev() {
    if (props.data && props.data?.page > 1) {
      props.handlePageChange(props.data?.page - 1);
    }
  }

  function handleNext() {
    if (props.data && props.data?.page < props.data?.total_pages) {
      props.handlePageChange(props.data?.page + 1);
    }
  }

  function renderListButtons() {
    let buttons = new Array(size);

    if (props.data.page < start && start - size > 0) {
      setStart(props.data.page - size);
    }

    if (props.data.page > start + size) {
      setStart(props.data.page);
    }

    for (let i = start; i <= start + size; i++) {
      buttons.push(
        <Text
          color={i === props.data.page ? GOLD : "white"}
         
         //Console about keys is here when there are 2 + lists the page numbers key get duplicated, but I can not fix it yet.
          key={Math.random()}
          fontWeight="600"
          margin="0px 8px"
          onClick={() => props.handlePageChange(i)}
        >
          {i}
        </Text>
      );
    }
    return buttons;
  }

  return (
    <div>
      <ListContainer>
        <Horizontal justify="space-between">
          {props.handleListSelected && (
            <Selector
              onChangeCallBack={props.handleListSelected}
              radioElements={props.radioElements}
            />
          )}
          {props.sortOptions && (
            <Select
              onChange={(evt) =>
                props.handleSort ? props.handleSort(evt) : null
              }
            >
              {props.sortOptions.map((option) => {
                return <option value={option.value}>{option.text}</option>;
              })}
            </Select>
          )}
        </Horizontal>
        <Vertical>{renderRows()}</Vertical>
        <Horizontal justify="center">
          <Text
            fontWeight="600"
            color="white"
            onClick={handlePrev}
            margin="0px 8px"
          >
            Previous
          </Text>
          {renderListButtons()}
          <Text
            fontWeight="600"
            color="white"
            onClick={handleNext}
            margin="0px 8px"
          >
            Next
          </Text>
        </Horizontal>
      </ListContainer>
    </div>
  );
}
