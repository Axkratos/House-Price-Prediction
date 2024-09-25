import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import openicon from "/openicon.avif";

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const checkAuthentication = () => {
    const email = localStorage.getItem('email');
    setIsAuthenticated(!!email);
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const handleLogin = () => {
    // After successful login, set isAuthenticated to true
    const email = "user@example.com"; // This should come from your login logic
    localStorage.setItem('email', email);
    setIsAuthenticated(true);
    navigate('/'); // Redirect to home or the desired page
  };

  const handleLogout = () => {
    localStorage.removeItem('email');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'lightgray' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'black' }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black', // Logo color
              textDecoration: 'none',
            }}
          >
            Adevi
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu} component={Link} to="/">
                <Typography textAlign="center" sx={{ fontSize: '0.9rem' }}>Home</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu} component={Link} to="/about">
                <Typography textAlign="center" sx={{ fontSize: '0.9rem' }}>About Us</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu} component={Link} to="/contact">
                <Typography textAlign="center" sx={{ fontSize: '0.9rem' }}>Contact Us</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu} component={Link} to="/support">
                <Typography textAlign="center" sx={{ fontSize: '0.9rem' }}>Support</Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* Navbar Buttons */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button component={Link} to="/" onClick={handleCloseNavMenu} sx={{ my: 2, color: 'blue', display: 'block', fontSize: '0.9rem', marginRight: 2 }}>
              Home
            </Button>
            <Button component={Link} to="/about" onClick={handleCloseNavMenu} sx={{ my: 2, color: 'blue', display: 'block', fontSize: '0.9rem', marginRight: 2 }}>
              About Us
            </Button>
            <Button component={Link} to="/contact" onClick={handleCloseNavMenu} sx={{ my: 2, color: 'blue', display: 'block', fontSize: '0.9rem', marginRight: 2 }}>
              Contact Us
            </Button>
            <Button component={Link} to="/support" onClick={handleCloseNavMenu} sx={{ my: 2, color: 'blue', display: 'block', fontSize: '0.9rem', marginRight: 2 }}>
              Support
            </Button>
          </Box>

          {/* User Menu */}
          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User Avatar" src={openicon} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem component={Link} to="/history" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" sx={{ fontSize: '0.9rem' }}>History</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center" sx={{ fontSize: '0.9rem' }}>Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button component={Link} to="/signin" sx={{ color: 'blue', fontSize: '0.9rem' }}>Sign In</Button>
                <Button component={Link} to="/signup" sx={{ color: 'blue', fontSize: '0.9rem' }}>Sign Up</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
