import { useSearchParams } from "react-router-dom";
import useStore from "../store/useStore";
import { Divider, List, ListItem, ListSubheader } from "@mui/material";

function SidebarCard({
    items,
    filterTitle,
}: {
    items: any;
    filterTitle: string;
}) {
    const [searchParams, setSearchParams] = useSearchParams({});
    const resetPage = useStore((state: any) => state.resetPage);
    const setPageTitle = useStore((state: any) => state.setPageTitle);

    return (
        <List component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    {filterTitle}
                </ListSubheader>}
        >
            {
                items.map((item: string) => (
                    <div key={item}>
                        <Divider />
                        <ListItem button
                            onClick={() => {
                                resetPage();
                                setSearchParams({ query: item });
                                setPageTitle(item)
                            }}
                        >
                            {item}
                        </ListItem>
                    </div>
                ))
            }
        </List>
    );
}

export default SidebarCard;
