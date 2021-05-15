import './App.css';
import Header from "./Header";
import Sidebar from "./Sidebar";
import SidebarRow from './SidebarRow';
import Feed from "./Feed";


function App() {
  const user = "randy";
  return (
    <div className="app">
      {!user ? (
        <h1>Login</h1>
      ) : (
        <>
          <Header />
          <div className="app__body">
            <Sidebar />
            <Feed />

          </div>
        </>
      )}
    </div>

  );
}

export default App;
