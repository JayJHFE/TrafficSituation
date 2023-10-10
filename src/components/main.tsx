import React from 'react';
import { getRealtimeTraffic } from '../api/realtimetraffic';

export default function Main() {
    let aaa;
    let bodys;
    getRealtimeTraffic().then((res) => {
        console.log(res)
        aaa = JSON.stringify(res.headers);
        console.log(aaa)
        // bodys = res.responseText;
    }).catch((err) => {
        console.log(err)
    });
    return (<>
    <div>헬로헬로</div>
    </>)
}