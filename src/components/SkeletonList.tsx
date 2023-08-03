import { Skeleton, Typography } from "@mui/material";
import { Grid } from "@nextui-org/react";


function SkeletonList() {
    let skeletonList: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]

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
                            height={100}
                        />
                    </Grid>
                ))}
            </Grid.Container>
        </div>
    )
}

export default SkeletonList