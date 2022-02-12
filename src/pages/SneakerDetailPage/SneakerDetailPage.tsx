import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { fetchSneakerByID } from '../../stores/features/sneakerDetailSlice';
import { Button, Card } from 'antd';
import { useRouteMatch } from 'react-router-dom';
import './SneakerDetailPage.scss';
import { StringUtils } from '../../utils';

type Props = {};

const SneakerDetailPage: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { sneaker, loading, err } = useSelector((state: RootState) => state.sneakerDetail);
  const match = useRouteMatch();

  const compPrice = <span>¥{StringUtils.formatAmount(sneaker?.retail_price_cents)}</span>;

  useEffect(() => {
    const sneaker_id = match.params['sneaker_id'] as string;
    if (!Number.isNaN(sneaker_id)) {
      dispatch(fetchSneakerByID(parseInt(sneaker_id)));
    } else {
      // TODO: Error handling
    }
  }, []);

  return (
    <div className="sneaker-detail-page">
      {!loading && sneaker ? (
        <div>
          <Card className="sneaker-detail-page__sneaker-info">
            <Card.Grid className="sneaker-detail-page__sneaker-info-showcase">
              <div className="sneaker-detail-page__sneaker-info-showcase__onfeet">
                <img src={sneaker.grid_picture_url} />
              </div>
              <span></span>
              <div className="sneaker-detail-page__sneaker-info-showcase__picture">
                <img src={sneaker.main_picture_url} />
              </div>
              <p className="sneaker-detail-page__sneaker-info-showcase__details">{sneaker.details}</p>
            </Card.Grid>
            <Card.Grid className="sneaker-detail-page__sneaker-info-showcase">
              <div className="sneaker-detail-page__sneaker-info-showcase__extra">
                <Button size="small">Want</Button>
              </div>
              <div>
                <h1 className="sneaker-detail-page__sneaker-info-showcase__name">{sneaker.name}</h1>
                <p className="sneaker-detail-page__sneaker-info-showcase__sku">SKU: {sneaker.sku}</p>
              </div>
              <div className="sneaker-detail-page__sneaker-info-showcase__button-group">
                <a>Buy New - {compPrice}</a>
                <a>Buy Used - {compPrice}</a>
              </div>
            </Card.Grid>
          </Card>

          {/* <div className="sneaker-detail-page__detail-arrow-wrapper">
            <a>
              Details <div className="arrow">&gt;</div>
            </a>
          </div> */}

          <div className="sneaker-detail-page__story">
            <h2>Product Details</h2>
            <p dangerouslySetInnerHTML={{ __html: sneaker.story_html }}></p>
          </div>
        </div>
      ) : (
        <span>Loading</span>
      )}
    </div>
  );
};

export default SneakerDetailPage;
