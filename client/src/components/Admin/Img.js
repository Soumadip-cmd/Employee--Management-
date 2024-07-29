import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { quality, format } from "@cloudinary/url-gen/actions/delivery";
import { enhance } from "@cloudinary/url-gen/actions/effect"; // Correct import for enhance effect
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { face } from "@cloudinary/url-gen/qualifiers/focusOn";
import { lazyload, responsive, placeholder } from '@cloudinary/react';

const Img = ({ upload_id }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "deg0l45uc", // Replace with your Cloudinary cloud name
    },
  });

  // Assuming upload_id is a string containing the public_id of the image
  const myImage = cld.image(upload_id);

  // Apply transformations for quality and enhancement
  myImage
    .resize(
      thumbnail()
        .width(150)
        .height(150)
        .gravity(focusOn(face()))
    )
    .delivery(quality("auto")) // Automatically adjust the quality
    .delivery(format("auto")) // Automatically select the best format
    .effect(enhance()); // Enhance the image

  return (
    <div>
      <AdvancedImage cldImg={myImage} plugins={[responsive(), lazyload(), placeholder()]} className="rounded-2"  style={{width:'130px'}}/>
    </div>
  );
};

export default Img;
