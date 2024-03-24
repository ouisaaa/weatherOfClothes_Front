import useGeolocation from "react-hook-geolocation";
import {useState, useRef, useEffect} from "react";
import { kakaoAPIDomain,dataDomain,cityList, kakaoAPIKey } from "../../config/common";

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Grid,Button,ButtonGroup } from "@mui/material";
import Container from '@mui/material/Container';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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


    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
      
      const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
      ];
    return(
            <article>
                        <>

                    {/*Section 1 검색을 위한 섹션*/}
                        <form>
                    <Container maxWidth="xm">
                            <p>날씨를 알고싶은 곳을 선택을 해주세요</p>
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
                            <ButtonGroup variant="outlined" aria-label="Basic button group" style={{marginTop: '16px'}}>
                                <Button variant="outlined" onClick={isLocation ? clickCurrentLocation :reset} startIcon={<LocationSearchingIcon/>}>{isLocation ? "현제 위치 입력": "직접 위치 입력"}</Button>
                                <Button variant="outlined" onClick={isLocation ? clickCurrentLocation :reset} startIcon={<SearchIcon/>}>검색</Button>
                            </ButtonGroup>
                        </Container>
                    </form>
                    {/*Section 2 결과를 확인하는 섹션*/}
                    <Container maxWidth="mx">

                    <h1>{city} {dis} {nei} 날씨</h1>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Dessert (100g serving)</TableCell>
                                <TableCell align="right">Calories</TableCell>
                                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                        
                    </Container>
                    </>
            </article>
    );
} 