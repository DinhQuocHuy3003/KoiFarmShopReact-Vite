import { useEffect, useState } from "react";
import useStore from "../../app/store";
import { Grid } from "@mui/material";
import FishList from "./FishList";

export default function Home() {
    const getFishes = useStore(
        (state) => state.getFishes
    );

    const fishList = useStore((state) => state.fishList);

    const [page, setPage] = useState(1);

    useEffect(() => {
        getFishes(page, 12);
    }, [page]);

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    return (
        <Grid container spacing={1}>
            <FishList 
             fishes={fishList?.$values || []}
             page={page}
             handleChangePage={handleChangePage}
             totalPage={fishList?.data?.totalPage || 1}
            />
        </Grid>
    )
}