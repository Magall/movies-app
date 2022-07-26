import { H2, MotionInfoTitles } from "../components/core/Titles";
import { useGetMotionDetails } from "../hooks/api/Motion";
import { useGetMotionRecomendations } from "../hooks/api/Motion";
import { useGetMotionCredits } from "../hooks/api/Motion";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { IMG_BASE_URL, RED } from "../constants";
import { Image } from "../components/core/Img";
import Horizontal from "../components/core/Horizontal";
import Vertical from "../components/core/Vertical";
import { MotionInfoText } from "../components/core/Titles";
const MotionContainer = styled.div`
  background: ${RED};
  width: 95%;
  margin: auto;
  border-radius: 8px;
  padding: 16px;
`;

export function MovieOrTvDetail() {
  const urlParms = useParams();
  const { mediaType, motionId } = urlParms;
  const { data: credits } = useGetMotionCredits({ mediaType, motionId });
  const { data: details } = useGetMotionDetails({ mediaType, motionId });
  const { data: recommendations } = useGetMotionRecomendations({
    mediaType,
    motionId,
  });
  //TODO FAVORITE HEART
  //TODO RATE STARS
  //TODO CAST LIST WITH SCROLL
  //TODO RECOMENDATIONS SLIDER
  return (
    <div>
      <Vertical alignItems="center" margin="auto auto 16px auto ;">
        <H2 marginBottom={0}>{details?.original_title}</H2>
        <MotionInfoText>{details?.tagline}</MotionInfoText>
      </Vertical>
      <MotionContainer>
        <Horizontal>
          <Image
            width="auto"
            height="auto"
            path={IMG_BASE_URL + details?.poster_path}
          />
          <Vertical margin=" 0px 16px">
            <MotionInfoTitles>Overview</MotionInfoTitles>
            <MotionInfoText>{details?.overview}</MotionInfoText>
            <span>{details?.budget}</span>
          </Vertical>
        </Horizontal>
      </MotionContainer>
    </div>
  );
}
