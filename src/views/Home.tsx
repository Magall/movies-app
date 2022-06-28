import { useEffect, useState } from "react";
import { IMG_BASE_URL } from "../constants";
import { useFetchUpcomingMoviesQuery } from "../features/api.slice";
import { iSliderCardData } from "../interfaces";
import Slider from "../components/layout/Slider";

export default function Home() {
  const { data: upcoming, isSuccess } = useFetchUpcomingMoviesQuery(1);
  // const [sliderData =[], setSliderData] = useState(new Array<iSliderCardData>);
  const [sliderData , setSliderData] = useState(new Array<iSliderCardData>);


  useEffect(() => {
    if(upcoming){

      const upComingProps = upcoming.results.map((el) => {
        
        return {
          title: el.title,
          subtitle: el.vote_average,
          imgSrc: IMG_BASE_URL + el.poster_path,
        };
        
      });
      
      setSliderData(upComingProps);
    }
    
  }, [upcoming]);
console.log(sliderData)
  return ( 
    <div>
    //TODO: List Popular tv shows on streamings
        {sliderData.length>0? <Slider  cardData={sliderData} width={200}></Slider> :null}
</div>
    );
}
