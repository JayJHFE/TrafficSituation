import React, { useEffect } from 'react';

declare global {
    interface Window {
        Tmapv3: any;
    }
}
export default function Main() {
    const {Tmapv3} = window;
    function initTmap(){
        const mapDiv = document.getElementById('map_div');
        if (!mapDiv.firstChild) {
        const map = new Tmapv3.Map("map_div",
        {
            center: new Tmapv3.LatLng(37.566481622437934,126.98502302169841), // 지도 초기 좌표
            width: "890px",
            height: "400px",
            zoom: 18
        });
    }
    }
    useEffect(() => {
        // 컴포넌트가 렌더링된 후에 실행될 코드
        const script = document.createElement('script');
        script.async = true;
        script.type = "text/javascript";

        initTmap();
      }, []);
  return (
    <>
        <div id="map_div"></div>
    </>
  );
}