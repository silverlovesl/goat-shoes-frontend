import { Sneaker } from '../src/models';
import store from '../src/stores/configuration';
import { initState, startFetching, setErrors, finishFetching, setSneaker, fetchSneakerByID } from '../src/stores/features/sneakerDetailSlice';

const TEST_SNEAKER_ID = 13607;

const TEST_SNEAKER = {
  box_condition: 'no_original_box',
  brand_name: 'Air Jordan',
  category: ['basketball'],
  collection_slugs: ['goat-clean', 'jordan'],
  color: 'White',
  designer: 'Tinker Hatfield',
  details: 'White/Legend Blue',
  gender: ['men'],
  grid_picture_url: 'https://image.goat.com/375/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png',
  has_picture: true,
  has_stock: true,
  id: 13607,
  keywords: [],
  main_picture_url: 'https://image.goat.com/750/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png',
  midsole: 'Air',
  name: "Air Jordan 11 Retro 'Legend Blue' 2014",
  nickname: 'Legend Blue',
  original_picture_url: 'https://image.goat.com/attachments/product_template_pictures/images/010/223/048/original/13607_00.png.png',
  product_template_id: 13607,
  release_date: '2014-12-20T23:59:59.000Z',
  release_date_unix: 1419119999,
  release_year: 2014,
  retail_price_cents: 20000,
  shoe_condition: 'used',
  silhouette: 'Air Jordan 11',
  size_range: [10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5],
  sku: '378037 117',
  slug: 'air-jordan-11-retro-legend-blue-378037-117',
  status: 'active',
  story_html:
    '<p>The Air Jordan 11 Retro ‘Legend Blue’ 2014 was based on the 1996 Jordan 11 ‘Columbia’ first worn by Jordan during the 1996 NBA All-Star Game. Inspired by the classic colorway Jordan wore as a Tarheel, the ‘Columbia’ first retroed in 2001 for the Jordan 11 ‘Columbia’ Retro release.</p>\n',
  upper_material: '',
} as Sneaker;

beforeEach(() => {
  store.dispatch(initState());
});

describe('Test sneakerDetailSlice', () => {
  test('should state be initialized', () => {
    const { sneakerDetail } = store.getState();
    expect(sneakerDetail.loading).toBe(false);
    expect(sneakerDetail.sneaker).toBe(null);
    expect(sneakerDetail.errors).toBe(null);
  });

  test('can set state correctly', () => {
    store.dispatch(startFetching());
    expect(store.getState().sneakerDetail.loading).toBe(true);
    expect(store.getState().sneakerDetail.errors).toBe(null);

    store.dispatch(setErrors('Some error'));
    expect(store.getState().sneakerDetail.errors).toBe('Some error');

    store.dispatch(finishFetching());
    expect(store.getState().sneakerDetail.loading).toBe(false);

    store.dispatch(setSneaker(TEST_SNEAKER));
    expect(store.getState().sneakerDetail.sneaker.name).toBe(TEST_SNEAKER.name);
  });

  test('can fetch sneaker by id', async () => {
    await store.dispatch(fetchSneakerByID(TEST_SNEAKER_ID));
    const { sneakerDetail } = store.getState();
    Object.keys(TEST_SNEAKER).forEach((key) => {
      expect(sneakerDetail.sneaker[key]).toEqual(TEST_SNEAKER[key]);
    });
    expect(sneakerDetail.loading).toBe(true);
    expect(sneakerDetail.errors).toBe(null);
  });
});
