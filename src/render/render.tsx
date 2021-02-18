/**
 * industrial-spring-assistant.
 *
 * @author arnozhang
 * @date 2021/02/18
 */

import * as React from 'react';
import { Route, Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { parseUrlParams } from "@/common/utils";
import { renderToHtml } from "@/common/renderDeclares";
import RouterPageWrapper from '@/pages/RouterPageWrapper';
import ButterflySpring from '@/pages/ButterflySpring';
import AboutPage from "@/pages/AboutPage";

require('@/global.less');

const history = createBrowserHistory();

const HomePageRouter = () => {

  return (
    <Router history={history}>
      <Route path="/" component={RouterPageWrapper}>
        <Route path="/" component={ButterflySpring} />
      </Route>
    </Router>
  );
}


const params = parseUrlParams();

if (params.page === 'about') {
  renderToHtml(<AboutPage />);
} else {
  renderToHtml(<HomePageRouter />);
}
