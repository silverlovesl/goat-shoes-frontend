import React, { Suspense } from 'react';
import routes from './routes';
import { Switch, Route, withRouter, RouteProps, Redirect } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

type PageProps = {};

const RouterTemplate: React.FC<PageProps> = (props) => {
  let routeComps = [];

  Object.keys(routes).forEach((key) => {
    const route = routes[key] as RouteProps;
    const { component, path, exact } = route;
    routeComps.push(<Route exact={exact} key={key} path={path} render={(route) => <PageLayout component={component} {...route} />} />);
  });

  return (
    <Switch>
      <Suspense fallback={<></>}>
        {routeComps.map((comp) => comp)}
        <Route exact={true} key="home" path="/" render={() => <Redirect to="/sneaker" />} />
      </Suspense>
    </Switch>
  );
};

export default withRouter(RouterTemplate);
