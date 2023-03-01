import { FormControlLabel, Switch } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";

interface Prop {
  label: string;
  value?: boolean;
  changeFn?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AntSwitch = ({ label, changeFn, value }: Prop) => {
  const GreenSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: green[600],
      "&:hover": {
        backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: green[600],
    },
  }));
  return (
    <FormControlLabel
      control={
      <GreenSwitch size="small" 
      value={value}
      checked={value === true ? true : false}
      onChange={changeFn}
      />
    }
      label={label}
      color="success"
    />
  );
};

export default AntSwitch;
