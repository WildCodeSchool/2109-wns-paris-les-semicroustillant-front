import React, { useState, MouseEvent, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import colors from '../styles/globals';
import LoginContext from '../context/LoginContext';

export default function PrimarySearchAppBar(): JSX.Element {
  const navigate = useNavigate();
  const user = useContext(LoginContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={logout}>Log out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem sx={{ color: colors.primary }} onClick={handleMenuClose}>
        Profile
      </MenuItem>
      <MenuItem sx={{ color: colors.primary }} onClick={logout}>
        Log out
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: 'white',
        }}
      >
        <Toolbar>
          <img
            className="logoNav"
            alt="logo_semi"
            src="https://zupimages.net/up/22/13/zx35.png"
          />

          <Box sx={{ flexGrow: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: 'none', sm: 'block' },
              color: colors.primary,
              marginRight: '1rem',
            }}
          >
            Hello {user.username}
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{ color: colors.primary }}
            >
              <AccountCircle />
            </IconButton>
            {renderMenu}
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{ color: colors.primary }}
            >
              <MoreIcon />
            </IconButton>
            {renderMobileMenu}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

/* 

 const [open, setState] = useState(false);

  const toggleDrawer = (opens: any) => (event: any) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState(opens);
  };

 <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{ color: colors.primary }}
            >
              <Drawer
                anchor="left" // from which side the drawer slides in
                variant="temporary" // if and how easily the drawer can be closed
                open={open} // if open is true, drawer is shown
                onClose={toggleDrawer(false)} // function that is called when the drawer should close
              >
                <Box>
                  <ul className="ul_nav">
                    <li className="li_nav">
                      <a className="link_nav" href="/all-users">
                        Gestion des utilisateurs
                      </a>
                    </li>
                    <li className="li_nav">
                      <a className="link_nav" href="/task-list">
                        Liste des taches
                      </a>
                    </li>
                    <li className="li_nav">
                      <a className="link_nav" href="/ticket">
                        Tickets
                      </a>
                    </li>
                    <li className="li_nav">
                      <a className="link_nav" href="/all-projects">
                        Projets
                      </a>
                    </li>
                  </ul>
                </Box>
              </Drawer>
              <AccountCircle />
            </IconButton>
          </Box>

         


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
})); */
