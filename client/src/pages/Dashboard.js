import * as React from 'react';
import PropTypes from 'prop-types';
import { Link, Route, Routes } from 'react-router-dom';
import AllBlogs from './AllBlogs';
import BlogDetail from './BlogDetail';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import CreateBlog from './CreateBlog';
import DashboardContent from './DashboardContent';
import MyBlog from './MyBlog';
import MyProfile from './MyProfile';
import EditBlog from './EditBlog';
import EditProfile from './EditProfile';
import { toast } from 'react-toastify';
import AdminRoute from '../components/AdminRoute';
import AllUsers from './AllUsers';
import EditUser from './EditUser';
import background from '../assets/images/bgnav.jpg';

//MUI components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';

//icons
import MenuIcon from '@mui/icons-material/Menu';
import { MdDashboard } from "react-icons/md";
import { SiBlogger } from "react-icons/si";
import { IoIosCreate } from "react-icons/io";
import { FaMicroblog } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";


const drawerWidth = 180;

function ResponsiveDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const { setIsAuthenticated } = useAuth();
    const { userRole, setUserRole } = useAuth();
    const navigate = useNavigate();

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };
    const navstyle = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }
    const drawerStyle = {
        backgroundImage: `url(${background})`, // Path to your image
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100%', // Ensure the background image covers the entire drawer
    };


    const drawer = (
        <div style={drawerStyle}>
            <Toolbar />
            <Divider />
            <List >
                <ListItem disablePadding component={Link} to="/dashboard">
                    <ListItemButton>
                        <Box sx={{ color: 'black', display: 'flex', alignItems: 'center' }}>
                            <MdDashboard />
                        </Box>
                        <ListItemText sx={{ color: 'black', paddingInlineStart: "10px" }} primary="Dashboard" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding component={Link} to="/dashboard/blog/all">
                    <ListItemButton>
                        <Box sx={{ color: 'black', display: 'flex', alignItems: 'center' }}>
                            <SiBlogger />
                        </Box>
                        <ListItemText sx={{ color: 'black', paddingInlineStart: "10px" }} primary="All Blogs" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding component={Link} to="/dashboard/blog/create">
                    <ListItemButton >
                        <Box sx={{ color: 'black', display: 'flex', alignItems: 'center' }}>
                            <IoIosCreate />
                        </Box>
                        <ListItemText sx={{ color: 'black', paddingInlineStart: "10px" }} primary="Create New Blog" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding component={Link} to="/dashboard/myblog">
                    <ListItemButton>
                        <Box sx={{ color: 'black', display: 'flex', alignItems: 'center' }}>
                            <FaMicroblog />
                        </Box>
                        <ListItemText sx={{ color: 'black', paddingInlineStart: "10px" }} primary="My Blog" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding component={Link} to="/dashboard/myprofile">
                    <ListItemButton>
                        <Box sx={{ color: 'black', display: 'flex', alignItems: 'center' }}>
                            <CgProfile />
                        </Box>
                        <ListItemText sx={{ color: 'black', paddingInlineStart: "10px" }} primary="My Profile" />
                    </ListItemButton>
                </ListItem>
                {userRole === '1' && (
                    <ListItem disablePadding component={Link} to="/dashboard/allusers">
                        <ListItemButton>
                            <Box sx={{ color: 'black', display: 'flex', alignItems: 'center' }}>
                                <FaUsers />
                            </Box>
                            <ListItemText sx={{ color: 'black', paddingInlineStart: "10px" }} primary="All Users" />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
            <Divider />
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;


    const logout = () => {
        localStorage.clear();
        sessionStorage.removeItem('accessToken');
        setIsAuthenticated(false);
        setUserRole(null);
        toast.info('Log Out Successfully')
        navigate('/');
    }


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                style={navstyle}
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Mobile Menu Icon */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* App Name or Logo */}
                    <Box
                        sx={{
                            textDecoration: 'none',
                            color: 'black',
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            px: 2,
                            py: 1,
                            borderRadius: 1,
                            maxWidth: '180px',
                        }}
                        component={Link}
                        to={'/dashboard'}
                    >
                        My Blog App
                    </Box>

                    {/* Log Out Button */}
                    <Box>
                        <ListItemButton
                            onClick={logout}
                            sx={{
                                color: 'black',
                                fontWeight: 'bold',
                                maxWidth: '180px',
                                justifyContent: 'flex-end',
                            }}
                        >
                            Log Out
                        </ListItemButton>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* Mobile drawer */}
                <Drawer
                    style={drawerStyle}
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                {/* Permanent drawer */}
                <Drawer
                    style={drawerStyle}
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    mt: { xs: 7, sm: 0 },
                }}
            >
                <Toolbar />

                <Routes>
                    <Route path="/" element={<DashboardContent />} />
                    <Route path="blog/all" element={<AllBlogs />} />
                    <Route path="blog/create" element={<CreateBlog />} />
                    <Route path="myblog" element={<MyBlog />} />
                    <Route path="blog/detail/:id" element={<BlogDetail />} />
                    <Route path="blog/edit/:id" element={<EditBlog />} />
                    <Route path="myprofile" element={<MyProfile />} />
                    <Route path="editprofile/:id" element={<EditProfile />} />
                    <Route path="/allusers" element={
                        <AdminRoute>
                            <AllUsers />
                        </AdminRoute>
                    } />
                    <Route path="/edituser/:id" element={
                        <AdminRoute>
                            <EditUser />
                        </AdminRoute>
                    } />
                </Routes>
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    window: PropTypes.func,
};

export default ResponsiveDrawer;
