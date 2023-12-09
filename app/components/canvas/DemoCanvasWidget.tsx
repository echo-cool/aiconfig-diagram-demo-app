import React from "react";
import styled from "@emotion/styled";
import { css, Global } from "@emotion/react";

interface DemoCanvasWidgetProps {
  color?: string;
  background?: string;
  children?: React.ReactNode;
}

const S = {
  Container: styled.div<{ color: string; background: string }>`
    height: 100%;
    background-color: ${(props) => props.background};
    background-size: 50px 50px;
    display: flex;

    > * {
      height: 100%;
      min-height: 100%;
      width: 100%;
    }

    background-image: linear-gradient(
        0deg,
        transparent 24%,
        ${(props) => props.color} 25%,
        ${(props) => props.color} 26%,
        transparent 27%,
        transparent 74%,
        ${(props) => props.color} 75%,
        ${(props) => props.color} 76%,
        transparent 77%,
        transparent
      ),
      linear-gradient(
        90deg,
        transparent 24%,
        ${(props) => props.color} 25%,
        ${(props) => props.color} 26%,
        transparent 27%,
        transparent 74%,
        ${(props) => props.color} 75%,
        ${(props) => props.color} 76%,
        transparent 77%,
        transparent
      );
  `,
  Expand: css`
    html,
    body,
    #__next {
      height: 100%;
    }
  `,
};

const DemoCanvasWidget: React.FC<DemoCanvasWidgetProps> = ({
  color = "rgba(255,255,255, 0.05)",
  background = "rgb(60, 60, 60)",
  children,
}) => {
  return (
    <>
      <Global styles={S.Expand} />
      <S.Container background={background} color={color}>
        {children}
      </S.Container>
    </>
  );
};

export default DemoCanvasWidget;
