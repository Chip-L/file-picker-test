import { useEffect, useState } from "react";
import { Text } from "react-native";

function ShowTestText() {
  const [message, setMessage] = useState("");

  const getText = async () => {
    try {
      const response = await fetch("https://file-picker-test.herokuapp.com/");
      const data = await response.json();

      if (data.success) {
        setMessage("Success");
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
    console.log("Network test ...");
    getText();
  }, []);

  return <Text>{message}</Text>;
}

export default ShowTestText;
