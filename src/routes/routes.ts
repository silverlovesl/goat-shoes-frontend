import React from 'react';
import { RouteProps } from 'react-router-dom';

export const SneakerGridPage = React.lazy(() => import('../pages/SneakerGridPage/SneakerGridPage'));
const SneakerDetailPage = React.lazy(() => import('../pages/SneakerDetailPage/SneakerDetailPage'));

export default {
  sneakerGrid: {
    component: SneakerGridPage,
    path: '/sneaker',
    exact: true,
  } as RouteProps,
  sneakerDetail: {
    component: SneakerDetailPage,
    path: '/sneaker/:sneaker_id',
    exact: false,
  } as RouteProps,
};
