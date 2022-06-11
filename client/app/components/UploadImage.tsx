import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
interface UploadImageProps {
  type: "picked" | "taken";
  pathToImage: string | null;
}

const HOST = "https://file-picker-test.herokuapp.com";
const URL = HOST + "/api/add-image-by-fields";
// const URL = HOST + "/api/add-image-no-mw";

const fetchImageFromUri = async (uri: string) => {
  console.log("***** Fetch Image From Uri *****");
  console.log("image uri:", uri);

  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    console.log(JSON.stringify(blob));
    console.log("Blob.prototype.size:", blob.size);
    console.log("Blob.prototype.type:", blob.type);

    return blob;
  } catch (error) {
    console.log("fetchImageFromUri error:", error);
    throw new Error("fetchImageFromUri");
  }
};

function UploadImage({ type, pathToImage }: UploadImageProps) {
  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const upload = async () => {
    console.log("\n***** Upload Image *****");
    setMessage("");
    setErrMessage("");

    if (pathToImage != null) {
      const fileToUpload = await fetchImageFromUri(pathToImage);
      console.log("***** back to Upload Image");

      const formData = new FormData();
      formData.append("action", "Image Upload");
      // formData.append("image", fileToUpload, "filename");

      // from: https://stackoverflow.com/questions/71198201/react-native-unable-to-upload-file-to-server-network-request-failed
      // most articles say this is the way to upload the file... Typescript give an error because it only wants type 'string | Blob'
      // let uriParts = pathToImage.split(".");
      // let fileType = uriParts[uriParts.length - 1];
      // formData.append("image", {
      //   uri: pathToImage,
      //   name: `photo.${fileType}`,
      //   type: `image/${fileType}`,
      // });

      console.log("formData:", JSON.stringify(formData));

      // create the header options
      const options: RequestInit = {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "image/jpeg, image/png",
        },
      };
      console.log("URL:", URL);
      console.log("options:", JSON.stringify(options));

      traditionalFetch(options);
    }

    async function traditionalFetch(options: RequestInit) {
      try {
        console.log("***** Fetch section *****");

        const res = await fetch(URL, options);
        console.log("fetch returned");
        const body = (await res.json()) as any;

        if (!res.ok) {
          throw new Error("Something went wrong");
        }

        console.log("***** Success section *****");
        if (body.code > 200) {
          console.log("setErrMsg", body.msg);
          setErrMessage(body.msg);
        } else {
          console.log("setStatusMsg", body.msg);
          setMessage(body.msg);
        }
      } catch (err: any) {
        console.log("***** Error section: *****");
        setErrMessage("There was an error in upload");
        console.log("upload catch error:", err.message);
      }
    }
  };

  if (pathToImage === null) {
    return <View />;
  }
  return (
    <>
      <Button title={`Upload ${type} image`} onPress={upload} />
      {message != "" && <Text>{message}</Text>}
      {errMessage != "" && <Text style={{ color: "red" }}>{errMessage}</Text>}
    </>
  );
}

export default UploadImage;
