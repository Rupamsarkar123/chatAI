import Chat from "./Chat";

function App() {
  return (
    <div style={styles.appContainer}>
      <Chat />
    </div>
  );
}

const styles = {
  appContainer: {
    backgroundColor: "#f3f3f3",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default App;
