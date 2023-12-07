import React, { useEffect, useState } from 'react';
import { getStartTMap, getWalkTMap } from '../../api/realtimetraffic';

declare global {
    interface Window {
        Tmapv2: any;
    }
}
export default function Tmap() {
    const {Tmapv2} = window;
    const [distance, setDisatance] = useState("");
    const [time, setTime] = useState("");
    const [drawInfoArr, setDrawInfoArr] = useState([]);
    let marker_s, marker_e, marker_p, marker_p1, marker_p2;
    let totalMarkerArr = [];
    let resultdrawArr = [];
    let tDistance, tTime;

    function initTmap(){
        const mapDiv = document.getElementById('map_div');
        if (!mapDiv.firstChild) {

            const map = new Tmapv2.Map("map_div",
        {
            center: new Tmapv2.LatLng(37.566481622437934,126.98502302169841), // 지도 초기 좌표
            width: "890px",
            height: "400px",
            zoomControl : true,
			scrollwheel : true,
            zoom: 18
        });
        marker_s = new Tmapv2.Marker(
            {
                position : new Tmapv2.LatLng(37.564991,126.983937),
                // icon : "/start-marker.png",
                icon : "/upload/tmap/marker/pin_r_m_s.png",
                iconSize : new Tmapv2.Size(30, 30),
                map : map
            });

        // 도착
        marker_e = new Tmapv2.Marker(
                {
                    position : new Tmapv2.LatLng(37.566158,126.988940),
                    // icon : "/end-marker.png",
                    icon : "/upload/tmap/marker/pin_r_m_e.png",
                    iconSize : new Tmapv2.Size(30, 30),
                    map : map
                });
        getWalkTMap().then(res => {
            console.log(res)
            let resultData = res.data.features;

                        //결과 출력
                        tDistance = "총 거리 : "
                                + ((resultData[0].properties.totalDistance) / 1000)
                                        .toFixed(1) + "km,";
                        tTime = " 총 시간 : "
                                + ((resultData[0].properties.totalTime) / 60)
                                        .toFixed(0) + "분";
                        setDisatance(tDistance);
                        setTime(tTime);


                        //기존 그려진 라인 & 마커가 있다면 초기화
                        if (resultdrawArr.length > 0) {
                            for ( let i in resultdrawArr) {
                                resultdrawArr[i]
                                        .setMap(null);
                            }
                            resultdrawArr = [];
                        }


                        for ( let i in resultData) { //for문 [S]
                            let geometry = resultData[i].geometry;
                            let properties = resultData[i].properties;


                            if (geometry.type == "LineString") {
                                for ( let j in geometry.coordinates) {
                                    // 경로들의 결과값(구간)들을 포인트 객체로 변환
                                    let latlng = new Tmapv2.Point(
                                            geometry.coordinates[j][0],
                                            geometry.coordinates[j][1]);
                                    // 포인트 객체를 받아 좌표값으로 변환
                                    let convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
                                            latlng);
                                    // 포인트객체의 정보로 좌표값 변환 객체로 저장
                                    let convertChange = new Tmapv2.LatLng(
                                            convertPoint._lat,
                                            convertPoint._lng);
                                    // 배열에 담기
                                    setDrawInfoArr(convertChange);
                                    // console.log(drawInfoArr, "배열값 중간확인")
                                }
                            } else {
                                let markerImg = "";
                                let pType = "";
                                let size;

                                if (properties.pointType == "S") { //출발지 마커
                                    // markerImg = "/upload/tmap/marker/pin_r_m_s.png";
                                    pType = "S";
                                    // size = new Tmapv2.Size(24, 38);
                                } else if (properties.pointType == "E") { //도착지 마커
                                    // markerImg = "/upload/tmap/marker/pin_r_m_e.png";
                                    pType = "E";
                                    // size = new Tmapv2.Size(24, 38);
                                } else { //각 포인트 마커
                                    markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
                                    pType = "P";
                                    size = new Tmapv2.Size(8, 8);
                                }
                                // if(properties.pointType !== "S" && properties.pointType !== "E"){
                                //     markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
                                //     pType = "P";
                                //     size = new Tmapv2.Size(8, 8);
                                // }

                                // 경로들의 결과값들을 포인트 객체로 변환
                                let latlon = new Tmapv2.Point(
                                        geometry.coordinates[0],
                                        geometry.coordinates[1]);

                                // 포인트 객체를 받아 좌표값으로 다시 변환
                                let convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
                                        latlon);

                                let routeInfoObj = {
                                    markerImage : markerImg,
                                    lng : convertPoint._lng,
                                    lat : convertPoint._lat,
                                    pointType : pType
                                };

                                // Marker 추가
                                marker_p = new Tmapv2.Marker(
                                        {
                                            position : new Tmapv2.LatLng(
                                                    routeInfoObj.lat,
                                                    routeInfoObj.lng),
                                            icon : routeInfoObj.markerImage,
                                            iconSize : size,
                                            map : map
                                        });
                            }
                        }//for문 [E]
                        function addComma(num) {
                            var regexp = /\B(?=(\d{3})+(?!\d))/g;
                            return num.toString().replace(regexp, ',');
                        }

                        // function drawLine(arrPoint) {
                        //     let polylineTest;
                        //     polylineTest = new Tmapv2.Polyline({
                        //         path : arrPoint,
                        //         strokeColor : "#ff0000",
                        //         strokeWeight : 6,
                        //         map : map
                        //     });
                        //     console.log(polylineTest, "polyline_2222222");
                        //     resultdrawArr.push(polylineTest);
                        //     // polylineTest.setMap(map);
                        // }
                        // drawLine(drawInfoArr);
                        var polyline = new Tmapv2.Polyline({
                            path: [new Tmapv2.LatLng(37.56480450,126.98512028),	// 선의 꼭짓점 좌표
                                   new Tmapv2.LatLng(37.56565450,126.98512028),	// 선의 꼭짓점 좌표
                                   new Tmapv2.LatLng(37.56480450,126.98582028),	// 선의 꼭짓점 좌표
                                   new Tmapv2.LatLng(37.56565450,126.98652028),	// 선의 꼭짓점 좌표
                                   new Tmapv2.LatLng(37.56480450,126.98652028)],	// 선의 꼭짓점 좌표
                           strokeColor: "#dd00dd",
                           strokeWeight: 6,
                           strokeStyle: "solid",
                           map: map });

                });
        }
    }

    useEffect(() => {
        // 컴포넌트가 렌더링된 후에 실행될 코드
        const script = document.createElement('script');
        script.async = true;
        script.type = "text/javascript";
        initTmap();
      });
  return (
    <>
        <div id="map_div"></div>
        {/* <div>{distance}</div>
        <div>{time}</div> */}
        <p>오찌기도찌기</p>
    </>
  );
}