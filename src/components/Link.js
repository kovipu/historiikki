import * as React from 'react';
import {Link as Link_} from 'react-router-dom';

const Link = (props) => (
  <Link_ style={{ textDecoration: 'none' }} {...props}>
    {props.children}
  </Link_>
);

export default Link;
