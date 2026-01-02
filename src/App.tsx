import UserProfileEditor from "./components/UserProfileEditor";
import UserProfileView from "./components/UserProfileView";
import UserRegistration from "./components/UserRegistration";
import Home from "./components/Home";
import FormExample from "./components/FormExample";
import { useApp } from "./contexts/AppContext";
import "./App.css";

function App() {
  const {
    state,
    handleEdit,
    handleSave,
    handleCancel,
    handleRegister,
    handleGoToRegister,
  } = useApp();

  return (
    <div>
      {/* <Home /> */}
      {/* <FormExample /> */}
      {state.currentView === "view" ? (
        <UserProfileView
          data={state.userData}
          onEdit={handleEdit}
          onRegister={handleGoToRegister}
        />
      ) : state.currentView === "edit" ? (
        <UserProfileEditor
          data={state.userData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <UserRegistration onRegister={handleRegister} onCancel={handleCancel} />
      )}
    </div>
  );
}

export default App;
