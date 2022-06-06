import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

interface ShowTestTextProps {
  type: "Get" | "Post";
}

function ShowTestText({ type }: ShowTestTextProps) {
  const [message, setMessage] = useState("");

  const getText = async () => {
    let url: string, options: RequestInit;

    if (type === "Get") {
      url = "https://file-picker-test.herokuapp.com/";
      options = {
        method: "GET",
      };
    } else {
      const curTime = new Date();
      const formData = new FormData();
      formData.append("date", curTime.toDateString());
      formData.append("time", curTime.toLocaleTimeString());

      url = "https://file-picker-test.herokuapp.com/post";
      options = {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
    }

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(type);
      console.log(data);

      if (data.success) {
        setMessage(data.success);
        console.log("Success");
      } else {
        setMessage("Failed");
        console.log("Failed");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("Network " + type + " test ...");
    getText();
  }, []);

  const getTitle = () => {
    return `Test ${type}`;
  };

  return (
    <View>
      <Button onPress={getText} title={getTitle()} />
      {message !== "" && <Text>{message}</Text>}
    </View>
  );
}

export default ShowTestText;
