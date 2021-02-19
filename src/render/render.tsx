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
import DashboardLayout from "@/components/DashboardLayout";
import ButterflySpring from '@/pages/ButterflySpring';
import PullSpring from "@/pages/PullSpring";
import AboutPage from "@/pages/AboutPage";
import { SubPages } from "../common/commonDeclares";

require('@/global.less');

const history = createBrowserHistory();

const wrapDashboardComponent = (component: React.ComponentType<any>) => {
  return () => {
    return (
      <DashboardLayout>
        {React.createElement(component)}
      </DashboardLayout>
    );
  };
}

const HomePageRouter = () => {

  return (
    <Router history={history}>
      <Route path="/" component={wrapDashboardComponent(PullSpring)} />
      <Route path="/butterflySpring" component={wrapDashboardComponent(ButterflySpring)} />
      <Route path="/pullSpring" component={wrapDashboardComponent(PullSpring)} />
    </Router>
  );
}


const params = parseUrlParams();

if (params.page === SubPages.AboutPage) {
  renderToHtml(<AboutPage />);
} else {
  renderToHtml(<HomePageRouter />);
}
