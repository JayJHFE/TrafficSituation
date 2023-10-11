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