import { H2 } from "../components/core/Titles";
import { useGetMotionDetails } from "../hooks/api/Motion";
import { useGetMotionRecomendations } from "../hooks/api/Motion";
import { useGetMotionCredits } from "../hooks/api/Motion";
import { useParams } from "react-router-dom";
export function MovieOrTvDetail() {
  const urlParms = useParams();
  const { mediaType, motionId } = urlParms;
  const { data: credits } = useGetMotionCredits({ mediaType, motionId });
  const { data: details } = useGetMotionDetails({ mediaType, motionId });
  const { data: recommendations } = useGetMotionRecomendations({
    mediaType,
    motionId,
  });
  return (
    <div>
      <H2>Details</H2>
      <span>{credits?.cast[0].name}</span>
    </div>
  );
}
