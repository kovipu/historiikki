import * as React from 'react';

import Button from '@material-ui/core/Button';
import { Theme, createStyles, withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { Item } from '../../@types/globals';
import Medium from './Medium';
import AddNewMedium from './AddNewMedium';
import Link from '../Link';

interface Props {
  item: Item | undefined,
  updateItems: () => void,
  classes: {
    appBar: string,
    content: string,
    backButton: string,
    backButtonIcon: string,
    contenttext: string,
    newFileButton: string,
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
    const { item, classes } = this.props;

    if (item === undefined) {
      return null;
    }

    const handleAddItemClick = () => this.setState({
      addingFile: !this.state.addingFile
    });

    return (
      <div>
        <AppBar color="primary" position="relative" className={classes.appBar}>
          <Toolbar>
            <Link to="/">
              <IconButton className={classes.backButton}>
                <Icon className={classes.backButtonIcon}>arrow_back</Icon>
              </IconButton>
            </Link>
            <div>
              <Typography variant="h5" color="inherit">
                {item.name}
              </Typography>
              <Typography color="inherit">
              {item.description}
              </Typography>
            </div>
          </Toolbar>
        </AppBar>

        <div className={classes.content}>
          <Grid container={true} spacing={8}>
          {
            item.media.map(mediaItem => (
              <Grid
                item={true}
                key={mediaItem.filename}
                xs={12} sm={12} md={12} lg={12}
              >
                <Medium
                  key={mediaItem.filename}
                  itemId={item.id}
                  mediaItem={mediaItem}
                />
              </Grid>
            ))
          }
          </Grid>

          <Button
            variant="raised"
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
        </div>
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  appBar: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  content: {
    textAlign: 'center',
    padding: 4,
    marginTop: theme.spacing.unit,
    [theme.breakpoints.up('md')]: {
      paddingLeft: '15%',
      paddingRight: '15%'
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '30%',
      paddingRight: '30%'
    }
  },
  backButton: {
    marginLeft: -12,
    marginRight: 20
  },
  backButtonIcon: {
    color: 'white'
  },
  contenttext: {
    marginBottom: theme.spacing.unit
  },
  newFileButton: {
    margin: 2 * theme.spacing.unit
  },
  exitbutton: {
    textDecoration: 'none'
  }
});

export default withStyles(styles)(ItemView);
