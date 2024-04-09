import { Typography } from "@mui/material";


export default function CRMD(props){
    if(props.state==="today"){
        return(
            <Typography>
                통합대기환경지수: <br />
                PM10지수: {props.data.weather_data.find((data)=>data.category==='RN1').obsrValue}<br/>
                PM2.5지수: 
            </Typography>
        );
    }else if(props.state==="tomorrow"){
        return(
            <Typography>
            State 2<br />
            기온: {props.data.weather_data[3].obsrValue}<br/>
            T1 Label 2
        </Typography>        
        );
    }
    return(
        <Typography>
        State 3<br />
        기온: {props.data.weather_data[3].obsrValue}<br/>
        T1 Label 2
    </Typography>        
    );
}