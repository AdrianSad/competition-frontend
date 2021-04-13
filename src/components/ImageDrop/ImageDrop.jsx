import React from "react";
import Dropzone from "react-dropzone";
import { ImagePlaceholder } from "../../static";

const ImageDrop = ({ className, setFieldValue, value }) => {
  return (
    <div>
      <Dropzone
        onDrop={(acceptedFiles) => {
          const file = acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          );
          setFieldValue("image", file[0].preview);
        }}
        accept={"image/*"}
        maxFiles={1}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <img
                src={value || ImagePlaceholder}
                alt={"Upload competition image"}
                className={className}
              />
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};

export default ImageDrop;
