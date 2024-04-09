
import { Typography } from "@mui/material";


export default function Temperature(props){
    const reference_time=props.data[1].weather_data[0].baseTime;

    const today_weather=props.data[1].weather_data;
    const tomorrow_weather=props.data[2].weather_data.tomorrow;
    const threeDays_weather=props.data[2].weather_data.threeDays;

    if(props.state==="today"){
        return(
            <Typography>
                최고: <br />
                최저: <br />
                기온: {today_weather.find((data)=>data.category==='T1H').obsrValue}<br/>
                체감온도: {props.data[1].Wind_Chill.obsrValue.toFixed(1)}
            </Typography>
        );
    }else if(props.state==="tomorrow"){
        return(
            <Typography>
                최고: {tomorrow_weather.find((data)=>data.category==='TMN').fcstValue} <br />
                최저: {tomorrow_weather.find((data)=>data.category==='TMX').fcstValue}<br />
                기온: {tomorrow_weather.find((data)=>data.fcstTime===reference_time && data.category==='TMP').fcstValue}<br/>
            </Typography>   
        );
    }
    return(
        <Typography>
            최고: <br />
            최저: <br />
            기온: {threeDays_weather.find((data)=>data.fcstTime===reference_time && data.category==='TMP').fcstValue}<br/>
            체감온도:
        </Typography>      
    );
}