/**
 * industrial-spring-assistant.
 *
 * @author arnozhang
 * @date 2021/02/18
 */

import * as React from 'react';
import { Redirect, Route, Router } from 'react-router';
import { createHashHistory, History } from 'history';
import { parseUrlParams } from "@/common/utils";
import { renderToHtml } from "@/common/renderDeclares";
import { SubPages } from "@@/common/commonDeclares";
import { wrapDashboardComponent } from "@/components/DashboardLayout";
import ButterflySpring from '@/pages/ButterflySpring';
import PullSpring from "@/pages/PullSpring";
import AboutPage from "@/pages/AboutPage";

require('@/global.less');


interface IHomePageRouterProps {

  history: History;
}

const HomePageRouter = (props: IHomePageRouterProps) => {
  const HomePageComponent = wrapDashboardComponent(ButterflySpring);

  return (
    <Router history={props.history}>
      <Redirect from="/" to="/butterflySpring" />

      <Route path="/butterflySpring" component={HomePageComponent} />
      <Route path="/pullSpring" component={wrapDashboardComponent(PullSpring)} />

      <Route component={HomePageComponent} />
    </Router>
  );
}


const params = parseUrlParams();

if (params.page === SubPages.AboutPage) {
  renderToHtml(<AboutPage />);
} else {
  const history = createHashHistory();
  renderToHtml(<HomePageRouter history={history} />);
}
