import * as React from 'react';

import { Theme, createStyles, withStyles } from '@material-ui/core/styles';
import * as R from 'ramda';

import Grid from '@material-ui/core/Grid';
import HistoryItem from './HistoryItem';
import ItemView from '../ItemView';
import { Item } from '../../@types/globals';
import { getItems } from '../../api';

interface Props {
  classes: {
    root: string,
    grid: string
  }
}

interface State {
  isLoading: boolean,
  items: Item[],
  selected: string
}

class ImageGrid extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
      items: [],
      selected: ''
    };
  }

  public componentDidMount() {
    this.updateItems();
  }

  public render() {
    const { classes } = this.props;
    const openItemView = (selected: string) => this.setState({ selected });
    const closeItemView = () => this.setState({ selected: '' });
    const selectedItem = R.find((item: Item) => item.id === this.state.selected)(this.state.items);

    const itemView = (
      <ItemView
        open={this.state.selected !== ''}
        handleClose={closeItemView}
        item={selectedItem}
        updateItems={this.updateItems}
      />
    );

    return (
      <>
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
                      openItemView={openItemView}
                    />
                  </Grid>
                ))
            }
          </Grid>
        </div>
        {itemView}
      </>
    );
  }

  private updateItems = () =>
    getItems()
      .then(items => this.setState({ items }))
      .catch(err => console.error(err));
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