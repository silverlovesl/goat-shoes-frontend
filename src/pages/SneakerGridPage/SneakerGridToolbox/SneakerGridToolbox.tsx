import React, { useState } from 'react';
import { Divider, Input, Radio, Select } from 'antd';
import { ShoeCondition, SneakSearchSortBy } from '../../../models';
import './SneakerGridToolbox.scss';

const { Option } = Select;

type Props = {
  searchResultCount?: number;
  defaultSortBy: SneakSearchSortBy;
  className?: string;
  onNameChange?: (name: string) => void;
  onChange?: (name: string) => void;
  onSortBy?: (sortBy: SneakSearchSortBy) => void;
  onConditionChange?: (values: string) => void;
};

const SneakerGridToolbox: React.FC<Props> = (props) => {
  const [showFilter, setShowFilter] = useState(false);

  const onSortBy = (value: SneakSearchSortBy) => {
    props.onSortBy?.call(this, value);
  };

  const onConditionChange = (value: ShoeCondition | null) => {
    props.onConditionChange?.call(this, value);
  };

  return (
    <div className="sneaker-grid-toolbox">
      <div className="sneaker-grid-toolbox__wrapper">
        <a className="sneaker-grid-toolbox__filter-btn" onClick={() => setShowFilter(!showFilter)}>
          <span>{!showFilter ? 'Show Filters' : 'Hide Filters'}</span>
          <span>&gt;</span>
        </a>
        <span className="sneaker-grid-toolbox__search-result">
          Showing {props.searchResultCount} {props.searchResultCount > 1 ? 'Results' : 'Result'}
        </span>
        <div className="sneaker-grid-toolbox__sort-by">
          <span>Sort By:</span>
          <Select defaultValue={props.defaultSortBy} className="sneaker-grid-toolbox__sort-by-box" onSelect={onSortBy}>
            <Option value="release-date-O">Release Date(Oldest-Newest)</Option>
            <Option value="release-date-N">Release Date(Newest-Oldest)</Option>
            <Option value="price-L">Price(Low-Hight)</Option>
            <Option value="price-H">Price(Hight-Low)</Option>
          </Select>
        </div>
      </div>
      {showFilter && (
        <div className="sneaker-grid-toolbox__filter">
          <div className="sneaker-grid-toolbox__filter__name">
            <Input addonBefore="Shoe name like" onInput={(e: any) => props.onNameChange?.call(this, e.target.value)} />
          </div>
          <Divider style={{ margin: '0' }} />
          <div className="sneaker-grid-toolbox__filter__shoe-condition">
            <label>Shoe Condition:</label>
            <Radio.Group defaultValue={''} size="small" buttonStyle="solid" onChange={(e) => onConditionChange(e.target.value)}>
              <Radio.Button value={''}>All</Radio.Button>
              <Radio.Button value="used">Used</Radio.Button>
              <Radio.Button value="new_no_defects">New With Defects</Radio.Button>
            </Radio.Group>
          </div>
        </div>
      )}
    </div>
  );
};

export default SneakerGridToolbox;
