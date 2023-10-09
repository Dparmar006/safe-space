import Image from "next/image";
import React from "react";
import { Gallery } from "ds-react-grid-gallery";

const ImageComponent = (props) => {
  const { src, alt, style, title } = props;

  return <img alt={alt} src={src} title={title || ""} style={style} />;
};

async function GalleryFeed({ images }) {
  return (
    <>
      <Gallery
        enableImageSelection={false}
        images={images.map((e) => ({ ...e, src: e.download_url }))}
      />
    </>
  );
}

export default GalleryFeed;
