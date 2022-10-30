import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./components/Navbar";
import TableLeague from "./components/Table";
import Comments from "./components/Comments";
import Container from "@mui/material/Container";

const App = () => {
  const { isLoading, error } = useAuth0();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }
  return (
    <div className="App">
      <Navbar />
      <Container maxWidth="lg" style={{ marginTop: "5em" }}>
        <TableLeague />
        <Comments />
      </Container>
    </div>
  );
};

export default App;
