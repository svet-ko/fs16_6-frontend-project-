import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useTheme } from "../ThemeProvider";
import MaterialUISwitchStyled from "../styles/components/MaterialUISwitchStyled";

const DarkModeToggle = () => {
  const { themeMode, toggleDarkMode } = useTheme();

  const handleChange = () => {
    toggleDarkMode();
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <MaterialUISwitchStyled
            sx={{ m: 1 }}
            checked={themeMode === "dark"}
            onChange={handleChange}
          />
        }
        label={""}
      />
    </FormGroup>
  );
};

export default DarkModeToggle;