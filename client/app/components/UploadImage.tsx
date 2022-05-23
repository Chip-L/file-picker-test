import React from "react";
import { Button, View } from "react-native";

interface UploadImageProps {
  type: "picked" | "taken";
  pathToImage: string | null;
}

const HOST = "http://192.168.1.32:8000";
const URL = HOST + "/api/add-image-no-mw";

const fetchImageFromUri = async (uri: string) => {
  console.log("***** Fetch Image From Uri *****");
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    console.log("Blob.prototype.size:", blob.size);
    console.log("Blob.prototype.type:", blob.type);

    return blob;
  } catch (error) {
    console.log("fetchImageFromUri error:");
    console.log(error);
    throw new Error("fetchImageFromUri");
  }
};

function UploadImage({ type, pathToImage }: UploadImageProps) {
  const upload = async () => {
    console.log("***** Upload Image *****");
    if (pathToImage != null) {
      const fileToUpload = await fetchImageFromUri(pathToImage);
      console.log("***** back to Upload Image");

      const formData = new FormData();
      formData.append("file", "Image Upload");
      formData.append("image", fileToUpload);

      console.log("formData:", "done");

      // create the header options
      const options: RequestInit = {
        method: "POST",
        headers: {
          Accept: "multipart/form-data",
        },
        body: formData,
      };

      console.log("options:", "done");
      try {
        const res = await fetch(URL, options);
        const body = (await res.json()) as any;

        if (!res.ok) {
          throw new Error("Something went wrong");
        }

        console.log("Success section:", res);
        if (body.code > 200) {
          console.log("setErrMsg", body.msg);
        } else {
          console.log("setStatusMsg", body.msg);
        }
      } catch (err) {
        console.log("setErrMsg\nThere was an error in upload");
        console.log("upload catch error:");
        console.log(err);
      }
    }
  };

  if (pathToImage === null) {
    return <View />;
  }
  return <Button title={`Upload ${type} image`} onPress={upload} />;
}

export default UploadImage;