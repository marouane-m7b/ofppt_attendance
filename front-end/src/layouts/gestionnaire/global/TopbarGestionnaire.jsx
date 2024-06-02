import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { axiosClient } from "../../../config/Api/AxiosClient";
import { useAppContext } from "../../../config/context/ComponentContext";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { errorToast, successToast } from "../../../config/Toasts/toasts";

const TopbarGestionnaire = () => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const { navigateTo } = useAppContext();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      await axiosClient.post("validator/logout");
      localStorage.removeItem("ud");
      navigateTo("/");
      successToast("Vous avez été deconnecté avec succès");
    } catch (error) {
      console.error(error);
      errorToast("Une erreur est survenue");
    } finally {
      setLogoutLoading(false);
    }
  }


  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleLogout}>
          {logoutLoading ? <AutorenewIcon /> : <PersonOutlinedIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default TopbarGestionnaire;
