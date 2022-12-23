import { Button, Popper, Fade, Paper, Typography } from '@mui/material'
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state'
import React, { FC } from 'react'

interface PopoverProps {
  text: string,
  nameButton: string
}

const Popover: FC<PopoverProps> = (props) => {
  const { text, nameButton } = props;
  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState:any) => (
        <div>
          <Button variant="contained" {...bindToggle(popupState)} style={{fontSize:"20px", fontWeight: "bold", marginRight: 5}}>
          {nameButton}
          </Button>
          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <Typography sx={{ p: 2 }}>{text}</Typography>
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  )
}

export default Popover