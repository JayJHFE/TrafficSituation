import React, { useEffect, useState } from 'react';
import { getWalkTMap } from '../api/realtimetraffic';

declare global {
    interface Window {
        Tmapv3: any;
    }
}
export default function Main() {
    const {Tmapv3} = window;
    const [distance, setDisatance] = useState("");
    const [time, setTime] = useState("");
    let marker_s, marker_e, marker_p, marker_p1, marker_p2;
    let totalMarkerArr = [];
    let drawInfoArr = [];
    let resultdrawArr = [];
    let tDistance, tTime;

    function initTmap(){
        const mapDiv = document.getElementById('map_div');
        if (!mapDiv.firstChild) {

            const map = new Tmapv3.Map("map_div",
        {
            center: new Tmapv3.LatLng(37.566481622437934,126.98502302169841), // 지도 초기 좌표
            width: "890px",
            height: "400px",
            zoomControl : true,
			scrollwheel : true,
            zoom: 18
        });
        marker_s = new Tmapv3.Marker(
            {
                position : new Tmapv3.LatLng(37.564991,126.983937),
                icon : "/start-marker.png",
                iconSize : new Tmapv3.Size(30, 30),
                map : map
            });

        // 도착
        marker_e = new Tmapv3.Marker(
                {
                    position : new Tmapv3.LatLng(37.566158,126.988940),
                    icon : "/end-marker.png",
                    iconSize : new Tmapv3.Size(30, 30),
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
                        drawInfoArr = [];

                        for ( let i in resultData) { //for문 [S]
                            let geometry = resultData[i].geometry;
                            let properties = resultData[i].properties;
                            let polyline_;


                            if (geometry.type == "LineString") {
                                for ( let j in geometry.coordinates) {
                                    // 경로들의 결과값(구간)들을 포인트 객체로 변환
                                    let latlng = new Tmapv3.Point(
                                            geometry.coordinates[j][0],
                                            geometry.coordinates[j][1]);
                                    // 포인트 객체를 받아 좌표값으로 변환
                                    let convertPoint = new Tmapv3.Projection.convertEPSG3857ToWGS84GEO(
                                            latlng);
                                    // 포인트객체의 정보로 좌표값 변환 객체로 저장
                                    let convertChange = new Tmapv3.LatLng(
                                            convertPoint._lat,
                                            convertPoint._lng);
                                    // 배열에 담기
                                    drawInfoArr.push(convertChange);
                                    // console.log(drawInfoArr, "배열값 중간확인")
                                }
                            } else {
                                let markerImg = "";
                                let pType = "";
                                let size;

                                // if (properties.pointType == "S") { //출발지 마커
                                //     markerImg = "/upload/tmap/marker/pin_r_m_s.png";
                                //     pType = "S";
                                //     size = new Tmapv3.Size(24, 38);
                                // } else if (properties.pointType == "E") { //도착지 마커
                                //     markerImg = "/upload/tmap/marker/pin_r_m_e.png";
                                //     pType = "E";
                                //     size = new Tmapv3.Size(24, 38);
                                // } else { //각 포인트 마커
                                if(properties.pointType !== "S" && properties.pointType !== "E"){
                                    markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
                                    pType = "P";
                                    size = new Tmapv3.Size(8, 8);
                                }
                                // }

                                // 경로들의 결과값들을 포인트 객체로 변환
                                let latlon = new Tmapv3.Point(
                                        geometry.coordinates[0],
                                        geometry.coordinates[1]);

                                // 포인트 객체를 받아 좌표값으로 다시 변환
                                let convertPoint = new Tmapv3.Projection.convertEPSG3857ToWGS84GEO(
                                        latlon);

                                let routeInfoObj = {
                                    markerImage : markerImg,
                                    lng : convertPoint._lng,
                                    lat : convertPoint._lat,
                                    pointType : pType
                                };

                                // Marker 추가
                                marker_p = new Tmapv3.Marker(
                                        {
                                            position : new Tmapv3.LatLng(
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

                        function drawLine(arrPoint) {
                            let polyline_;

                            polyline_ = new Tmapv3.Polyline({
                                path : arrPoint,
                                strokeColor : "#DD0000",
                                strokeWeight : 6,
                                map : map
                            });
                            resultdrawArr.push(polyline_);
                        }
                        drawLine(drawInfoArr);
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
        <div>{distance}</div>
        <div>{time}</div>
        <p>오찌기도찌기</p>
    </>
  );
}