import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import { useWindowSize } from "./useWindowSize";
import ImageList from "./components/ImageList";
// import { Grid } from "@material-ui/core";

const App: React.FC = () => {
  const { width, height } = useWindowSize();

  const [imageWidth, setImageWidth] = useState<number>(0);
  const [imageHeight, setImageHeight] = useState<number>(0);

  const [tileSize, setTileSize] = useState({
    width: 50,
    height: 50,
  });

  const totalImageTiles = useMemo(
    () =>
      Math.round(imageWidth / tileSize.width) *
      Math.round(imageHeight / tileSize.height),
    [imageHeight, imageWidth, tileSize.width, tileSize.height]
  );

  const fakeFor = useMemo(
    () => Array(totalImageTiles).fill(0),
    [totalImageTiles]
  );

  useEffect(() => {
    let currentWidth = width;
    let currentHeight = height;

    if (width > 720) {
      currentWidth = 720;
    }

    if (height > 960) {
      currentHeight = 960;
    }

    const resultHeight = currentWidth * (4 / 3);

    if (resultHeight > currentHeight) {
      const resultWitdh = currentHeight * (3 / 4);

      currentWidth = resultWitdh;
    } else {
      currentHeight = resultHeight;
    }

    setImageWidth(currentWidth);
    setImageHeight(currentHeight);
  }, [width, height]);

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: imageWidth,
          height: imageHeight,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1656716871242-b2b701fa10ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80"
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
          alt=""
        />

        {totalImageTiles > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(50px, 1fr))",
              gridTemplateRows: "auto 1fr",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 9999,
              overflow: "hidden",
              // opacity: 0.5,
            }}
          >
            {fakeFor?.map((t, id) => {
              return (
                <ImageList
                  path={`https://picsum.photos/50?p=${Math.random()}`}
                />
                // <div
                //   key={id}
                //   // src={`https://picsum.photos/50?p=${Math.random()}`}
                //   style={{
                //     width: "50px",
                //     height: "50px",
                //     backgroundImage: `url('https://picsum.photos/50?p=${Math.random()}')`,
                //     // mixBlendMode: "darken",
                //     backgroundBlendMode: "lighten",
                //     opacity: 0.5,
                //   }}
                //   // alt=""
                // ></div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
