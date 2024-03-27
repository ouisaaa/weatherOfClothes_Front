import { Grid, Button,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper } from "@mui/material";

import { LineChart } from '@mui/x-charts/LineChart';

export default function SixHourTab(props){

    function createData(category,time=[]) {
        // {LGT,RN1,SKY,T1H,REH,UUU,VVV,VEC,WSD}
        return {category,time};
    }
    
    const rows = [
        createData("기온", props.hourData.filter((data)=>data.category ==="T1H").map((value)=>value.fcstValue)),
        createData('하늘상태', props.hourData.filter((data)=>data.category ==="SKY").map((value)=>value.fcstValue)),
        createData('습도', props.hourData.filter((data)=>data.category ==="REH").map((value)=>value.fcstValue)),
        createData('풍향', props.hourData.filter((data)=>data.category ==="VEC").map((value)=>value.fcstValue)),
        createData('풍속', props.hourData.filter((data)=>data.category ==="WSD").map((value)=>value.fcstValue)),
        createData('강수형태', props.hourData.filter((data)=>data.category ==="PTY").map((value)=>value.fcstValue)),
        createData('1시간 강수량', props.hourData.filter((data)=>data.category ==="RN1").map((value)=>value.fcstValue)),
        createData('낙뢰', props.hourData.filter((data)=>data.category ==="LGT").map((value)=>value.fcstValue)),
        createData('동서바람성분', props.hourData.filter((data)=>data.category ==="UUU").map((value)=>value.fcstValue)),
        createData('남북바람성분', props.hourData.filter((data)=>data.category ==="VVV").map((value)=>value.fcstValue)),
    ];

   return( <Grid container spacing={2}> 
  <Grid item xs={12}>
        <h1>{props.city} {props.dis} {props.nei} 날씨</h1>
        <LineChart
            xAxis={[{ 
                // data: windChill.fcstTime
                scaleType: 'point',data: props.windChillData.map((value)=>value.fcstTime) ,label: "시간" }]}
            yAxis={[{
                // data: windChill.fcstValue,
                label: "기온"}]}
            series={[
                {data: props.windChillData.map((value)=>value.fcstValue), label:'체감온도'},
                {data: props.hourData.filter((data)=>data.category ==="T1H").map((value)=>value.fcstValue),label:'기온'}
                // {data:weatherData.filter((data)=>data.category)}
                // {data:weatherDatad},
            ]}
            minWidth={650}
            height={300}
          />

    </Grid>

<Grid item xs={12}>
    <Button onClick={()=>{
        console.log(props.hourData.filter((data)=>data.category ==="T1H").map((value)=>value.fcstValue));
        console.log(props.windChillData);
    }}></Button>
  <TableContainer component={Paper} sx={{boder:'1px solid white'}}>
      <Table sx={{ minWidth: '100%' }} aria-label="simple table">
          <TableHead>
          <TableRow>
            <TableCell>시간</TableCell>
            <TableCell align="right">{props.windChillData[0].fcstTime}</TableCell>
            <TableCell align="right">{props.windChillData[1].fcstTime}</TableCell>
            <TableCell align="right">{props.windChillData[2].fcstTime}</TableCell>
            <TableCell align="right">{props.windChillData[3].fcstTime}</TableCell>
            <TableCell align="right">{props.windChillData[4].fcstTime}</TableCell>
            <TableCell align="right">{props.windChillData[5].fcstTime}</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {rows.map((row) => (
              <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <TableCell component="th" scope="row">
                  {row.category}
              </TableCell>
              <TableCell align="right">{row.time[0]}</TableCell>
              <TableCell align="right">{row.time[1]}</TableCell>
              <TableCell align="right">{row.time[2]}</TableCell>
              <TableCell align="right">{row.time[3]}</TableCell>
              <TableCell align="right">{row.time[4]}</TableCell>
              <TableCell align="right">{row.time[5]}</TableCell>
              </TableRow>
          ))}
          </TableBody>
      </Table>
      </TableContainer>
      </Grid>
      </Grid>
   );
}