import { Box} from "@mui/material";


const ProgressCircle = ({ progress = "0.75", size = "60" }) => {
  const angle = progress * 360;
  return (
    <Box
      sx={{
        background: `radial-gradient(#cbd5e1 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, #64748b ${angle}deg 360deg),
            #334155`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;