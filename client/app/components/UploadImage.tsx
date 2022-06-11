import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import {
  FileSystemUploadOptions,
  FileSystemUploadType,
} from "expo-file-system";
interface UploadImageProps {
  type: "picked" | "taken";
  pathToImage: string | null;
}

const HOST = "https://file-picker-test.herokuapp.com";
const URL = HOST + "/api/add-image-by-fields" + 1;
// const URL = HOST + "/api/add-image-no-mw";

function UploadImage({ type, pathToImage }: UploadImageProps) {
  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const upload = async () => {
    console.log("\n***** Upload Image *****");
    setMessage("");
    setErrMessage("");

    if (pathToImage != null) {
      let options: FileSystemUploadOptions | undefined;

      options = await uploadAsyncOptions();
      await uploadAsyncFetch(pathToImage, options);
    }
  };

  const uploadAsyncOptions = async () => {
    let otherFields: Record<string, string> = {};

    const errorObj = {
      hasError: "true",
      errorNumber: "300",
      errorMessage: "test error message",
    };

    otherFields["action"] = "Image Upload";
    otherFields = { ...otherFields, ...errorObj };

    console.log(JSON.stringify(otherFields, null, 2));

    const options: FileSystemUploadOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "image/jpeg, image/png",
      },
      httpMethod: "POST",
      uploadType: FileSystemUploadType.MULTIPART,
      fieldName: "image",
      parameters: otherFields,
    };
    return options;
  };

  // https://www.tderflinger.com/en/react-native-audio-recording-flask
  const uploadAsyncFetch = async (
    uri: string,
    options: FileSystemUploadOptions
  ) => {
    console.log("***** uploadAsyncFetch section *****");
    try {
      const response = await FileSystem.uploadAsync(URL, uri, options);
      console.log(`status: ${response.status}
headers:
 ${JSON.stringify(response.headers, null, 2)}
 body:
 ${JSON.stringify(response.body.toString(), null, 2)}`);
      //  ${response.body.toString()}`);

      if (response.status >= 200 && response.status < 300) {
        const body = JSON.parse(response.body);
        setMessage("uploadAsyncFetch: " + body.msg);
      } else {
        // const message = response.body.querySelector("pre");
        console.log("\nmessage:", message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // component
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
