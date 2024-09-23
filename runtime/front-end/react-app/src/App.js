import logo from './logo.svg';
import './App.css';
import Display from "./components/Display.js";
import PrivateRoute from "./config/auth/privateRoute.js";


function App() {
  return (
    <div className="App">
      <PrivateRoute/>
      <Display appId="appId1"/>
    </div>
  );
}

export default App;
