import {Typography, Box, useTheme} from "@mui/material";

const Header = ({title, subtitle}) => {

    return(
        <Box mb='30px'>
            <Typography
                variant='h5'
                fontWeight='bold'
                sx = {{mb: "5px"}}
                className = 'text-slate-600'
            >
                {title}
            </Typography>
            <Typography variant = "h6" className = 'text-slate-500' > {subtitle} </Typography>
        </Box>
    );
};

export default Header;