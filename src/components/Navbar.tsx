import React, { useState, MouseEvent, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import jwt_decode from 'jwt-decode';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
} from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import colors from '../styles/globals';
import AvatarComponent from '../assets/custom-components/AvatarComponent';
import { GetOneUser } from '../schemaTypes';
import { GET_ONE_USER } from '../queries/UserQueries';

import '../styles/Navbar.css';
import Logo from '../images/logo_semi.png';

interface IDecodedToken {
  userId: string;
  iat: number;
  exp: number;
}

export default function PrimarySearchAppBar(): JSX.Element {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<GetOneUser | unknown>();
  const location = useLocation();

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

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken: '' | IDecodedToken | null = token && jwt_decode(token);
    setUserId(decodedToken && decodedToken.userId);
  }, [location]);

  const { data } = useQuery<GetOneUser>(GET_ONE_USER, {
    variables: { userId },
  });
  const userFirstname = data?.getOneUser.firstname || '';
  const userLastname = data?.getOneUser.lastname || '';
  const userPosition = data?.getOneUser.position || '';

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
        position="static" // @FREDY must be "fixed" to have a sticky header
        sx={{
          bgcolor: 'white',
        }}
      >
        <Toolbar>
          <Box onClick={() => navigate('/')}>
            <img className="logoNav" alt="logo_semi" src={Logo} />
          </Box>

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
            Hello {userLastname || ''}
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
              sx={{ color: colors.primary, marginRight: '5vh' }}
            >
              <AvatarComponent
                position={userPosition || ''}
                lastname={userLastname || ''}
                firstname={userFirstname || ''}
                avatarSize={50}
              />
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
