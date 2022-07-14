import styled from "styled-components";

const Img = styled.img`
  border-radius: 8px;
`;

interface iStyledImage {
  width: string;
  height: string;
}
const ImgBlank = styled.div<iStyledImage>`
  min-width: ${(props) => props.width};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background: #ccc;
  border-radius: 8px;
`;

interface iImage {
  width: string;
  height: string;
  path: string;
}

export function Image(props: iImage) {
  function checkPath() {
    if (props.path && (!props.path.includes("null") && !props.path.includes("undefined"))) {
      return <Img src={props.path} />;
    } else {
      return <ImgBlank width={props.width} height={props.height} />;
    }
  }
  return checkPath();
}
