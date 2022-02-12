import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import SneakerDetailPage from '../pages/SneakerDetailPage/SneakerDetailPage';
import store from '../stores/configuration';
import { fetchSneakerByID, initState } from '../stores/features/sneakerDetailSlice';

const sneaker_id = 52015;

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
  useRouteMatch: () => ({ path: '/sneaker', params: { sneaker_id: sneaker_id } }),
}));

beforeEach(() => {
  rendComponent();
});

const rendComponent = () => {
  store.dispatch(initState());

  render(
    <Provider store={store}>
      <SneakerDetailPage />
    </Provider>
  );
};

describe('Test sneaker detail page', () => {
  test('can get detail info', async () => {
    await store.dispatch(fetchSneakerByID(sneaker_id));
    expect(screen.queryByTestId('sneaker-detail-page')).toBeInTheDocument();
    const sneakerDetail = store.getState().sneakerDetail;
    expect(screen.queryByTestId('sneaker-detail-page__sneaker-name').innerHTML).toEqual(sneakerDetail.sneaker.name);
    expect(screen.queryByTestId('sneaker-detail-page__sku').innerHTML).toEqual(`SKU: ${sneakerDetail.sneaker.sku}`);
  });
});
