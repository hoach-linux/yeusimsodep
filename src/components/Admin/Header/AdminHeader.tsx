import { Card1 } from "./Card1";
import { Card2 } from "./Card2";
import { Grid } from "@nextui-org/react";

function AdminHeader() {
  return (
    <div>
      <Grid.Container gap={2} justify="center" css={{ marginBottom: "62px", padding: "10px 0" }}>
        <Grid xs={12} sm={6} css={{ padding: "10px 10px 0 10px" }}>
          <Card1 />
        </Grid>
        <Grid xs={12} sm={6} css={{ padding: "10px 10px 0 10px" }}>
          <Card2 />
        </Grid>
      </Grid.Container>
    </div>
  );
}

export default AdminHeader;
