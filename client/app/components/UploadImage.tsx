import React, { useState } from "react";
import { ActivityIndicator, Button, Text, View } from "react-native";
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
const URL = HOST + "/api/add-image-by-fields";

function UploadImage({ type, pathToImage }: UploadImageProps) {
  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    console.log("\n***** Upload Image *****");
    setMessage("");
    setErrMessage("");
    setLoading(true);

    if (pathToImage) {
      console.log("***** get other fields section *****");
      const dataToSend: Record<string, string> = {};
      dataToSend["action"] = "Image Upload";

      console.log("***** Options section *****");
      const options: FileSystemUploadOptions = {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "image/jpeg, image/png",
        },
        httpMethod: "POST",
        uploadType: FileSystemUploadType.MULTIPART,
        fieldName: "image",
        parameters: dataToSend,
      };

      console.log("***** 'Fetch' section *****");
      try {
        const response = await FileSystem.uploadAsync(
          URL,
          pathToImage,
          options
        );

        console.log(`status: ${response.status}
        header:
        ${JSON.stringify(response.headers, null, 2)}
        body:
        ${response.body}`);

        setLoading(false);
        if (response.status >= 200 && response.status < 300) {
          const body = JSON.parse(response.body);
          setMessage(body.msg);
        } else {
          setErrMessage(`${response.status} Error: ${response.body}`);
        }
      } catch (err: any) {
        console.error(err);
        setErrMessage(err.message);
      }
    }
  };

  // component
  if (pathToImage === null) {
    return <View />;
  }
  if (loading) {
    return <ActivityIndicator />;
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
