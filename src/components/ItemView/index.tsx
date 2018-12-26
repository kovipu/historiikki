import * as React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Theme, createStyles, withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import { Item } from '../../@types/globals';
import Medium from './Medium';
import AddNewMedium from './AddNewMedium';

interface Props {
  open: boolean,
  handleClose: () => void,
  item: Item | null,
  classes: {
    dialog: string,
    content: string
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

      <DialogContent className={classes.content}>
        <DialogContentText>
          {item.description}
        </DialogContentText>
        {
          item.media.map(mediaItem => (
            <Medium
              key={mediaItem.filename}
              itemId={item.id}
              mediaItem={mediaItem}
            />
          ))
        }

        <Divider/>
        <AddNewMedium itemId={item.id}/>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Pois
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Transition = (props: any) =>
  <Slide direction="up" {...props} />;

const styles = (theme: Theme) => createStyles({
  dialog: {
    paddingRight: '0 !important',
    textAlign: 'center',
  },
  content: {
    padding: 0,
    [theme.breakpoints.up('md')]: {
      paddingLeft: '15%',
      paddingRight: '15%'
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '30%',
      paddingRight: '30%'
    }
  }
});

export default withStyles(styles)(ItemView);
