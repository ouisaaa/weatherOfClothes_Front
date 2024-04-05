
import { Container, Box, Tab, Button} from "@mui/material";
import {TabList,TabContext , TabPanel} from "@mui/lab/";

import {useLocation } from 'react-router-dom';

import {Item} from '../config/ItemTag';
import CustomTabPanel  from './CustomTabPanel.js';
import {useState} from 'react';
import { useQuery } from "@tanstack/react-query";

import SixHourTab from './tabs/SixHourTab.js';
import {dataDomain} from '../config/common.js'


export default function Result(){
    const [tabs,setTabs]= useState(1);

    const location = useLocation();


    // const windChillData=location.state.windChill;

    // const [loding,setLoding] = useState(true);

    // const [SrtFcst,setSrtFcst]= useState([]);
    // const [windChillFcst,setWindChillFcst]=useState([]);

    // const [SrtNcst,setSrtNcst] = useState([]); 
    // const [windChillNcst,setWindChillNcst] = useState([]);
    
    // const [CRMD,setCRMD] = useState([]);
    // const []

    const { isLoading, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
        Promise.all([
            fetch(`${dataDomain}/getSrtFcst?city=${location.state.city}&district=${location.state.dis}&neighborhood=${location.state.nei}`,{credentials: "include"}).then((res) =>
                res.json(),
            ),
            fetch(`${dataDomain}/getSrtNcst?city=${location.state.city}&district=${location.state.dis}&neighborhood=${location.state.nei}`,{credentials: "include"}).then((res) =>
                res.json(),
            ),
            fetch(`${dataDomain}/getVliageFcst?city=${location.state.city}&district=${location.state.dis}&neighborhood=${location.state.nei}`,{credentials: "include"}).then((res) =>
                res.json(),
            ),
            fetch(`${dataDomain}/CtprvnRltmMesureDnsty?city=${location.state.city2}&nei=${location.state.nei}`,{credentials: "include"}).then((res) =>
                res.json(),
            ),
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
                        }
                        }>zmdmf</Button>
                        {/* <Button onClick={()=>console.log(data.map((data)=>
                            console.log(data.filter((option)=>option.response_source==='SrtFcst'))
                        ))}>zmdmf222</Button> */}
                    <Item>
                        <TabContext value={tabs}>
                            <TabList onChange={changeTabs} aria-label="basic tabs example" variant="fullWidth">
                                <Tab label="Item One" value={0}/>
                                <Tab label="Item Two" value={1} />
                                <Tab label="Item Three" value={2} />
                                <Tab label="Item Three" value={3} />
                            </TabList>
                            <TabPanel value={0}>
                                main
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
                    </Item>
              </Box>
          </Container>
          </article>
          </>
    );
}