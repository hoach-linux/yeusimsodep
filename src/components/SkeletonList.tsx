import { Skeleton, Typography } from "@mui/material";
import { Grid } from "@nextui-org/react";


function SkeletonList() {
    let skeletonList: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

    return (
        <div >
            <Typography component="div" variant="h2" >
                <Skeleton animation="wave" />
            </Typography>
            <Grid.Container
                gap={1}
                justify="flex-start"
                css={{
                    marginBottom: "62px",
                    scrollbarWidth: "none",
                }}
            >
                {skeletonList.map((index) => (
                    <Grid xs={6} sm={3} key={index}>
                        <Skeleton
                            animation="wave"
                            sx={{ minWidth: "100%", borderRadius: "12px" }}
                            variant="rectangular"
                            height={134}
                        />
                    </Grid>
                ))}
            </Grid.Container>
        </div>
    )
}

export default SkeletonList