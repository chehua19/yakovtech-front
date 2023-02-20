import React from "react";
import { Stack, Button, Typography } from "@mui/material";

function MainPage(){
    return (
        <Stack direction="column" justifyContent="flex-start" alignItems="center" >
            <img src="./logoYak.png" width={"50%"} style={{
                paddingBottom: "5%"
            }}/>

            <Button variant="text"><Typography variant="h3" color={"#F22CDF"}>About Me</Typography></Button>
            <Button variant="text"><Typography variant="h3" color={"#9FE018"}>Project</Typography></Button>
            <Button variant="text"><Typography variant="h3" color={"#7D2BED"}>CV</Typography></Button>
        </Stack>
    )
}

export default MainPage;