import axios from "axios";

export const getStartTMap = async () => {
	const response = await axios({
		method: 'GET',
		headers: {accept: 'application/json', appKey: 'XSHWByTAmm7m2IQx9HkcY5fUknrvSzRb9zF8nQgp'},
		url:'https://apis.openapi.sk.com/tmap/staticMap?version=1&coordType=WGS84GEO&width=512&height=512&zoom=15&format=PNG&longitude=126.83529138565&latitude=37.5446283608815&markers=126.978155%2C37.566371'
	})
	return response
}

// const options = {
// 	method: 'GET',
// 	headers: {accept: 'application/json', appKey: 'XSHWByTAmm7m2IQx9HkcY5fUknrvSzRb9zF8nQgp'}
//   };

//   fetch('https://apis.openapi.sk.com/tmap/staticMap?version=1&coordType=WGS84GEO&width=512&height=512&zoom=15&format=PNG&longitude=126.83529138565&latitude=37.5446283608815&markers=126.978155%2C37.566371', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));


// var xhr = new XMLHttpRequest();
// 	var url = 'http://openapi.seoul.go.kr:8088/sample/xml/CardSubwayStatsNew/1/5/20220301'; /* URL */
// 	xhr.open('GET', url);
// 	xhr.onreadystatechange = function () {
// 		if (this.readyState == xhr.DONE) {  // <== 정상적으로 준비되었을때
// 		if(xhr.status == 200||xhr.status == 201){ // <== 호출 상태가 정상적일때
// 			alert('Status: '+this.status+
// 				'\nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+
// 				'\nBody: '+this.responseText);
// 			}
// 		}
// 	};
// 	xhr.send('');

export const getWalkTMap = async () => {
	const response = await axios({
		method: 'POST',
		headers: {accept: 'application/json', appKey: 'XSHWByTAmm7m2IQx9HkcY5fUknrvSzRb9zF8nQgp'},
		url: "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result",
		data : {
				 "startX" : "126.983937",
				 "startY" : "37.564991",
				 "endX" : "126.988940",
				 "endY" : "37.566158",
				 "reqCoordType" : "WGS84GEO",
				 "resCoordType" : "EPSG3857",
				 "startName" : "출발지",
				 "endName" : "도착지"
				},
	})
	return response
}
// var headers = {};
// 			headers["appKey"]="발급AppKey";

// 		$.ajax({
// 				method : "POST",
// 				headers : headers,
// 				url : "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result",
// 				async : false,
// 				data : {
// 					"startX" : "126.983937",
// 					"startY" : "37.564991",
// 					"endX" : "126.988940",
// 					"endY" : "37.566158",
// 					"reqCoordType" : "WGS84GEO",
// 					"resCoordType" : "EPSG3857",
// 					"startName" : "출발지",
// 					"endName" : "도착지"
// 				},
// 				success : function(response) {
// 					var resultData = response.features;

// 					//결과 출력
// 					var tDistance = "총 거리 : "
// 							+ ((resultData[0].properties.totalDistance) / 1000)
// 									.toFixed(1) + "km,";
// 					var tTime = " 총 시간 : "
// 							+ ((resultData[0].properties.totalTime) / 60)
// 									.toFixed(0) + "분";

// 					$("#result").text(tDistance + tTime);

// 					//기존 그려진 라인 & 마커가 있다면 초기화
// 					if (resultdrawArr.length > 0) {
// 						for ( var i in resultdrawArr) {
// 							resultdrawArr[i]
// 									.setMap(null);
// 						}
// 						resultdrawArr = [];
// 					}

// 					drawInfoArr = [];

// 					for ( var i in resultData) { //for문 [S]
// 						var geometry = resultData[i].geometry;
// 						var properties = resultData[i].properties;
// 						var polyline_;


// 						if (geometry.type == "LineString") {
// 							for ( var j in geometry.coordinates) {
// 								// 경로들의 결과값(구간)들을 포인트 객체로 변환
// 								var latlng = new Tmapv2.Point(
// 										geometry.coordinates[j][0],
// 										geometry.coordinates[j][1]);
// 								// 포인트 객체를 받아 좌표값으로 변환
// 								var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
// 										latlng);
// 								// 포인트객체의 정보로 좌표값 변환 객체로 저장
// 								var convertChange = new Tmapv2.LatLng(
// 										convertPoint._lat,
// 										convertPoint._lng);
// 								// 배열에 담기
// 								drawInfoArr.push(convertChange);
// 							}
// 						} else {
// 							var markerImg = "";
// 							var pType = "";
// 							var size;

// 							if (properties.pointType == "S") { //출발지 마커
// 								markerImg = "/upload/tmap/marker/pin_r_m_s.png";
// 								pType = "S";
// 								size = new Tmapv2.Size(24, 38);
// 							} else if (properties.pointType == "E") { //도착지 마커
// 								markerImg = "/upload/tmap/marker/pin_r_m_e.png";
// 								pType = "E";
// 								size = new Tmapv2.Size(24, 38);
// 							} else { //각 포인트 마커
// 								markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
// 								pType = "P";
// 								size = new Tmapv2.Size(8, 8);
// 							}

// 							// 경로들의 결과값들을 포인트 객체로 변환
// 							var latlon = new Tmapv2.Point(
// 									geometry.coordinates[0],
// 									geometry.coordinates[1]);

// 							// 포인트 객체를 받아 좌표값으로 다시 변환
// 							var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
// 									latlon);

// 							var routeInfoObj = {
// 								markerImage : markerImg,
// 								lng : convertPoint._lng,
// 								lat : convertPoint._lat,
// 								pointType : pType
// 							};

// 							// Marker 추가
// 							marker_p = new Tmapv2.Marker(
// 									{
// 										position : new Tmapv2.LatLng(
// 												routeInfoObj.lat,
// 												routeInfoObj.lng),
// 										icon : routeInfoObj.markerImage,
// 										iconSize : size,
// 										map : map
// 									});
// 						}
// 					}//for문 [E]
// 					drawLine(drawInfoArr);
// 				},
// 				error : function(request, status, error) {
// 					console.log("code:" + request.status + "\n"
// 							+ "message:" + request.responseText + "\n"
// 							+ "error:" + error);
// 				}
// 			});