import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import HeaderUserHadlers from "./HeaderUserHadlers";
import NavToolBar from "./NavToolBar";

function ResponsiveAppBar() {
  return (
    <AppBar position="relative">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavToolBar />
          <HeaderUserHadlers />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
