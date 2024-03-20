import useGeolocation from "react-hook-geolocation";
import {useState, useRef, useEffect} from "react";
import { kakaoAPIKey } from "../../config/common";

export default function Article(){
    const geolocation =useGeolocation();
    
    const [documentLocation,setDocumentLocation] = useState({});

    const region_1depth_name = useRef();
    const region_2depth_name = useRef();
    const region_3depth_name = useRef();

    const [isLocation,setIsLocation] = useState(true);
    const [city,setCity] = useState();
    const [dis ,setDis] = useState();
    const [nei,setNei] = useState();

    /**
     * TODO LIST
     * 현제위치를 가져오면 시구동 밑에 주소 입력 란에 들어가게 ㄱㄱ
     * 지금 현제위치를 위도와 경도로 가져왔는데 이것을 반환해 사용자가 클릭 한번에 
     * 호다닥 되게
     */
    //좌표를 통해 자연어 주소를 구하는 API
    function clickCurrentLocation(event){
    
        if(event.target.textContent === "현제 위치 입력"){
            fetch(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${geolocation.longitude}&y=${geolocation.latitude}`,{
                method: "GET",
                headers:{
                    Authorization: `${kakaoAPIKey}`
                }
            }).then(response => response.json())
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
                    {/* {isLocation ? ( */}
                        <>
                    <button onClick={clickCurrentLocation}>{isLocation ? "현제 위치 입력": "직접 위치 입력"}</button> 
                    <div>
                        <label>시</label>
                        <label>구</label>
                        <label>동</label>
                    </div>
                    <div>
                        <input type="text" className="input" ref={region_1depth_name} value={isLocation ? null : city} readOnly={!isLocation}/>
                        <input type="text" className="input"ref={region_2depth_name} value={isLocation ?  null:dis} readOnly={!isLocation}/>
                        <input type="text" className="input"ref={region_3depth_name} value={isLocation ?  null:nei} readOnly={!isLocation}/>
                    </div>
                    <button>검색</button>
                    </>
                    {/* ):(
                        <>
                        <button onClick={clickCurrentLocation}></button> 
                        <div>
                            <label>시</label>
                            <label>구</label>
                            <label>동</label>
                        </div>
                        <div>
                            <input type="text" value={city}/>
                            <input type="text" value={dis}/>
                            <input type="text" value={nei}/>
                            
                        </div>
                        <button>검색</button>
                        </>
                    )} */}
                </div>
            </article>
    );
} 