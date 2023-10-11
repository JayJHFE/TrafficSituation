import React, { useEffect } from 'react';

export default function Main() {
    const {Tmapv2} = window;
    function initTmap(){
        const map = new window.Tmapv2.Map("map_div",
        {
            center: new Tmapv2.LatLng(37.566481622437934,126.98502302169841), // 지도 초기 좌표
            width: "890px",
            height: "400px",
            zoom: 15
        });
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