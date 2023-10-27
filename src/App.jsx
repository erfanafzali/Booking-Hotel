import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";

function App() {
  return (
    <div className="container mx-auto w-full">
      <Toaster />
      <Header />
      <LocationList />
    </div>
  );
}

export default App;
