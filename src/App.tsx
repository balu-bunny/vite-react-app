import OrgList from "./components/OrgList";
import OrgCreate from "./components/OrgCreate";

function App() {
  // create modal handled in OrgCreate component

  // OrgCreate component handles open/create

  return (
    <main>
      <h1>My orgs</h1>
      <OrgCreate />
      <OrgList />
      <div>
        🥳 App successfully hosted. Try creating a new org.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>

    </main>
  );
}

export default App;
