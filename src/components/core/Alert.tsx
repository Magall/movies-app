import "animate.css";
import styled, { css } from "styled-components";
import { CSSTransition } from "react-transition-group";
import { AlertType } from "../../Enums";
import Vertical from "./Vertical";
import { useAppSelector } from "../../hooks";
import "./Alert.scss";

interface iAlert {
  type: AlertType;
}

const Alert = styled.div<iAlert>`
  width: 400px;
  border-radius: 8px;
  position: absolute;
  transform: translate(-50%, 0%);
  left: 50%;
  top: 8px;
  padding: 12px;
  box-shadow: 4px;
  ${(props) => {
    switch (props.type) {
      case AlertType.Problem:
        return css`
          color: #d8000c;
          background-color: #ffd2d2;
        `;
      case AlertType.Warning:
        return css`
          color: #9f6000;
          background-color: #feefb3;
        `;
      case AlertType.Success:
        return css`
          color: #4f8a10;
          background-color: #dff2bf;
        `;
      default:
        return null;
    }
  }}
`;

export default function AlertDialog() {
  const shouldShow = useAppSelector((state) => state.alert.show);
  const type = useAppSelector((state) => state.alert.type);
  const messages = useAppSelector((state) => state.alert.messages);

  return (
    <div>
        <div>
          <CSSTransition in={shouldShow} timeout={300} classNames="alert" unmountOnExit>
              <Alert type={type}>
                <Vertical>
                  {messages.map((el) => (
                    <span key={el}>{el}</span>
                  ))}
                </Vertical>
              </Alert>
          </CSSTransition>
        </div>
    </div>
  );
}
