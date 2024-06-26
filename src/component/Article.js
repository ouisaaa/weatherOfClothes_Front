import useGeolocation from "react-hook-geolocation";
import {useState, useRef} from "react";
import {useNavigate} from "react-router-dom" ;  

import { dataDomain,cityList} from "../config/common";
import {Item} from "../config/ItemTag";

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Grid,Button,ButtonGroup, Box } from "@mui/material";
import Container from '@mui/material/Container';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import SearchIcon from '@mui/icons-material/Search';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';



export default function Article(){
    const geolocation =useGeolocation();
    
    const region_1depth_name = useRef();
    const region_2depth_name = useRef();
    const region_3depth_name = useRef();

    const [isLocation,setIsLocation] = useState(true);

    const [city,setCity] = useState();
    const [dis ,setDis] = useState();
    const [disList,setDisList] = useState([]);
    const [nei,setNei] = useState();
    const [neiList,setNeiList] = useState([]);

    const navigator= useNavigate();

    //좌표를 통해 자연어 주소를 구하는 API
    function clickCurrentLocation(event){
        event.preventDefault();

        if(event.target.textContent === "현제 위치 입력"){
            fetch(`${dataDomain}/getCurrent?x=${geolocation.longitude}&y=${geolocation.latitude}`)
            .then(response => 
                response.json())
            .then(location =>{
                console.log(JSON.stringify(location));
                // setDocumentLocation(location);
                setCity(location.documents[1].region_1depth_name);
                setDis(location.documents[1].region_2depth_name);
                setNei(location.documents[1].region_3depth_name);
                setIsLocation(false);
            })
        }else{
            setIsLocation(true);
        }
    }
    
    function distrctListSearch(e,value){
        setCity(value);
        fetch(`${dataDomain}/districtList?city=${value}`)
        .then(response =>response.json()).then(
            (data)=>{
                setDisList(data);
            }
        )
    }
    function neighborhoodListSearch(e,value){
        setDis(value);
        fetch(`${dataDomain}/neighborhoodList?dis=${value}`)
        .then(response =>response.json()).then(
            (data)=>{
                setNeiList(data);
            }
        )
    }    

    //리셋 버튼 클릭
    async function reset(e){
        e.preventDefault();
        Promise.all([setCity(''),setDis(''),setNei('')]).then(()=>setIsLocation(true))
    }
    
    //각종 날씨 정보 조회 결과 창으로
    function searchWeather(){
        navigator(`/result`, {state: {city: city, dis:dis, nei: nei, city2:city.slice(0,2)}});
    }
    
    return(
            <article>
                        <>

                    {/*Section 1 검색을 위한 섹션*/}
                        <form>
                    <Container maxWidth="xm" sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        height: '90vh'
                    }}> 
                        <Box sx={{ 
                            flexGrow: 1,
                            maxWidth: { xs: 500, md: '50%' },
                            maxHeight: { xs: 500, md: '65%' },
                            }}>
                            <Item>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <p>날씨를 알고싶은 곳을 선택을 해주세요</p>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Autocomplete
                                            freeSolo
                                            options={cityList.map((option) => option)}
                                            renderInput={(params) => <TextField {...params} label="시/도"/>}
                                            onChange={distrctListSearch}
                                            value={isLocation ? null : city} readOnly={!isLocation}
                                            ref={region_1depth_name}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Autocomplete
                                            freeSolo
                                            options={disList.map((option) => option)}
                                            renderInput={(params) => <TextField {...params} label="시/구/군"/>}
                                            onChange={neighborhoodListSearch}
                                            value={isLocation ?  null:dis} readOnly={!isLocation}
                                            ref={region_2depth_name}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Autocomplete
                                            freeSolo
                                            options={neiList.map((option) => option)}
                                            renderInput={(params) => <TextField {...params} label="동/읍/리"/>}
                                            onChange={(e,value)=>{setNei(value)}}
                                            value={isLocation ?  null:nei} readOnly={!isLocation}
                                            ref={region_3depth_name} 
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ButtonGroup variant="outlined" aria-label="Basic button group">
                                            <Button variant="outlined" onClick={isLocation ? clickCurrentLocation :reset} startIcon={isLocation? <LocationSearchingIcon/>:<HistoryEduIcon/> }>{isLocation ? "현제 위치 입력": "직접 위치 입력"}</Button>
                                            <Button variant="outlined" startIcon={<SearchIcon/>} onClick={searchWeather}>검색</Button>
                                        </ButtonGroup>
                                    </Grid>
                                </Grid>
                            </Item>
                        </Box>
                        </Container>
                    </form>
                    </>
            </article>
    );
} 