import { Typography } from "@mui/material";
import { Card, Col } from "@nextui-org/react";
import { Link } from "react-router-dom";

export const Card1 = () => (
  <Link to="/admin/order" style={{ minWidth: "100%" }}>
    <Card
      isPressable
      css={{ minWidth: "320px", minHeight: "320px", bg: "#000" }}
    >
      <Card.Body
        css={{
          position: "absolute",
          zIndex: 1,
          display: "flex",
          minHeight: "100%",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Col>
          <Typography variant="h4" color="white">
            Xem đơn đặt hàng
          </Typography>
        </Col>
      </Card.Body>
      <Card.Image
        src="https://cdn.dribbble.com/users/156849/screenshots/6993098/32.gif"
        objectFit="cover"
        width="100%"
        height={340}
        alt="Card image background"
      />
    </Card>
  </Link>
);
