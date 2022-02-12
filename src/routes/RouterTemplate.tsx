import React, { Suspense } from 'react';
import routes, { SneakerGridPage } from './routes';
import { Switch, Route, withRouter, BrowserRouter } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { RouteComponentProps } from 'react-router-dom';
import { Redirect, RouteProps } from 'react-router';

type PageProps = {} & RouteComponentProps;

const RouterTemplate: React.FC<PageProps> = (props) => {
  let routeComps = [];

  Object.keys(routes).forEach((key) => {
    const route = routes[key] as RouteProps;
    const { component, path, exact } = route;
    routeComps.push(<Route exact={exact} key={key} path={path} render={(route) => <PageLayout component={component} {...route} />} />);
  });

  return (
    <BrowserRouter>
      <Switch>
        <Suspense fallback={<></>}>{routeComps.map((comp) => comp)}</Suspense>
      </Switch>
    </BrowserRouter>
  );
};

export default withRouter(RouterTemplate);
