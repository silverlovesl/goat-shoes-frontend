import { API } from '..';
import { SneakSearchSortBy, Sneaker } from '../../models';

class SneakerAPI {
  /**
   * Featch sneakers
   * @param pageNo
   * @param limit
   * @param orderBy
   * @returns
   */
  async fetchSneakers(
    pageNo: number = 1,
    limit: number = 20,
    sortBy: SneakSearchSortBy = 'release-date-N',
    nameLike: string = '',
    shoeCondtion: string = ''
  ): Promise<{ data: Sneaker[]; totalCount?: number }> {
    let url = '/sneakers?';
    if (pageNo) {
      url = `${url}&_start=${(pageNo - 1) * limit}`;
    }
    if (limit) {
      url = `${url}&_end=${limit * pageNo}`;
    }
    if (nameLike) {
      url = `${url}&name_like=${nameLike}`;
    }
    if (shoeCondtion) {
      url = `${url}&shoe_condition=${shoeCondtion}`;
    }
    switch (sortBy) {
      case 'price-H':
        url = `${url}&_sort=retail_price_cents&_order=desc`;
        break;
      case 'price-L':
        url = `${url}&_sort=retail_price_cents&_order=asc`;
        break;
      case 'release-date-N':
        url = `${url}&_sort=release_date_unix&_order=desc`;
        break;
      case 'release-date-O':
        url = `${url}&_sort=release_date_unix&_order=asc`;
        break;
      default:
        break;
    }
    return API.get(url, {}).then((res) => {
      const totalCount = parseInt(res.headers['x-total-count']);
      return { data: res.data, totalCount: totalCount };
    });
  }

  /**
   * Fetch sneaker id
   * @param sneaker_id
   */
  async fetchSneakerByID(sneaker_id: number): Promise<Sneaker> {
    return API.get(`/sneakers/${sneaker_id}`, {}).then((res) => {
      return res.data;
    });
  }
}

export const sneakerAPI = new SneakerAPI();
