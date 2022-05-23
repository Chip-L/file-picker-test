import { SetStateAction } from "react";
import { Button } from "react-native";
import * as ImagePicker from "expo-image-picker";

interface showImagePickerProps {
  setPickedImagePath(value: SetStateAction<string | null>): void;
}

function ShowImagePicker({ setPickedImagePath }: showImagePickerProps) {
  const pickImage = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  };

  return <Button title="Pick an image from camera roll" onPress={pickImage} />;
}

export default ShowImagePicker;
