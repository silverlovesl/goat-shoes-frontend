import { Button } from 'antd';
import React from 'react';
import { Sneaker } from '../../models';
import { StringUtils } from '../../utils';
import './SneakerCard.scss';

type Props = {
  item: Sneaker;
};

const SneakerCard: React.FC<Props> = (props) => {
  const { item } = props;

  const compPrice = <span>¥{StringUtils.formatAmount(item.retail_price_cents)}</span>;

  return (
    <div className="sneaker-card">
      <div className="sneaker-card__header">
        <h3>{item.release_year}</h3>
        <Button size="small">Want</Button>
      </div>
      <div className="sneaker-card__body">
        {item.has_picture && <img src={item.grid_picture_url} />}
        <div className="sneaker-card__name">{item.name}</div>
        <div className="sneaker-card__price">{item.retail_price_cents && compPrice}</div>
      </div>
    </div>
  );
};

export default SneakerCard;
