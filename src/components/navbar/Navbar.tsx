import { useState, useContext, ReactNode, useEffect } from 'react';
import { Box, AppBar, IconButton, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, CssBaseline, colors } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CloseIcon from '@mui/icons-material/Close';
import axios from '../../api/axios';
import { useAuth } from '../../context/AuthProvider';
import './Navbar.css';
import { ColorModeContext } from '../../context/ThemeContext';


const Navbar = ({ children }: { children: ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const { setAuth } = useAuth();
    const colorMode = useContext(ColorModeContext);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const changeWidth = () => setScreenWidth(window.innerWidth)
        window.addEventListener('resize', changeWidth);
        return () => window.removeEventListener('resize', changeWidth);
    }, [])

    const logout = async () => {
        try {
            const response = await axios.post('logout');
            setAuth({
                isLoggedIn: false,
                user: {
                    name: '',
                    userName: '',
                    email: '',
                    role: ''
                }
            });
        } catch (error) {
            console.error('Logout failed');
        }
    };

    const menuList = [
        { text: 'Home', icon: <HomeIcon />, action: null },
        { text: 'Users', icon: <PeopleIcon />, action: null },
        { text: 'Stats', icon: <BarChartIcon />, action: null },
        { text: 'Messages', icon: <MailIcon />, action: null },
        { text: 'Dark mode', icon: <DarkModeIcon />, action: colorMode.toggleColorMode },
        { text: 'Logout', icon: <LogoutIcon />, action: logout },
    ];

    return (
        <Box sx={{
            paddingLeft: screenWidth > 600 ? '60px' : '',
        }}>
            <CssBaseline />
            <AppBar>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Navbar
                    </Typography>
                </Toolbar>
            </AppBar >
            <Toolbar />
            <Drawer
                variant="persistent"
                anchor='left'
                open
                classes={{
                    root: sidebarOpen ? "sidebar-drawer" : "sidebar-drawer-icons",
                    paper: sidebarOpen ? "sidebar-drawer" : "sidebar-drawer-icons",
                }}
            >
                <Toolbar />
                <List>
                    {menuList.map((item, index) => (
                        <ListItem
                            button
                            key={item.text}
                            onClick={() => {
                                item.action && item.action();
                            }}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            {children}
        </Box>
    );
};

export default Navbar;
