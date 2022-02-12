import React from 'react';
import { RouteProps } from 'react-router';

const SneakerGridPage = React.lazy(() => import('../pages/SneakerGridPage/SneakerGridPage'));
const SneakerDetailPage = React.lazy(() => import('../pages/SneakerDetailPage/SneakerDetailPage'));

export default {
  sneakerGrid: {
    component: SneakerGridPage,
    path: '/sneaker',
  } as RouteProps,
  sneakerDetail: {
    component: SneakerDetailPage,
    path: '/sneaker/:sneaker_id',
  } as RouteProps,
};
