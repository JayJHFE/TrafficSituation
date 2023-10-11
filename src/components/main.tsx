import React, { useEffect } from 'react';

declare global {
    interface Window {
        Tmapv2: any;
    }
}
export default function Main() {
    const {Tmapv2} = window;
    function initTmap(){
        const mapDiv = document.getElementById('map_div');
        if (!mapDiv.firstChild) {
            const map = new Tmapv2.Map("map_div", {
              center: new window.Tmapv2.LatLng(37.566481622437934,126.98502302169841),
              width: "890px",
              height: "400px",
              zoom: 15
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