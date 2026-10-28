import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import react from "react";
import Discover from "./pages/Discover";
import Watched from "./pages/Watched";
import WatchList from "./pages/WatchList";

function App() {
   return (

      <Router>

         <Routes>
            
            <Route path="/" element={<Discover/>} />
            <Route path="/watched" element={<Watched />} />
            <Route path="/watchlist" element={<WatchList />}/>

         </Routes>
      </Router>
      
   );
}

export default App