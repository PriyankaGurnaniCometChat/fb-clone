import './App.css';
import Header from "./Header";
import Sidebar from "./Sidebar";
import SidebarRow from './SidebarRow';


function App() {
  return (
    <div className="app">

      <Header />
      <div className="app__body">
        <Sidebar />
        <Feed />

      </div>
      {/* {Widgets} */}

    </div>
  );
}

export default App;
