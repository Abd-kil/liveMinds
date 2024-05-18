import { useEffect, useState } from 'react';
import { Box, Collapse, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import axios from '../api/axios';
import { useAuth } from '../context/AuthProvider';

const Sidebar = () => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [darkMode, setDarkMode] = useState(sessionStorage['darkMode']?sessionStorage['darkMode']:false)
    const { auth, setAuth } = useAuth();


    const toggleDarkMode = ()=>{
        setDarkMode(!darkMode);
        sessionStorage.setItem('darkMode',darkMode)
    }
    useEffect(()=>{
        const root = document.documentElement;
        root.style.setProperty('--background-color',darkMode?'#000':'#fff');
        root.style.setProperty('--primary-color',darkMode?'#e0f7fa':'#2693a6');
        root.style.setProperty('--secondary-color',darkMode?'#2693a6':'#e0f7fa');
        root.style.setProperty('--font-color',darkMode?'#fff':'#000');
    },[darkMode])

    const logout = async () => {
        try {
            const response = await axios.post('logout');
            console.log(response)
            setAuth({
                isLoggedIn: false,
                user: {
                    name: '',
                    userName: '',
                    email: '',
                    role: ''
                }
            })
        }
        catch (error) {
            console.error('logout failed');
        }
    }

    const handleListItemClick = (index: number) => {
        setSelectedIndex(index);
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 60,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 60,
                    boxSizing: 'border-box',
                    backgroundColor: 'var(--secondary-color)',
                    borderRight: 'none',
                    overflowY: 'visible',
                },
            }}
            >
            <List>
                {[
                    { text: 'Home', icon: <HomeIcon />, action: null },
                    { text: 'Users', icon: <PeopleIcon />, action: null },
                    { text: 'Stats', icon: <BarChartIcon />, action: null },
                    { text: 'Messages', icon: <MailIcon />, action: null },
                    { text: 'Dark mode', icon: <DarkModeIcon />, action: toggleDarkMode },
                    { text: 'Logout', icon: <LogoutIcon />, action: logout },
                ].map((item, index) => (
                    <Collapse
                    key={item.text}
                    in={hoveredIndex === index}
                    collapsedSize={'80%'}
                    orientation="horizontal"
                    sx={{
                            height:65,
                            paddingRight: '5px'
                        }}
                        easing="1s"
                    >
                        <Box
                            sx={{
                                background: 'var(--secondary-color)',
                                padding: '5px 5px 5px 0',
                                width: 'fit-content',
                                marginTop:'10px',
                                borderTopRightRadius: '10px',
                                borderBottomRightRadius: '10px',
                            }}
                        >
                            <ListItem
                                button
                                selected={selectedIndex === index}
                                onClick={
                                    () => {
                                        item.action && item.action();
                                        handleListItemClick(index)
                                    }
                                }
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                sx={{
                                    color: 'var(--background-color)',
                                    backgroundColor: selectedIndex === index ? 'var(--primary-color)' : 'var(--secondary-color)',
                                    height: '40px',
                                    gap: '10px',
                                    '&:hover': {
                                        backgroundColor: 'var(--primary-color)',
                                        borderTopRightRadius: '5px',
                                        borderBottomRightRadius: '5px',
                                        '&::before': {
                                            'content': "''",
                                            position: 'absolute',
                                            top: '-15px',
                                            left: 0,
                                            background: 'radial-gradient(at 50% 50%, transparent 15px, var(--primary-color) 16px)',
                                            backgroundRepeat:'no-repeat',
                                            backgroundSize:'60px 60px',
                                            backgroundPositionX:'-15px',
                                            backgroundPositionY:'-30px',
                                            width: '15px',
                                            height: '15px',
                                        },
                                        '&::after': {
                                            'content': "''",
                                            position: 'absolute',
                                            top: '40px',
                                            left: 0,
                                            background: 'radial-gradient(at 50% 50%, transparent 15px, var(--primary-color) 16px)',
                                            backgroundRepeat:'no-repeat',
                                            backgroundSize:'60px 60px',
                                            backgroundPositionX:'-15px',
                                            backgroundPositionY:'-15px',
                                            width: '15px',
                                            height: '15px',
                                        },
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: 'var(--primary-color)',
                                        borderTopRightRadius: '15px',
                                        borderBottomRightRadius: '15px',
                                        marginRight:'-3px',
                                            '&::before': {
                                                'content': "''",
                                                position: 'absolute',
                                                top: '-15px',
                                                left: 0,
                                                background: 'radial-gradient(at 50% 50%, transparent 15px, var(--primary-color) 16px)',
                                                backgroundRepeat:'no-repeat',
                                                backgroundSize:'60px 60px',
                                                backgroundPositionX:'-15px',
                                                backgroundPositionY:'-30px',
                                                width: '15px',
                                                height: '15px',
                                            },
                                            '&::after': {
                                                'content': "''",
                                                position: 'absolute',
                                                top: '40px',
                                                left: 0,
                                                background: 'radial-gradient(at 50% 50%, transparent 15px, var(--primary-color) 16px)',
                                                backgroundRepeat:'no-repeat',
                                                backgroundSize:'60px 60px',
                                                backgroundPositionX:'-15px',
                                                backgroundPositionY:'-15px',
                                                width: '15px',
                                                height: '15px',
                                            },
                                        '&:hover': {
                                            backgroundColor: 'var(--primary-color)',
                                            borderTopRightRadius: '5px',
                                            borderBottomRightRadius: '5px',
                                        },
                                    },


                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        color: selectedIndex === index || hoveredIndex === index ? 'var(--background-color)' : 'var(--font-color)',
                                        minWidth: '0',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    sx={{
                                        display: hoveredIndex !== index ? 'none' : 'block',
                                    }}
                                />
                            </ListItem>
                        </Box>
                    </Collapse>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
