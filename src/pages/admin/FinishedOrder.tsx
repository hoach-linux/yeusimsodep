import OrderList from "../../components/Admin/OrderList";
import { Loading, Spacer } from "@nextui-org/react";
import { useState, useEffect } from "react";
import supabase from "../../supabase";
import { useFetching } from "../../hooks/useFetching";
import { useCheckingRegister } from "../../hooks/useCheckingRegister";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";

const AdminOrder = () => {
  const channel = supabase.channel("orders");
  const [orders, setOrders]: [orders: any, setOrders: any] = useState([]);
  const ordersStatus = "archived";
  const [ordersFetching, loading, error] = useFetching(async () => {
    let { data: data } = await supabase
      .from("orders")
      .select("*")
      .eq("status", ordersStatus);

    setOrders(data);
  });
  const [checkRegister] = useCheckingRegister("/admin/login");

  useEffect(() => {
    checkRegister();
    ordersFetching();
  }, []);

  channel
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "orders",
      },
      (data) => setOrders([data.new, ...orders])
    )
    .on(
      "postgres_changes",
      {
        event: "DELETE",
        schema: "public",
        table: "orders",
      },
      (data) =>
        setOrders(orders.filter((order: any) => order.id !== data.old.id))
    )
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "orders",
      },
      async () => {
        let { data: data } = await supabase
          .from("orders")
          .select("*")
          .eq("status", ordersStatus);
        setOrders(data);
      }
    )
    .subscribe();

  if (loading)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "10px 0" }}
      >
        <Spacer />
        <Loading size="lg" />
      </div>
    );
  if (!orders || !orders.length)
    return (
      <Typography variant="h3" sx={{ textAlign: "center", padding: "10px 0" }}>
        Chưa có đơn hoàn thành nào
      </Typography>
    );
  if (error) return <Typography variant="h3">{error}</Typography>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      exit={{ opacity: 0 }}
      style={{ padding: "10px 0" }}
    >
      <OrderList orders={orders} />
    </motion.div>
  );
};

export default AdminOrder;
