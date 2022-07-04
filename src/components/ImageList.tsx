import React from "react";
import { styled } from "@mui/system";
import { keyframes } from "@mui/styled-engine";

const BoxImage = styled("div")({
  // overflow: "hidden",
  // position: "absolute",
  zIndex: 1,
});

const ZoomOut = keyframes`
  from{
    transform:scale(5)
  }
  to{
    transform:scale(1)
  }
`;

const Image = styled("img")({
  width: "auto",
  height: "auto",
  opacity: ".4",
  // mixBlendMode: "multiply",
  animation: `${ZoomOut} ${Math.round(Math.random() * 5)}s ease-in-out`,
  filter: `contrast(50%)`,
  "&:hover": {
    filter: `contrast(100%)`,
    opacity: "1",
    transition: ".5s",
  },
});

type Props = {
  width?: number;
  height?: number;
  path: string;
};

const ImageList = ({ width = 50, height = 50, path }: Props) => {
  return (
    <BoxImage style={{ width: width, height: height }}>
      <Image
        src={path}
        alt={path}
        style={{ backgroundImage: `url('${path}')` }}
      />
    </BoxImage>
  );
};

export default ImageList;
