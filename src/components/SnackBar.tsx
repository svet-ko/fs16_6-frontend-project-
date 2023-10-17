import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface SnackBarCompletionProps {
  buttonText: string;
  message: string;
  buttonSize: "small" | "medium" | "large";
  handleButtonClick?: () => any;
  buttonClickParams?: any;
}

export default function SnackBarCompletion({
  buttonText,
  message,
  buttonSize,
  handleButtonClick,
}: SnackBarCompletionProps) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    if (!!handleButtonClick) {
      handleButtonClick();
    }
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Button
        variant="contained"
        aria-label="complete-purchase"
        size={buttonSize}
        sx={{ mb: "1em" }}
        onClick={handleClick}
      >
        {buttonText}
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  );
}
