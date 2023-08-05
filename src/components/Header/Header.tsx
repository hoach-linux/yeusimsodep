import {
	Grid,
} from "@nextui-org/react";
import React, { useState, useEffect, FC } from "react";
import SimService from "../../API/SimService";
import { useFetching } from "../../hooks/useFetching";
import SimList from "../SimList";
import { ClickAwayListener, Divider, IconButton, InputBase, Paper, Tooltip, Typography } from "@mui/material";
import { Clear, Info, Search } from "@mui/icons-material";
import SkeletonList from "../SkeletonList";
import { useTheme, Theme } from "@mui/material/styles";

interface IHeader {
	changeSearchInput: (element: string) => void
}

const Header: FC<IHeader> = ({ changeSearchInput }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [searchSim, setSearchSim] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [searchTitle, setSearchTitle] = useState("");
	const [clickedSearchIcon, setClickedSearchIcon] = useState(false)
	const theme: Theme = useTheme()
	const isDarkMode = theme.palette.mode === 'dark'
	const [searching, searchLoading] = useFetching(async () => {
		if (searchInput.length <= 0) return

		setClickedSearchIcon(true)

		const response = await SimService.getSimBySearch({ keyword: searchInput });

		setSearchSim(response.data);
		setSearchTitle(`Tìm sim số đẹp: ${searchInput}`);
	});

	useEffect(() => {
		if (searchInput.length === 0) {
			setSearchSim([]);
			setClickedSearchIcon(false)
		}

		changeSearchInput(searchInput)
	}, [searchInput]);

	const clearInput = () => setSearchInput("")

	function searchByEnter(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key !== "Enter") return

		event.preventDefault()
		searching()
	}

	return (
		<div style={{ marginBottom: "52px", position: "sticky", top: "65px", left: 0, height: "content-fit", zIndex: 2 }}>
			<div style={{ minWidth: "100%" }}>
				<Grid.Container gap={2} alignItems="center" css={{ minWidth: "100%" }}>
					<Paper
						component="form"
						sx={{
							p: '2px 4px', display: 'flex', alignItems: 'center', minWidth: "100%", mb: "10px", boxShadow: "none", border: isDarkMode ? "1px solid #313131" : "1px solid #ECECEC"
						}}
					>
						<InputBase
							onChange={(e: any) => setSearchInput(e.target.value)}
							value={searchInput}
							sx={{ ml: 1, flex: 1 }}
							placeholder="Tìm sim trên yeusimsodep"
							inputProps={{ 'aria-label': 'tìm sim trên yeusimsodep' }}
							onKeyDown={searchByEnter}
						/>
						{searchInput.length > 0 &&
							<>
								<IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={clearInput}>
									<Clear />
								</IconButton>
								<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
								<IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={searching}>
									<Search />
								</IconButton>
								<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
							</>
						}
						<ClickAwayListener onClickAway={() => setIsOpen(false)}>
							<Tooltip
								PopperProps={{
									disablePortal: true,
								}}
								placement="bottom-end"
								onClose={() => setIsOpen(false)}
								open={isOpen}
								disableFocusListener
								disableHoverListener
								disableTouchListener
								title={
									<>
										<Typography>• Tìm sim có số  đuôi 6789 hãy gõ *6789</Typography>
										<Typography>• Tìm sim có đầu 090 đuôi 8888 hãy gõ 090*8888</Typography>
										<Typography>• Tìm sim đầu số  0914 đuôi bất kỳ, hãy gõ 0914*</Typography>
										<Typography>• Tìm sim có số  giữa 888 đuôi bất kỳ, hãy gõ *888*</Typography>
									</>
								}
							>
								<IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={() => setIsOpen(true)}>
									<Info />
								</IconButton>
							</Tooltip>
						</ClickAwayListener>
					</Paper>
				</Grid.Container>
				{searchSim.length >= 1 ? (
					<SimList sims={searchSim} title={searchTitle} />
				) : searchSim.length < 1 &&
					searchInput.length !== 0 &&
					!searchLoading && clickedSearchIcon ? (
					<Typography variant="h4" sx={{ textAlign: "center", mb: "15px" }} >
						Không tìm thấy sim
					</Typography>
				) : (
					searchLoading && (
						<SkeletonList />
					)
				)}
			</div>
		</div>
	);
};

export default Header;
