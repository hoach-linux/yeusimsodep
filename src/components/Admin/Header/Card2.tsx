import { Typography } from "@mui/material";
import { Card, Col, Text } from "@nextui-org/react";
import { Link } from "react-router-dom";

export const Card2 = () => (
  <Link to="/admin/finished_order" style={{ minWidth: "100%" }}>
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
          <Typography variant="h4">
            Đơn đặt hàng đã hoàn thành
          </Typography>
        </Col>
      </Card.Body>
    </Card>
  </Link>
);
