import { useEffect, useState } from "react";
import { Text } from "react-native";

function ShowTestText() {
  const [message, setMessage] = useState("");

  const getText = async () => {
    try {
      const response = await fetch("http//:192.168.1.11:8000/");
      const data = await response.json();

      if (data.success) {
        setMessage("Success");
      } else {
        setMessage("Failed");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getText();
  }, []);

  return <Text>{message}</Text>;
}

export default ShowTestText;
