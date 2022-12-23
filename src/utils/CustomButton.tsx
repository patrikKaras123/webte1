import { Button } from '@mui/material'
import React, { FC } from 'react'

interface CustomButtonProps {
  clickEvent: () => void,
  name: string
}

const CustomButton: FC<CustomButtonProps> = (props) => {
  const { clickEvent, name } = props;
 
  return (
    <Button
      onClick={clickEvent}
      variant="contained"
      style={{
        fontWeight: 'bold',
        margin: 5
      }}
    >
      {name}
    </Button>
  )
}

export default CustomButton