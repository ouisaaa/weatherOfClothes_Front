
import { Typography } from "@mui/material";


export default function Rainfall(props){
    const reference_time=props.data[1].weather_data[0].baseTime;

    const today_weather=props.data[1].weather_data;
    const tomorrow_weather=props.data[2].weather_data.tomorrow;
    const threeDays_weather=props.data[2].weather_data.threeDays;

    if(props.state==="today"){
        return(
            <Typography>
                습도: <br />
                강수량: {today_weather.find((data)=>data.category==='RN1').obsrValue}<br/>
                강수형태: 
            </Typography>
        );
    }else if(props.state==="tomorrow"){
        return(
            <Typography>               
                습도:  {tomorrow_weather.find((data)=>data.fcstTime===reference_time && data.category==='REH').fcstValue}<br/>
                강수확률: {tomorrow_weather.find((data)=>data.fcstTime===reference_time && data.category==='POP').fcstValue}<br/>
                강수량: {tomorrow_weather.find((data)=>data.fcstTime===reference_time && data.category==='PCP').fcstValue}<br/>
                강수형태: {tomorrow_weather.find((data)=>data.fcstTime===reference_time && data.category==='PTY').fcstValue}<br/>
        </Typography>        
        );
    }
    return(
        <Typography>
            습도:  {threeDays_weather.find((data)=>data.fcstTime===reference_time && data.category==='REH').fcstValue}<br/>
            강수확률: {threeDays_weather.find((data)=>data.fcstTime===reference_time && data.category==='POP').fcstValue}<br/>
            강수량: {threeDays_weather.find((data)=>data.fcstTime===reference_time && data.category==='PCP').fcstValue}<br/>
            강수형태:  {threeDays_weather.find((data)=>data.fcstTime===reference_time && data.category==='PTY').fcstValue}<br/>
    </Typography>        
    );

    
}