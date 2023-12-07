import React from 'react';
import * as S from './layoutHeader';

export default function LayoutHeader() {
    return(
        <>
            <S.Test>
                <div className="header__logo">
                    <img src="/images/logo.png" alt="logo" />
                </div>
                <div className="header__title">
                    <h1>교통상황</h1>
                </div>
            </S.Test>
        </>
    )
}