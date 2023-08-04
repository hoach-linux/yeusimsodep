import { Card1 } from "./Card1";
import { Card2 } from "./Card2";
import { Grid } from "@nextui-org/react";
import { Card3 } from "./Card3";
import { Card4 } from "./Card4";

function AdminHeader() {
  return (
    <div>
      <Grid.Container gap={1} justify="center" css={{ marginBottom: "62px", padding: "10px 0" }}>
        <Grid xs={12} sm={6} >
          <Card1 />
        </Grid>
        <Grid xs={12} sm={6} >
          <Card2 />
        </Grid>
        <Grid xs={12} sm={6} >
          <Card3 />
        </Grid>
        <Grid xs={12} sm={6} >
          <Card4 />
        </Grid>
      </Grid.Container>
    </div>
  );
}

export default AdminHeader;
