import { Button, Card, Input, Link, Loading, Text } from "@nextui-org/react";
import supabase from "../../supabase";
import { Password } from "../../components/icons/Password";
import { Mail } from "../../components/icons/Mail";
import { useEffect, useState } from "react";
import { useCheckingRegister } from "../../hooks/useCheckingRegister";
import { motion } from "framer-motion";

function Login() {
    const [userData, setUserData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage]: [
        errorMessage: any,
        setErrorMessage: any
    ] = useState(null);
    const [checkRegister, checkNotRegister] = useCheckingRegister("/admin");
    const [showLinkToGmail, setShowLinkToGmail] = useState(false);
    const [signInWithOtp, setSignInWithOtp] = useState(true);

    useEffect(() => {
        checkNotRegister();
    }, []);

    async function signInWithEmail() {
        setLoading(true);

        const { data, error } = await supabase.auth.signInWithOtp({
            email: userData.email,
            options: {
                shouldCreateUser: false,
            },
        });

        if (error) {
            setErrorMessage(error?.message);
            setShowLinkToGmail(false);
        } else {
            setShowLinkToGmail(true);
        }

        setLoading(false);
    }
    async function signInWithPassword() {
        setLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({
            email: userData.email,
            password: userData.password
        });

        if (error) {
            setErrorMessage(error?.message);
        } else {
            checkRegister()
        }

        setLoading(false);
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            exit={{ opacity: 0 }}
            style={{
                minHeight: "80vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Card variant="bordered" css={{ maxWidth: "550px" }}>
                <Card.Body>
                    <form>
                        <Input
                            clearable
                            bordered
                            fullWidth
                            type="email"
                            value={userData.email}
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    email: e.target.value,
                                })
                            }
                            color="default"
                            size="lg"
                            label="Email"
                            placeholder="example@xyz.com"
                            contentLeft={<Mail fill="currentColor" />}
                            css={{ mb: "20px" }}
                        />
                        {!signInWithOtp && <Input.Password
                            clearable
                            bordered
                            fullWidth
                            value={userData.password}
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    password: e.target.value,
                                })
                            }
                            color="default"
                            size="lg"
                            label="Mật khẩu"
                            placeholder="12345678"
                            contentLeft={<Password fill="currentColor" />}
                            css={{ mb: "20px" }}
                        />}
                        {showLinkToGmail && (
                            <Link
                                href="https://mail.google.com/"
                                underline
                                block
                                isExternal
                            >
                                Vui lòng kiểm tra email của bạn
                            </Link>
                        )}
                        {errorMessage !== null && !showLinkToGmail && (
                            <Text color="error">{errorMessage}</Text>
                        )}
                        {signInWithOtp ? (
                            <Button
                                size="lg"
                                onClick={signInWithEmail}
                                css={{ minWidth: "100%" }}
                            >
                                {loading ? (
                                    <Loading size="sm" color="currentColor" />
                                ) : (
                                    <>Đăng nhập</>
                                )}
                            </Button>
                        ) : (
                            <Button
                                size="lg"
                                onClick={signInWithPassword}
                                css={{ minWidth: "100%" }}
                            >
                                {loading ? (
                                    <Loading size="sm" color="currentColor" />
                                ) : (
                                    <>Đăng nhập</>
                                )}
                            </Button>
                        )}
                        <Link
                            css={{ minWidth: "100%", mt: "5px", textDecoration: "underline" }}
                            onClick={() => setSignInWithOtp(!signInWithOtp)}
                        >
                            {signInWithOtp ? (
                                <>Đăng nhập bằng mật khẩu</>
                            ) : (
                                <>Đăng nhập bằng email</>
                            )}
                        </Link>
                    </form>
                </Card.Body>
            </Card>
        </motion.div>
    );
}

export default Login;
