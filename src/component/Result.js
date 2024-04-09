import React, { useEffect } from 'react';

import { Container, CircularProgress,Box,Button, Tab, Radio,RadioGroup,Grid,Divider,Typography,FormControl,FormLabel,FormControlLabel,Switch } from "@mui/material";
import {TabList,TabContext , TabPanel} from "@mui/lab/";

import {useLocation } from 'react-router-dom';

import {Item} from '../config/ItemTag';
import CustomTabPanel  from './CustomTabPanel.js';
import {useState} from 'react';
import { useQuery } from "@tanstack/react-query";

import SixHourTab from './tabs/SixHourTab.js';
import {dataDomain} from '../config/common.js'
import MainTab from "./tabs/MainTab.js";
import Temperature from './tabLabel/Temperature.js';
import Rainfall from './tabLabel/Rainfall.js';
import Sky from './tabLabel/Sky.js';
import CRMD from './tabLabel/CRMD.js';


export default function Result(){
    const [tabs,setTabs]= useState(0);
    const [reference_time,setReference_time] = useState("");
    const location = useLocation();

    const { isLoading, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
        Promise.all([
            fetch(`${dataDomain}/getSrtFcst?city=${location.state.city}&district=${location.state.dis}&neighborhood=${location.state.nei}`).then((res) =>
                res.json(),
            ),
            fetch(`${dataDomain}/getSrtNcst?city=${location.state.city}&district=${location.state.dis}&neighborhood=${location.state.nei}`).then((res) =>res.json()
            ).then((data)=>{
                setReference_time(data.weather_data[0].baseTime)
                return data
            }),
            fetch(`${dataDomain}/getVliageFcst?city=${location.state.city}&district=${location.state.dis}&neighborhood=${location.state.nei}`).then((res) =>
                res.json(),
            ),
            // fetch(`${dataDomain}/CtprvnRltmMesureDnsty?city=${location.state.city2}&nei=${location.state.nei}`).then((res) =>
            //     res.json(),
            // ),
        ])
      })
    // const { isPending, error, data } = useQuery({
    //     queryKey: ['repoData'],
    //     queryFn: () =>
    //         fetch(`${dataDomain}/getSrtFcst?city=${location.state.city}&district=${location.state.dis}&neighborhood=${location.state.nei}`).then((res) =>
    //             res.json(),
    //         ),})
    // const { isPending1, error2, data2 } = useQuery({
    //     queryKey: ['repoData'],
    //     queryFn: () =>
    //         fetch(`${dataDomain}/getSrtNcst?city=${location.state.city}&district=${location.state.dis}&neighborhood=${location.state.nei}`).then((res) =>
    //             res.json(),
    //         )})
    // const { isPending4, error4, data4 } = useQuery({
    //     queryKey: ['repoData'],
    //     queryFn: () =>
    //     fetch(`${dataDomain}/getVliageFcst?city=${location.state.city}&district=${location.state.dis}&neighborhood=${location.state.nei}`).then((res) =>
    //                 res.json(),
    //             ),
    //     })
    // const { isPending2, error3, data3 } = useQuery({
    //     queryKey: ['repoData'],
    //     queryFn: () =>
    //     fetch(`${dataDomain}/CtprvnRltmMesureDnsty?city=${location.state.city2}&nei=${location.state.nei}`).then((res) =>
    //             res.json(),
    //             ),
    //     })

    //탭 변경 이벤트
   
    function changeTabs(e,value){
        setTabs(value);
    }
    
    const [selectRadio,setSelectRadio] = useState("today")
    
    function changeRadio(e){
        setSelectRadio(e.target.value);
    }
    

    return(
        <>
        <article>
            
          {/* Section 2 결과를 확인하는 섹션*/}
          <Container maxWidth="mx" sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        height: '90vh'
                    }}> 
                <Box sx={{ 
                    flexGrow: 1,
                    maxWidth: { xs: 300, md: '50%' },
                    maxHeight: { xs: 300, md: '65%' },
                    }}>
                        <Button onClick={()=>{
                        console.log(data)
                        console.log(reference_time)
                        }
                        }>zmdmf</Button>
                        <Button onClick={()=>console.log(data[2].weather_data.tomorrow.find((data)=>
                data.fcstTime==="1500" && data.category==='T1H').fcstValue)}>zmdmf222</Button>
                    <Item>
                       {isLoading ?(
                        <CircularProgress />

                       ):(
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="h5" component="div">
                                    경기도 남양주시 진접읍 날씨
                                </Typography>  
                                <Typography>{reference_time} 기준</Typography>
                                <Button onClick={()=>console.log()}>debugs</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl>
                                    {/* <FormLabel>Options</FormLabel> */}
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        defaultValue="today"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel value="today"control={<Radio/>}label="오늘" labelPlacement="top" onChange={changeRadio}/>
                                        {/* <FormControlLabel value="6hours" control={<Radio/>} label="6시간 이후"labelPlacement="top"/> */}
                                        <FormControlLabel value="tomorrow" control={<Radio/>} label="내일" labelPlacement="top"onChange={changeRadio}/>
                                        <FormControlLabel value="3daysLater" control={<Radio/>} label="모레" labelPlacement="top" onChange={changeRadio}/>
                                    </RadioGroup>
                                    </FormControl>
                            </Grid>
                            <Divider/>
                            <Grid item xs={12}>
                                
                        <TabContext value={tabs} >
                            <TabList onChange={changeTabs} aria-label="basic tabs example" variant="fullWidth">
                                <Tab label={<React.Fragment>
                                            <Temperature data={data} state={selectRadio}/>
                                            </React.Fragment>} value={0}/>
                                <Tab label={<React.Fragment>
                                            <Rainfall data={data}state={selectRadio}/>
                                            </React.Fragment>} value={1} />
                                <Tab label={<React.Fragment>
                                            <Sky data={data} state={selectRadio}/>
                                            </React.Fragment>} value={2} />
                                <Tab label={<React.Fragment>
                                            <CRMD data={data[1]} state={selectRadio}/>
                                            </React.Fragment>} value={3} />
                            </TabList>
                            <TabPanel value={0}>
                                <MainTab/>
                            </TabPanel>
                            <TabPanel value={1}>
                                {/* <SixHourTab city={location.state.city} dis={location.state.dis} nei={location.state.nei}
                                    // windChillData={data.map((data)=>{
                                    //     if(data.response_source === "SrtFcst"){
                                    //         return data.Wind_Chill
                                    //     }
                                    // })}
                                /> */}
                            </TabPanel>
                            <TabPanel value={2}> 3</TabPanel>
                            <TabPanel value={3}> 4</TabPanel>
                        </TabContext>
                        </Grid>
                        </Grid>
                    )}
                    </Item>
              </Box>
          </Container>
          </article>
          </>
    );
}