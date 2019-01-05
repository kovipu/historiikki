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
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';
import Link from '../Link';

import { Item } from '../../@types/globals';
import Medium from './Medium';
import AddNewMedium from './AddNewMedium';

interface Props {
  item: Item | undefined,
  updateItems: () => void,
  classes: {
    dialog: string,
    content: string,
    contenttext: string,
    newFileButton: string,
    exitbutton: string
  }
}

interface State {
  addingFile: boolean
}

class ItemView extends React.Component<Props, State> {
  public state = {
    addingFile: false
  };

  public render() {
    const { item, classes} = this.props;

    if (item === undefined) {
      return null;
    }

    const handleAddItemClick = () => this.setState({
      addingFile: !this.state.addingFile
    });

    return (
      <Dialog
        fullScreen={true}
        open={true}
        TransitionComponent={Transition}
        className={classes.dialog}
      >
        <DialogTitle>
          {item.name}
        </DialogTitle>

        <DialogContent className={classes.content}>
          <DialogContentText className={classes.contenttext}>
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

          <Button
            onClick={handleAddItemClick}
            className={classes.newFileButton}
          >
            <Icon>add</Icon> Lisää uusi liite
          </Button>
          <Collapse in={this.state.addingFile}>
            <AddNewMedium
              itemId={item.id}
              updateItems={this.props.updateItems}
            />
          </Collapse>
        </DialogContent>

        <DialogActions>
          <Link to="/">
            <Button color="primary" className="exitbutton">
              Pois
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    );
  }
}

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
  },
  contenttext: {
    marginBottom: theme.spacing.unit
  },
  newFileButton: {
    marginTop: theme.spacing.unit
  },
  exitbutton: {
    textDecoration: 'none'
  }
});

export default withStyles(styles)(ItemView);
