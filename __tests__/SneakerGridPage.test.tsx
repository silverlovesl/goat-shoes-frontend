import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import SneakerGridPage from '../src/pages/SneakerGridPage/SneakerGridPage';
import store from '../src/stores/configuration';
import { initState, setErrors } from '../src/stores/features/sneakerSlice';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

beforeEach(() => {
  rendComponent();
});

const rendComponent = () => {
  store.dispatch(initState());
  render(
    <Provider store={store}>
      <SneakerGridPage />
    </Provider>
  );
};

describe('Test sneaker grid view page', () => {
  test('should render 20 grid cells on screen initially', async () => {
    const gridCells = await screen.findAllByTestId('sneaker-grid-page__grid-cell');
    const { sneaker } = store.getState();
    expect(gridCells.length).toBe(20);
    expect(gridCells.length).toEqual(sneaker.sneakers.length);
  });

  test('should not error message render', () => {
    store.dispatch(setErrors(null));
    expect(screen.queryByTestId('sneaker-grid-page__alert')).not.toBeInTheDocument();
  });

  test('should error message render', () => {
    store.dispatch(setErrors('Some error occured'));
    expect(screen.queryByTestId('sneaker-grid-page__alert')).toBeInTheDocument();
  });
});

describe('Test sneaker grid view toolbox', () => {
  test('should filter button rendered', () => {
    const filterButton = screen.getByTestId('sneaker-grid-toolbox__filter-btn');
    expect(filterButton.innerHTML).toBe('Show Filters');
    fireEvent.click(filterButton);
    expect(filterButton.innerHTML).toBe('Hide Filters');
  });

  test('should sort by select rendered', () => {
    const sortBySelect = screen.getByTestId('sneaker-grid-toolbox__sortby-select');
    expect(sortBySelect).toBeInTheDocument();
  });

  test('can toggle filter by button click', () => {
    const filterButton = screen.getByTestId('sneaker-grid-toolbox__filter-btn');
    expect(screen.queryByTestId('sneaker-grid-toolbox__filters')).not.toBeInTheDocument();
    fireEvent.click(filterButton);
    expect(screen.queryByTestId('sneaker-grid-toolbox__filters')).toBeInTheDocument();
  });
});
