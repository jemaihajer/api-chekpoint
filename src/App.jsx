import "./App.css";
import UserList from "./UserList.jsx";

function App() {
  return (
    <main className="app-shell">
      <header className="hero">
        <p className="eyebrow">API Checkpoint</p>
        <h1>Marketplace Directory</h1>
        <p className="lede">
          Explore the people behind the storefront. Data comes straight from the
          Fakestore API and updates the moment the component mounts.
        </p>
      </header>
      <UserList />
    </main>
  );
}

export default App;
