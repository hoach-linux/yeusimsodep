import {
  Card,
  Text,
  Button,
  Row,
  Collapse,
  Modal,
  Loading,
} from "@nextui-org/react";
import { useState } from "react";
import { useFetching } from "../../hooks/useFetching";
import supabase from "../../supabase";
import { useLocation } from "react-router-dom";

export default function Order({ order }: { order: any }) {
  const sim = order.sim;
  const [visible, setVisible] = useState(false);
  const [disable, setDisable] = useState(false);
  const [finishVisible, setFinishVisible] = useState(false);
  const [finishDisable, setFinishDisable] = useState(false);

  const openModal = () => setVisible(!visible);
  const closeModal = () => setVisible(false);
  const openFinishModal = () => setFinishVisible(!visible);
  const closeFinishModal = () => setFinishVisible(false);
  const location = useLocation()
  const [deleteOrder, deleteOrderLoading] = useFetching(async () => {
    setDisable(true);

    await supabase.from("orders").delete().eq("id", order.id);

    closeModal();
    setDisable(false);
  });
  const [finishOrder, finishOrderLoading] = useFetching(async () => {
    setFinishDisable(false)

    const { data, error } = await supabase
      .from("orders")
      .update({ status: "archived" })
      .eq("id", order.id);

    closeFinishModal()
    setFinishDisable(false)
  });

  return (
    <Card variant="bordered">
      <Card.Header>
        <Text b>{order.name}</Text>
      </Card.Header>
      <Card.Divider />
      <Card.Body css={{ py: "$10" }}>
        <Text>{order.address}</Text>
        <Text>{order.numberPhone}</Text>
        <Collapse
          title="Thông tin về sim"
          expanded
          bordered
          css={{ marginTop: "24px" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text>Số bán</Text>
            <Text>{sim.number}</Text>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text>Giá bán</Text>
            <Text>{sim.price.toLocaleString("vn")}₫</Text>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text>Nhà mạng</Text>
            <Text>{sim.provider}</Text>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text>Tình trạng sim</Text>
            <Text>{sim.state}</Text>
          </div>
        </Collapse>
      </Card.Body>
      <Card.Divider />
      {location.pathname === "/admin/order" && (
        <>
          <Card.Footer>
            <Row justify="space-between">
              <Button
                color="error"
                auto
                flat
                css={{ flex: "1", margin: "2px" }}
                onClick={openModal}
              >
                Xóa
              </Button>
              <Button auto css={{ flex: "1", margin: "2px" }} onClick={openFinishModal}>
                Hoàn thành
              </Button>
            </Row>
          </Card.Footer>
          <Modal
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeModal}
            blur
          >
            <Modal.Header>
              <Text id="modal-title" size={18}>
                Bạn có thực sự muốn xóa không?
              </Text>
            </Modal.Header>
            <Modal.Footer>
              <Button auto flat onClick={closeModal}>
                Không
              </Button>
              <Button
                disabled={disable}
                auto
                flat
                color="error"
                onClick={deleteOrder}
              >
                {deleteOrderLoading ? (
                  <Loading size="sm" color="currentColor" />
                ) : (
                  <p>Xóa</p>
                )}
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            aria-labelledby="modal-title"
            open={finishVisible}
            onClose={closeFinishModal}
            blur
          >
            <Modal.Header>
              <Text id="modal-title" size={18}>
                Bạn có thực sự muốn hoàn thành không?
              </Text>
            </Modal.Header>
            <Modal.Footer>
              <Button auto flat onClick={closeFinishModal}
                color="error"
              >
                Không
              </Button>
              <Button
                disabled={finishDisable}
                auto
                flat
                onClick={finishOrder}
              >
                {finishOrderLoading ? (
                  <Loading size="sm" color="currentColor" />
                ) : (
                  <p>Hoàn thành</p>
                )}
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Card>
  );
}
