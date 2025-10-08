// test routes
import axios from "axios";

const testRoutes = async () => {
  try {
    const response = await axios.get("http://localhost:3000/");
    console.log("Response from /:", response.data);
  } catch (error) {
    console.error("Error testing / route:", error);
  }

  try {
    const response = await axios.get("http://localhost:3000/about");
    console.log("Response from /about:", response.data);
  } catch (error) {
    console.error("Error testing /about route:", error);
  }

  try {
    const response = await axios.get("http://localhost:3000/contact");
    console.log("Response from /contact:", response.data);
  } catch (error) {
    console.error("Error testing /contact route:", error);
  }
};

testRoutes();
