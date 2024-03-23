import useGeolocation from "react-hook-geolocation";
import {useState, useRef, useEffect} from "react";
import { kakaoAPIDomain,dataDomain,cityList, kakaoAPIKey } from "../../config/common";

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Grid } from "@mui/material";
import Container from '@mui/material/Container';


export default function Article(){
    const geolocation =useGeolocation();
    
    const [documentLocation,setDocumentLocation] = useState({});

    const region_1depth_name = useRef();
    const region_2depth_name = useRef();
    const region_3depth_name = useRef();

    const [isLocation,setIsLocation] = useState(true);

    const [city,setCity] = useState();
    const [dis ,setDis] = useState();
    const [disList,setDisList] = useState([]);
    const [nei,setNei] = useState();
    const [neiList,setNeiList] = useState([]);

    //좌표를 통해 자연어 주소를 구하는 API
    function clickCurrentLocation(event){
        event.preventDefault();

        if(event.target.textContent === "현제 위치 입력"){
            fetch(`${kakaoAPIDomain}?x=${geolocation.longitude}&y=${geolocation.latitude}`,{
                method: "GET",
                headers:{
                    Authorization: `${kakaoAPIKey}`
                }
            }).then(response => 
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
    // useEffect(()=>{
    //     // document.getElementById("1").value(documentLocation.documents[1].region_1depth_name);
    //     // document.getElementById("2").value(documentLocation.documents[1].region_1depth_name);
    //     // document.getElementById("3").value(documentLocation.documents[1].region_1depth_name);
    //     // console.log(documentLocation.documents);
    //     setIsLocation(true);
    // },[setNei])

    function check(){
        console.log(isLocation);
    }

    function distrctListSearch(e,value){
        setCity(value);
        fetch(`${dataDomain}/weather/districtList?city=${value}`)
        .then(response =>response.text()).then(
            (data)=>{
                setDisList(data.split(", "));
            }
        )
    }
    function neighborhoodListSearch(e,value){
        setDis(value);
        fetch(`${dataDomain}/weather/neighborhoodList?district=${value}`)
        .then(response =>response.text()).then(
            (data)=>{
                setNeiList(data.split("\",\""));
            }
        )
    }    

    async function reset(e){
        e.preventDefault();
        Promise.all([setCity(''),setDis(''),setNei('')]).then(()=>setIsLocation(true))
    }

    // useEffect (()=>{
    //     if(!isLocation){
    //         setCity('');
    //     }
    // },[isLocation])
    return(
            <article>
                <div>
                    <div>안녕하세요</div>
                    <div>반갑읍니다.</div>
                </div>
                <div>
                    <p>날씨를 알고싶은 곳을 선택을 해주세요</p>
                    <div>
                        <button onClick={check}/>
                    </div>
                        <>
                        <form>
                    <button onClick={isLocation ? clickCurrentLocation :reset}>{isLocation ? "현제 위치 입력": "직접 위치 입력"}</button> 
                    <div>
                        <label>시</label>
                        <label>구</label>
                        <label>동</label>
                    </div>
                    <div>
                    <Container maxWidth="xm">
                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                <Autocomplete
                                    freeSolo
                                    options={cityList.map((option) => option)}
                                    renderInput={(params) => <TextField {...params} label="시/도"/>}
                                    onChange={distrctListSearch}
                                    value={isLocation ? null : city} readOnly={!isLocation}
                                    ref={region_1depth_name}
                                />
                                </Grid>
                                <Grid item xs={4}>
                                <Autocomplete
                                    freeSolo
                                    options={disList.map((option) => option)}
                                    renderInput={(params) => <TextField {...params} label="시/구/군"/>}
                                    onChange={neighborhoodListSearch}
                                    value={isLocation ?  null:dis} readOnly={!isLocation}
                                    ref={region_2depth_name}
                                />
                                </Grid>
                                <Grid item xs={4}>
                                <Autocomplete
                                    freeSolo
                                    options={neiList.map((option) => option)}
                                    renderInput={(params) => <TextField {...params} label="동/읍/리"/>}
                                    value={isLocation ?  null:nei} readOnly={!isLocation}
                                    ref={region_3depth_name} 
                                />
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
                    </form>
                    <button>검색</button>
                    </>
                </div>
            </article>
    );
} 