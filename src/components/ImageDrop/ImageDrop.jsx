import React from "react";
import Dropzone from "react-dropzone";
import { ImagePlaceholder } from "../../static";

const ImageDrop = ({ className, setFieldValue, value }) => {
  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  return (
    <div>
      <Dropzone
        onDrop={async (acceptedFiles) => {
          acceptedFiles.map(async (file) => {
            Object.assign(file, {
              preview: URL.createObjectURL(file),
              base64: await getBase64(file).then((response) => {
                setFieldValue("image", response);
              }),
            });
          });
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
