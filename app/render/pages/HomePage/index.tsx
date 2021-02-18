/**
 * industrial-spring-assistant.
 *
 * @author arnozhang
 * @date 2021/02/18
 */

import * as React from 'react';
import { Route, Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { renderToHtml } from '@/common/commonDeclares';
import RouterPageWrapper from '@/pages/RouterPageWrapper';
import ButterflySpring from '@/pages/ButterflySpring';

const history = createBrowserHistory();

const HomePage = () => {

  return (
    <Router history={history}>
      <Route path="/" component={RouterPageWrapper}>
        <Route path="/" component={ButterflySpring} />
      </Route>
    </Router>
  );
}


const homePage = renderToHtml(<HomePage />);
