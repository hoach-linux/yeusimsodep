import { Typography } from "@mui/material";
import { Card, Col, Text } from "@nextui-org/react";
import { Link } from "react-router-dom";

export const Card3 = () => (
    <Link to="/admin/up_sim" style={{ minWidth: "100%" }}>
        <Card
            isPressable
            css={{ minWidth: "320px", minHeight: "320px", height: "340px" }}
        >
            <Card.Body
                css={{
                    position: "absolute",
                    zIndex: "1",
                    minHeight: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <Col>
                    <Typography variant="h4" color="white">
                        Up sim
                    </Typography>
                </Col>
            </Card.Body>
            <Card.Image
                src="https://cdn.dribbble.com/users/293796/screenshots/10479688/db-space-animation.gif"
                objectFit="cover"
                width="100%"
                height={340}
                alt="Card image background"
            />
        </Card>
    </Link>
);
