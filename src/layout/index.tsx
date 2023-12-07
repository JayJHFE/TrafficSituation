
import React from 'react';
import { Body } from "./layoutStyles";

interface ILayoutProps {
  children: JSX.Element;
}

export default function Layout(props: ILayoutProps) {
  return (
    <>
        <Body>
            {props.children}
        </Body>
    </>
  );
}