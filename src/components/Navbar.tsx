import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { Link, useSearchParams } from "react-router-dom";
import { MoonIcon } from "./icons/MoonIcon";
import { useState } from "react";
import useStore from "../store/useStore";
import { AppBar, Box, Button, Collapse, Container, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem, SwipeableDrawer, Toolbar, Typography, styled, useTheme } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Close, ExpandLess, ExpandMore, PermPhoneMsg } from "@mui/icons-material";
import { SunIcon } from "./icons/SunIcon";

const NavbarComponent = () => {
    const [isOpenSimPrice, setIsOpenSimPrice] = useState(false)
    const [isOpenSimVip, setIsOpenSimVip] = useState(false)
    const [isOpenSimProvider, setIsOpenSimProvider] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams({});
    const [anchorElChat, setAnchorElChat] = useState<HTMLElement | null>(null)
    const setPageTitle = useStore((state: any) => state.setPageTitle);
    const collapseItems = [
        { name: "Trang Chủ", link: "/" },
        { name: "Thuê Sim VIP", link: "/thuesimvip" },
        { name: "Định Giá Sim 4.0", link: "https://dinhgiasim.com.vn/" },
        {
            name: "Phong Thủy",
            link: "https://xemvanmenh.net/xem-boi-so-dien-thoai.html",
        },
    ];
    const [simPrice, setSimPrice] = useState([
        "Sim dưới 500k",
        "Sim 1 - 3 triệu",
        "Sim 3 - 5 triệu",
        "Sim 5 - 10 triệu",
        "Sim 10 - 20 triệu",
        "Sim 20 - 50 triệu",
        "Sim 50 - 100 triệu",
        "Sim 100 - 200 triệu",
        "Sim 200 - 500 triệu",
        "Sim trên 500 triệu",
    ]);
    const [simDangCap, setSimDangCap] = useState([
        "Sim Lục Quý",
        "Sim Ngũ Quý",
        "Sim Tứ Quý",
    ]);
    const [simProvider, setSimProvider] = useState([
        "Sim Viettel",
        "Sim Mobifone",
        "Sim Vinaphone",
        "Sim Gmobile",
        "Sim Vietnamobile",
    ]);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const lightMode = useStore((state: any) => state.lightMode)
    const darkMode = useStore((state: any) => state.darkMode)
    const pageUrl = window.location.pathname;
    const theme = useTheme();
    const resetPage = useStore((state: any) => state.resetPage);
    const chatMenuList = [
        { name: "Facebook", link: "https://www.facebook.com/nghimobifone" },
        { name: "Zalo", link: "https://zalo.me/+84906266966" },
        { name: "Tổng đài", link: "tel:+84906266966" }
    ]

    const openSimPrice = (): void => setIsOpenSimPrice(!isOpenSimPrice)
    const openSimVip = (): void => setIsOpenSimVip(!isOpenSimVip)
    const openSimProvider = (): void => setIsOpenSimProvider(!isOpenSimProvider)
    const closeChatMenu = (): void => setAnchorElChat(null)
    const openDrawer = (): void => setIsOpenDrawer(true)

    function changeTheme() {
        let theme = window.localStorage.getItem("data-theme")

        if (theme === "light") {
            window.localStorage.setItem("data-theme", "dark")

            darkMode()
        } else {
            window.localStorage.setItem("data-theme", "light")

            lightMode()
        }
    }

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));

    return (
        <AppBar position="sticky" color="primary" sx={{ background: "#000" }} >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}
                    >
                        yeusimsodep.com
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={openDrawer}
                        >
                            <MenuIcon />
                        </IconButton>
                        <SwipeableDrawer
                            anchor="bottom"
                            open={isOpenDrawer}
                            onClose={() => setIsOpenDrawer(false)}
                            onOpen={() => setIsOpenDrawer(true)}
                        >
                            <DrawerHeader>
                                <IconButton onClick={() => setIsOpenDrawer(false)}>
                                    <Close />
                                </IconButton>
                            </DrawerHeader>
                            <Divider />
                            <List
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                            >
                                {collapseItems.map((item) => (
                                    <div key={item.link}>
                                        <Link to={item.link}
                                        >
                                            <ListItem disablePadding>
                                                <ListItemButton
                                                    onClick={() => setPageTitle('SIM Số Đẹp - Kho SIM đẹp giá rẻ từ【299k】- simdep10so.vn')}
                                                >
                                                    <ListItemText primary={item.name} />
                                                </ListItemButton>
                                            </ListItem>
                                        </Link>
                                        <Divider />
                                    </div>
                                ))}
                                {pageUrl === "/" && (
                                    <>
                                        <ListItemButton onClick={openSimPrice}>
                                            <ListItemText primary="Sim Theo Giá" />
                                            {isOpenSimPrice ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                        <Collapse in={isOpenSimPrice} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                {simPrice.map((item, index) => (
                                                    <ListItemButton sx={{ pl: 4 }} onClick={() => {
                                                        resetPage();
                                                        setSearchParams({ query: item });
                                                        setIsOpenDrawer(false)
                                                        setPageTitle(item)
                                                    }}
                                                        key={item}
                                                    >
                                                        <ListItemText primary={item} />
                                                    </ListItemButton>
                                                ))}
                                                <Divider />
                                            </List>
                                        </Collapse>
                                        <ListItemButton onClick={openSimVip}>
                                            <ListItemText primary="Sim Đẳng Cấp" />
                                            {isOpenSimVip ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                        <Collapse in={isOpenSimVip} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                {simDangCap.map((item, index) => (

                                                    <ListItemButton sx={{ pl: 4 }} onClick={() => {
                                                        resetPage();
                                                        setSearchParams({ query: item });
                                                        setIsOpenDrawer(false)
                                                        setPageTitle(item)
                                                    }}
                                                        key={item}
                                                    >
                                                        <ListItemText primary={item} />
                                                    </ListItemButton>
                                                ))}
                                                <Divider />
                                            </List>
                                        </Collapse>
                                        <ListItemButton onClick={openSimProvider}>
                                            <ListItemText primary="Sim Theo Mạng" />
                                            {isOpenSimProvider ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                        <Collapse in={isOpenSimProvider} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                {simProvider.map((item, index) => (

                                                    <ListItemButton sx={{ pl: 4 }} onClick={() => {
                                                        resetPage();
                                                        setSearchParams({ query: item });
                                                        setIsOpenDrawer(false)
                                                        setPageTitle(item)
                                                    }}
                                                        key={item}
                                                    >
                                                        <ListItemText primary={item} />
                                                    </ListItemButton>
                                                ))}
                                                <Divider />
                                            </List>
                                        </Collapse>
                                        <ListItemButton onClick={changeTheme}>
                                            <ListItemText primary={theme.palette.mode === "dark" ? "Chế độ sáng" : "Chế độ tối"} />
                                            {theme.palette.mode === "dark" ? <SunIcon /> : <MoonIcon />}
                                        </ListItemButton>
                                    </>
                                )}
                            </List >
                        </SwipeableDrawer>
                    </Box >
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        yeusimsodep.com
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {collapseItems.map((page) => (
                            <Link
                                key={page.link}
                                to={page.link}
                                onClick={() => setPageTitle('SIM Số Đẹp - Kho SIM đẹp giá rẻ từ【299k】- simdep10so.vn')}
                            >
                                <Button
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.name}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton sx={{
                            ml: 1,
                            display: { xs: 'none', md: 'inline-flex' },
                        }} onClick={changeTheme} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                        <IconButton onClick={(event) => setAnchorElChat(event.currentTarget)} color="inherit">
                            <PermPhoneMsg />
                        </IconButton>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElChat}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElChat)}
                            onClose={closeChatMenu}
                        >
                            {chatMenuList.map((item) => (
                                <Link to={item.link} key={item.link}>
                                    <MenuItem>
                                        <ListItemText>{item.name}</ListItemText>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar >
            </Container >
        </AppBar >
    );
};

export default NavbarComponent;
