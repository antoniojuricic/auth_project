import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/LoginButton";
import LogoutButton from "./LogoutButton";

export default function ButtonAppBar() {
  const { user, isAuthenticated } = useAuth0();
  return (
    <AppBar component="nav">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          Projekt Auth - Liga
        </Typography>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {isAuthenticated && (
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {user.nickname}
            </Typography>
          )}
          {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
