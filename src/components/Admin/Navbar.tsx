import { Navbar, Link as NextLink } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import { Home, Logout, Menu as MenuIcon } from "@mui/icons-material";
import supabase from "../../supabase";
import { useCheckingRegister } from "../../hooks/useCheckingRegister";
import { useState } from "react";
import { directusClient } from "../../directus";
import { authentication, logout, rest } from "@directus/sdk";

const NavbarComponent = () => {
    const registered = localStorage.getItem("sb-wzlfkkdcqditzrbxeioy-auth-token");
    const [isOpenMenu, setIsOpenMenu] = useState<null | HTMLElement>(null)
    let open = Boolean(isOpenMenu)
    const navigate = useNavigate()

    const closeMenu = () => setIsOpenMenu(null)
    const openMenu = (event: React.MouseEvent<HTMLElement>) => {
        setIsOpenMenu(event.currentTarget)
    }
    async function logOut() {
        const getDirectusClient = directusClient.with(authentication()).with(rest())
        const getDirectusToken = localStorage.getItem('directus_token')

        const { error } = await supabase.auth.signOut()

        if (getDirectusToken !== null) {
            const getRefreshToken: string = JSON.parse(getDirectusToken)?.refresh_token

            const result = await getDirectusClient.request(logout(getRefreshToken));

            localStorage.removeItem('directus_token')
        }

        if (error) {
            console.log(error)
        }

        closeMenu()
        navigate('/admin/login')
    }

    return (
        <Navbar variant="sticky">
            <Navbar.Brand>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1 }}
                >
                    YEUSIMSODEP.COM
                </Typography>
            </Navbar.Brand>
            {registered &&
                <Navbar.Content enableCursorHighlight hideIn="sm" variant="default">
                    <Link to="/admin">
                        <Button startIcon={<Home />}>
                            Trang chủ
                        </Button>
                    </Link>
                </Navbar.Content>
            }
            {registered &&
                <>
                    <Navbar.Content>
                        <Button startIcon={<Logout />} color="error" onClick={logOut} sx={{ display: { xs: 'none', md: 'inline-flex' } }}>
                            Đăng xuất
                        </Button>
                        <IconButton
                            onClick={openMenu}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Navbar.Content>
                    <Menu
                        anchorEl={isOpenMenu}
                        id="account-menu"
                        open={open}
                        onClose={closeMenu}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                minWidth: "200px",
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={() => {
                            closeMenu()
                            navigate("/admin")
                        }}>
                            <ListItemIcon>
                                <Home />
                            </ListItemIcon>
                            Trang chủ
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={logOut}>
                            <ListItemIcon>
                                <Logout />
                            </ListItemIcon>
                            Đăng xuất
                        </MenuItem>
                    </Menu>
                </>}
        </Navbar>
    );
};

export default NavbarComponent;
