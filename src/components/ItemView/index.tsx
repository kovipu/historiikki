import * as React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Theme, createStyles, withStyles } from '@material-ui/core/styles';

import { Item } from '../../globals';

interface Props {
  open: boolean,
  handleClose: () => void,
  item: Item | null,
  classes: {
    dialog: string
  }
}

const ItemView = (props: Props) => {
  const { open, handleClose, item, classes } = props;

  if (item === null) {
    return null;
  }

  return (
    <Dialog
      fullScreen={true}
      open={open}
      TransitionComponent={Transition}
      className={classes.dialog}
    >
      <DialogTitle>
        {item.name}
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          {item.description}
        </DialogContentText>
        
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Pois
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const Transition = (props: any) =>
  <Slide direction="right" {...props} />

const styles = (theme: Theme) => createStyles({
  dialog: {
    paddingRight: '0 !important',
    textAlign: 'center',
  }
})

export default withStyles(styles)(ItemView);
