import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { fetchSneakerByID, initState } from '../../stores/features/sneakerDetailSlice';
import { Alert, Button, Card } from 'antd';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { StringUtils } from '../../utils';
import './SneakerDetailPage.scss';

type Props = {};

const SneakerDetailPage: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { sneaker, loading, errors } = useSelector((state: RootState) => state.sneakerDetail);
  const match = useRouteMatch();
  const history = useHistory();

  const compPrice = <span>¥{StringUtils.formatAmount(sneaker?.retail_price_cents)}</span>;

  const goBack = () => {
    history.push('/sneaker');
  };

  useEffect(() => {
    const sneaker_id = match.params['sneaker_id'] as string;
    if (!Number.isNaN(sneaker_id)) {
      dispatch(fetchSneakerByID(parseInt(sneaker_id)));
    }

    return () => {
      dispatch(initState());
    };
  }, []);

  return (
    <div data-testid="sneaker-detail-page" className="sneaker-detail-page">
      {!loading && errors && (
        <span>
          <Alert showIcon type="error" message="Error" description={errors} style={{ margin: '24px 0px' }} />
          <Button onClick={goBack}>Back</Button>
        </span>
      )}
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
                <h1 className="sneaker-detail-page__sneaker-info-showcase__name" data-testid="sneaker-detail-page__sneaker-name">
                  {sneaker.name}
                </h1>
                <p className="sneaker-detail-page__sneaker-info-showcase__sku" data-testid="sneaker-detail-page__sku">
                  SKU: {sneaker.sku}
                </p>
              </div>
              <div className="sneaker-detail-page__sneaker-info-showcase__button-group">
                <a>Buy New - {compPrice}</a>
                <a>Buy Used - {compPrice}</a>
              </div>
            </Card.Grid>
          </Card>

          <div className="sneaker-detail-page__story">
            <h2>Product Details</h2>
            <p dangerouslySetInnerHTML={{ __html: sneaker.story_html }}></p>
          </div>
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default SneakerDetailPage;
