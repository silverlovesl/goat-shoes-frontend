import { Sneaker, SneakSearchSortBy } from '../src/models';
import store from '../src/stores/configuration';
import {
  initState,
  setErrors,
  nextPage,
  startFetching,
  setTotalCount,
  setSortBy,
  setNameLike,
  setShoeCondtion,
  finishFetching,
  fetchSneakers,
  initPagination,
  setSneakers,
} from '../src/stores/features/sneakerSlice';

const TEST_SNEAKERS = [
  {
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
  },
] as Sneaker[];

beforeEach(() => {
  store.dispatch(initState());
});

describe('Test sneakerSlice', () => {
  test('should state be initialized', () => {
    const { sneaker } = store.getState();
    expect(sneaker.pageNo).toBe(1);
    expect(sneaker.limit).toBe(20);
    expect(sneaker.loading).toBe(false);
    expect(sneaker.nameLike).toBe('');
    expect(sneaker.shoeCondtion).toBe('');
    expect(sneaker.sortBy).toBe('release-date-O' as SneakSearchSortBy);
    expect(sneaker.errors).toBe(null);
    expect(sneaker.totalCount).toBe(null);
    expect(sneaker.sneakers.length).toBe(0);
  });

  test('can initialize pagination info', () => {
    store.dispatch(initPagination());
    const { sneaker } = store.getState();
    expect(sneaker.pageNo).toBe(1);
    expect(sneaker.limit).toBe(20);
    expect(sneaker.errors).toBe(null);
    expect(sneaker.loading).toBe(false);
    expect(sneaker.totalCount).toBe(null);
    expect(sneaker.sneakers.length).toBe(0);
  });

  test('can set state correctly', () => {
    store.dispatch(nextPage());
    expect(store.getState().sneaker.pageNo).toBe(2);

    store.dispatch(startFetching());
    expect(store.getState().sneaker.loading).toBe(true);
    expect(store.getState().sneaker.errors).toBe(null);

    store.dispatch(setTotalCount(100));
    expect(store.getState().sneaker.totalCount).toBe(100);

    store.dispatch(setSortBy('price-L' as SneakSearchSortBy));
    expect(store.getState().sneaker.sortBy).toBe('price-L' as SneakSearchSortBy);

    store.dispatch(setSortBy('price-L' as SneakSearchSortBy));
    expect(store.getState().sneaker.sortBy).toBe('price-L' as SneakSearchSortBy);

    store.dispatch(setNameLike('Air Jordan'));
    expect(store.getState().sneaker.nameLike).toBe('Air Jordan');

    store.dispatch(setShoeCondtion('used'));
    expect(store.getState().sneaker.shoeCondtion).toBe('used');

    store.dispatch(setErrors('Some error'));
    expect(store.getState().sneaker.errors).toBe('Some error');

    store.dispatch(finishFetching());
    expect(store.getState().sneaker.loading).toBe(false);

    store.dispatch(setSneakers(TEST_SNEAKERS));
    expect(store.getState().sneaker.sneakers.length).toBe(1);
    expect(store.getState().sneaker.sneakers[0].name).toBe(TEST_SNEAKERS[0].name);
  });

  test('can fetch sneakers', async () => {
    await store.dispatch(fetchSneakers({ pageNo: 1, limit: 20 }));
    const { sneaker } = store.getState();
    expect(sneaker.sneakers.length).toBe(20);
    expect(sneaker.totalCount).toBe(80);
    expect(sneaker.loading).toBe(false);
    expect(sneaker.errors).toBe(null);
  });

  test('can load more sneakers', async () => {
    await store.dispatch(fetchSneakers({ pageNo: 1, limit: 20 }));
    expect(store.getState().sneaker.sneakers.length).toBe(20);
    await store.dispatch(fetchSneakers({ pageNo: 2, limit: 20 }));
    expect(store.getState().sneaker.sneakers.length).toBe(40);
  });

  test('get data sort by price(High => Low) correctly', async () => {
    await store.dispatch(fetchSneakers({ pageNo: 1, limit: 20, sortBy: 'price-H' }));
    const { sneaker } = store.getState();
    let maxPrice = Number.MIN_VALUE;
    sneaker.sneakers.forEach((s) => {
      maxPrice = Math.max(s.retail_price_cents, maxPrice);
    });
    // API response has bad record which retail_price_cents is null
    expect(maxPrice).toBe(30000);
    expect(sneaker.sneakers[0].retail_price_cents).toBe(null);
    expect(sneaker.sneakers[1].retail_price_cents).toBe(maxPrice);
    expect(sneaker.loading).toBe(false);
    expect(sneaker.errors).toBe(null);
  });

  test('get data sort by price(Low => High) correctly', async () => {
    await store.dispatch(fetchSneakers({ pageNo: 1, limit: 20, sortBy: 'price-L' }));
    const { sneaker } = store.getState();
    let minPrice = Number.MAX_VALUE;
    sneaker.sneakers.forEach((s) => {
      minPrice = Math.min(s.retail_price_cents, minPrice);
    });
    expect(minPrice).toBe(6000);
    expect(sneaker.sneakers[0].retail_price_cents).toBe(minPrice);
    expect(sneaker.loading).toBe(false);
    expect(sneaker.errors).toBe(null);
  });

  test('can filter by name', async () => {
    const nameLike = 'Air Jordan';
    await store.dispatch(fetchSneakers({ pageNo: 1, limit: 100, nameLike: nameLike }));
    const { sneaker } = store.getState();

    expect(sneaker.sneakers.length).toBeGreaterThan(0);
    sneaker.sneakers.forEach((s) => {
      expect(s.name).toContain(nameLike);
    });
    expect(sneaker.loading).toBe(false);
    expect(sneaker.errors).toBe(null);
  });

  test('can filter by shoeCondition', async () => {
    const shoe_condition = 'used';
    await store.dispatch(fetchSneakers({ pageNo: 1, limit: 100, shoeCondtion: shoe_condition }));
    const { sneaker } = store.getState();

    expect(sneaker.sneakers.length).toBeGreaterThan(0);
    sneaker.sneakers.forEach((s) => {
      expect(s.shoe_condition).toBe(shoe_condition);
    });
    expect(sneaker.loading).toBe(false);
    expect(sneaker.errors).toBe(null);
  });
});
