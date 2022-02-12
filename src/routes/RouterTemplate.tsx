import React, { Suspense } from 'react';
import routes from './routes';
import { Switch, Route, withRouter, Redirect, BrowserRouter } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from 'react-router';

type PageProps = {} & RouteComponentProps;

const RouterTemplate: React.FC<PageProps> = (props) => {
  let routeComps = [];

  Object.keys(routes).forEach((key) => {
    const route = routes[key] as RouteProps;
    const { component, path } = route;
    routeComps.push(<Route exact key={key} path={path} render={(route) => <PageLayout component={component} {...route} />} />);
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
