import axios from "axios";

export const getRealtimeTraffic = async () => {
	const response = await axios({
		url: 'http://openapi.seoul.go.kr:8088/434f72646a646f763637525a6d6a6f/xml/TrafficInfo/1/5/1220003800',
		method: 'get'
	})
	return response
}

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