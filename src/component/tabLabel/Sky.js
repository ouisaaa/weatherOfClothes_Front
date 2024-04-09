import { Typography } from "@mui/material";


import NorthIcon from '@mui/icons-material/North';
import EastIcon from '@mui/icons-material/East';
import SouthIcon from '@mui/icons-material/South';
import WestIcon from '@mui/icons-material/West';

import SouthEastIcon from '@mui/icons-material/SouthEast';
import SouthWestIcon from '@mui/icons-material/SouthWest';
import NorthWestIcon from '@mui/icons-material/NorthWest';
import NorthEastIcon from '@mui/icons-material/NorthEast';



export default function Sky(props){

    const reference_time=props.data[1].weather_data[0].baseTime;

    const today_weather=props.data[1].weather_data;
    const tomorrow_weather=props.data[2].weather_data.tomorrow;
    const threeDays_weather=props.data[2].weather_data.threeDays;

    const SkyCode = ["","맑음","","구름많음","흐림"];
    const WSDCode =(code)=>{
        if(parseFloat(code)<4){
            return "약";
        }else if(parseFloat(code)>=4 && parseFloat(code)<9){
            return "약간강";
        }else if(parseFloat(code)>=9 && parseFloat(code)<14){
            return "강";
        }else if(parseFloat(code)>=14){
            return "매우강";
        }
    }

    

    const VECCode=(code)=>{
        const tmp = parseInt(code);
        const refValue=[0,45,90,135,180,225,270,315,360]

        const VECIcon=(code)=>{
            switch (code){
                case 0: return <NorthIcon/>
                case 45: return <NorthEastIcon/>
                case 90: return <EastIcon/>
                case 135: return <SouthEastIcon/>
                case 180: return <SouthIcon/>
                case 225: return <SouthWestIcon/>
                case 270: return <WestIcon/>
                case 315: return <NorthWestIcon/>
                case 360: return <NorthIcon/>
            }
    
        }

        for(let i=1;i<refValue.length-1;i++){
            if(tmp>=refValue[i]){
                if(Math.abs((refValue[i-1]+refValue[i])/2)>tmp){
                    return VECIcon(refValue[i-1]); 
                }else if(Math.abs((refValue[i-1]+refValue[i])/2)<=tmp){
                    return VECIcon(refValue[i]); 
                }
            }
        }
    }
    if(props.state==="today"){
        return(
            <Typography>
                하늘상태: <br />
                풍속: {today_weather.find((data)=>data.category==='RN1').obsrValue}<br/>
                풍향: 
            </Typography>
        );
    }else if(props.state==="tomorrow"){
        return(
            <Typography>
                하늘상태:{SkyCode[tomorrow_weather.find((data)=>data.fcstTime===reference_time && data.category==='SKY').fcstValue]}<br/>
                풍속: {WSDCode(tomorrow_weather.find((data)=>data.fcstTime===reference_time && data.category==='WSD').fcstValue)}<br/>
                풍향: {VECCode(tomorrow_weather.find((data)=>data.fcstTime===reference_time && data.category==='VEC').fcstValue)}<br/>
                
            </Typography>       
        );
    }
    return(
        <Typography>
            하늘상태:{SkyCode[tomorrow_weather.find((data)=>data.fcstTime===reference_time && data.category==='SKY').fcstValue]}<br/>
            풍속: {WSDCode(tomorrow_weather.find((data)=>data.fcstTime===reference_time && data.category==='WSD').fcstValue)}<br/>
            풍향: {VECCode(threeDays_weather.find((data)=>data.fcstTime===reference_time && data.category==='VEC').fcstValue)}<br/>
                
        </Typography>       
    );


}