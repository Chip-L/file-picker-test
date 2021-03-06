import React, { SetStateAction } from "react";
import { Button } from "react-native";
import * as ImagePicker from "expo-image-picker";

interface ShowCameraProps {
  setTakenImagePath(value: SetStateAction<string | null>): void;
}

function ShowCamera({ setTakenImagePath }: ShowCameraProps) {
  const takePicture = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1, // this is max quality
    });

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setTakenImagePath(result.uri);
      console.log(result.uri);
    }
  };

  return <Button title="Take an image with the camera" onPress={takePicture} />;
}

export default ShowCamera;
