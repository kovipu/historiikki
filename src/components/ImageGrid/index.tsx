import * as React from 'react';

import { Theme, createStyles, withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import HistoryItem from './HistoryItem';
import { Item } from '../../globals';
import { getItems } from '../../api';

interface Props {
  classes: {
    root: string,
    grid: string
  }
}

interface State {
  isLoading: boolean,
  items: Item[]
}

class ImageGrid extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
      items: []
    };
  }

  public componentDidMount() {
    getItems()
      .then(items => this.setState({ items }))
      .catch(err => console.error(err));
  }

  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid
          container={true}
          spacing={16}
          className={classes.grid}
        >
          {
            this.state.isLoading
              ? 'Ladataan...'
              : this.state.items.map((item: Item) => (
                <Grid
                  key={item.id}
                  item={true}
                  xs={12} sm={6} md={4} lg={3}
                >
                  <HistoryItem
                    item={item}
                  />
                </Grid>
              ))
          }
        </Grid>
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    padding: '16px'
  },
  grid: {
    margin: 0,
    width: '100%'
  }
});


export default withStyles(styles)(ImageGrid);