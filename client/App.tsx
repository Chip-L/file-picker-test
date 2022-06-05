import React, { useState } from "react";
import { Image, View } from "react-native";
import ShowCamera from "./app/components/ShowCamera";
import ShowImagePicker from "./app/components/ShowImagePicker";
import ShowTestText from "./app/components/ShowTestText";
import UploadImage from "./app/components/UploadImage";

export default function App() {
  const [pickedImagePath, setPickedImagePath] = useState<string | null>(null);
  const [takenImagePath, setTakenImagePath] = useState<string | null>(null);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ShowTestText type="Get" />
      <ShowTestText type="Post" />
      <ShowImagePicker setPickedImagePath={setPickedImagePath} />
      {pickedImagePath && (
        <Image
          source={{ uri: pickedImagePath }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <UploadImage type="picked" pathToImage={pickedImagePath} />
      <ShowCamera setTakenImagePath={setTakenImagePath} />
      {takenImagePath && (
        <Image
          source={{ uri: takenImagePath }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <UploadImage type="taken" pathToImage={takenImagePath} />
    </View>
  );
}
