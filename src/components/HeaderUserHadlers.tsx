import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";
import { AppState } from "../redux/store";
import useAppDispatch from "../hooks/useDispatch";
import countAmountOfItemsByProperty from "../selectors/countAmountOfItemsByProperty";
import { logoutUser } from "../redux/slices/userSlice";

const HeaderUserHadlers = () => {
  const settings = ["Profile", "Logout"];
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const currentUser = useAppSelector((state) => state.usersReducer.currentUser);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    dispatch(logoutUser());
    navigate("/");
  };

  const handleCloseUserMenu = (key: string) => {
    switch (key) {
      case "Profile":
        navigate("/profile");
        break;
      case "Logout":
        logOut();
        break;
      default:
        break;
    }
    setAnchorElUser(null);
  };

  const cart = useAppSelector((state: AppState) => state.cartReducer);
  const dispatch = useAppDispatch();

  const productsInCartAmount = countAmountOfItemsByProperty(cart, "quantity");

  return (
    <>
      {!currentUser && (
        <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
          <Button
            sx={{ my: 2, color: "inherit", display: "block" }}
            component={Link}
            to={`/login`}
          >
            Login
          </Button>
          <Button
            sx={{ my: 2, color: "inherit", display: "block" }}
            component={Link}
            to={`/register`}
          >
            Register
          </Button>
        </Box>
      )}

      {!!currentUser && (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Users image" src={currentUser.avatar} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => handleCloseUserMenu(setting)}
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>

          {currentUser.role === "CUSTOMER" && (
            <IconButton
              color="inherit"
              component={Link}
              to="/cart"
              aria-label="cart"
            >
              <Badge
                badgeContent={productsInCartAmount}
                color="secondary"
                max={99}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          )}
        </Box>
      )}
    </>
  );
};

export default HeaderUserHadlers;
