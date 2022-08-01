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
import Text from "../components/core/Text";
import { useGetYear } from "../hooks/useDate";
import { useMemo } from "react";
import { MediaType } from "../Enums";

const MotionContainer = styled.div`
  background: ${RED};
  width: 95%;
  margin: auto;
  border-radius: 8px;
  padding: 16px;
`;

export function MotionDetails() {
  const urlParms = useParams();
  const { mediaType, motionId } = urlParms;
  const { data: credits } = useGetMotionCredits({ mediaType, motionId });
  const { data: details } = useGetMotionDetails({ mediaType, motionId });
  const { data: recommendations } = useGetMotionRecomendations({
    mediaType,
    motionId,
  });
  const isTv = useMemo(() => {
    return mediaType === MediaType.TV;
  }, [mediaType]);

  //TODO FAVORITE HEART BUTTON
  //TODO RATE STARS
  //TODO CAST LIST WITH SCROLL
  //TODO RECOMENDATIONS SLIDER
  return (
    <div>
      <Vertical alignItems="center" margin="auto auto 16px auto ;">
        {isTv ? (
          <H2 marginBottom={0}>{details?.name}</H2>
        ) : (
          <H2 marginBottom={0}>{details?.original_title}</H2>
        )}

        <MotionInfoText>{details?.tagline}</MotionInfoText>
      </Vertical>
      <MotionContainer>
        <Horizontal>
          <Image
            width="auto"
            height="auto"
            path={IMG_BASE_URL + details?.poster_path}
          />
          <Vertical margin="0px 16px">
            <MotionInfoTitles>Overview</MotionInfoTitles>
            <MotionInfoText>{details?.overview}</MotionInfoText>

            <Horizontal>
              {details?.genres?.map((genre) => {
                return (
                  <Text color="white" fontWeight="600" key={genre.id}>
                    {genre.name},&nbsp;{" "}
                  </Text>
                );
              })}
              <Text color="white" fontWeight="900">
                {details?.runtime} Min, &nbsp;
              </Text>

              <Text color="white" fontWeight="900">
                {useGetYear(details?.release_date)}
              </Text>
            </Horizontal>
          </Vertical>
        </Horizontal>
      </MotionContainer>
    </div>
  );
}
