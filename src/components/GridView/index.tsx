import * as React from 'react';

import { Theme, createStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import HistoryItem from './HistoryItem';
import { Item } from '../../@types/globals';
import Link from '../Link';

interface Props {
  items: Item[],
  classes: {
    root: string,
    grid: string
  }
}

const GridView = (props: Props) => {
  const {classes, items} = props;

  return (
    <div className={classes.root}>
      <Grid
        container={true}
        spacing={8}
        className={classes.grid}
      >
        {items.map((item: Item) => (
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
        ))}
      </Grid>
    </div>
  );
}

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    padding: '0'
  },
  grid: {
    margin: 0,
    width: '100%'
  }
});


export default withStyles(styles)(GridView);
