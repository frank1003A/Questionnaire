import React from 'react'
import { IconButton } from '@mui/material'

interface Props {
    icon?: JSX.Element;
    onclick?: () => void
}
const IconButtonComponent = ({icon, onclick}: Props) => {
  return (
    <IconButton onClick={onclick}>
        {icon}
    </IconButton>
  )
}

export default IconButtonComponent