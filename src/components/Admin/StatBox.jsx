import { Box, Typography } from "@mui/material";
import ProgressCircle from "./ProgressCircle";

export default function StatBox({ title, subtitle, icon, progress, increase }) {

    return (
        <Box width='100%' m='0 30px'>
            <Box display='flex' justifyContent='space-between'>
                <Box>
                    {icon}
                    <Typography variant='h6' fontWeight='bold' className="text-slate-600">{title}</Typography>
                </Box>
                <Box>
                    <ProgressCircle progress={progress} />
                </Box>
            </Box>
                <Box display='flex' justifyContent='space-between'>
                    <Typography variant='subtitle1' className="text-slate-600">{subtitle}</Typography>
                    <Typography variant='subtitle1' fontStyle='italic' className="text-slate-500">{increase}</Typography>
                </Box>
        
        </Box>
    )
}