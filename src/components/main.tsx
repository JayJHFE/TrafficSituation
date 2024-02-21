import React from 'react';
import Tmap from './Tmap/Tmap';
import NoUi from './NoUi';

export default function Main() {
  return (
    //  버튼으로 NoUi와 Tmap중에 어떤페이지를 열지 결정
    <>
    <div>
      <div>아무것도없음</div>
      <button>
        <a href="/NoUi">
          NoUi
        </a>
      </button>
      <button>
        <a href="/Tmap">
          Tmap
        </a>
      </button>
    </div>
    </>
  );
}