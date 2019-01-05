import * as React from 'react';

import { Theme, createStyles, withStyles } from '@material-ui/core/styles';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import HistoryItem from './HistoryItem';
import ItemView from '../ItemView';
import { Item } from '../../@types/globals';
import { getItems } from '../../api';
import Link from '../Link';

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
    const { items } = this.state;

    const itemView = ({ match }: any) => (
      <ItemView
        item={items.find(i => i.id === match.params.itemId)}
        updateItems={this.updateItems}
      />
    );

    return (
      <Router>
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
                    <Link to={`/h/${item.id}`}>
                      <HistoryItem
                        item={item}
                      />
                    </Link>
                  </Grid>
                ))
            }
          </Grid>
          <Route path="/h/:itemId" render={itemView} />
        </div>
      </Router>
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
