
import { Container, Box, Tab,Tabs } from "@mui/material";


import { useParams } from 'react-router-dom';

import {Item} from '../config/ItemTag';
import CustomTabPanel  from './CustomTabPanel.js';
import {  useEffect, useState } from 'react';

import SixHourTab from './tabs/SixHourTab.js';

export default function Result(){
    const params = useParams();

    const [tabs,setTabs]=useState();

    // const location = useLocation();
    // const hourData= location.state.hour;
    // const windChillData=location.state.windChill;

    const [loding,setLoding] = useState(false);

    const [hourData,setHourData]= useState([]);
    const [windChillData,setWindChillData]=useState([]);
    // const 
    
    // // useEffect(()=>{
    // //     Promise.all([
            
    // //     ])
    // // },[])


    //탭 변경 이벤트
    function changeTabs(e,value){
        setTabs(value);
    }
    
    //특정 탭
    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

      
    return(
        <>
        <article>
          {/*Section 2 결과를 확인하는 섹션*/}
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
                    <Item>
                        <Tabs value={tabs} onChange={changeTabs} aria-label="basic tabs example"sx={{width: '100%'}}>
                            <Tab label="Item One" {...a11yProps(0)} />
                            <Tab label="Item Two" {...a11yProps(1)} />
                            <Tab label="Item Three" {...a11yProps(2)} />
                            <Tab label="Item Three" {...a11yProps(3)} />
                        </Tabs>
                        <CustomTabPanel value={tabs} index={0}>

                        </CustomTabPanel>        
                        <CustomTabPanel value={tabs} index={1}>
                            <SixHourTab city={params.city} dis={params.dis} nei={params.nei}
                                windChillData={windChillData} hourData={hourData}/>
                        </CustomTabPanel>
                        <CustomTabPanel value={tabs} index={2}>

                        </CustomTabPanel>
                        <CustomTabPanel value={tabs} index={3}>

                        </CustomTabPanel>
                            
              </Item>
              </Box>
          </Container>
          </article>
          </>
    );
}