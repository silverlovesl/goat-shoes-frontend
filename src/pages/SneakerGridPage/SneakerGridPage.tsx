import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSneakers, initState, initPagination, nextPage, setSortBy, setNameLike, setShoeCondtion } from '../../stores/features/sneakerSlice';
import { RootState } from '../../stores';
import SneakerCard from '../../components/SneakerCard/SneakerCard';
import { Sneaker, SneakSearchSortBy } from '../../models';
import { useHistory } from 'react-router-dom';
import './SneakerGridPage.scss';
import SneakerGridToolbox from './SneakerGridToolbox/SneakerGridToolbox';

type Props = {};

const SneakerGridPage: React.FC<Props> = (props) => {
  // Snecker frame div element
  const sneakerGrid = useRef(null as HTMLDivElement);
  const dispatch = useDispatch();
  const { loading, sneakers, pageNo, sortBy, limit, nameLike, shoeCondtion } = useSelector((state: RootState) => state.sneaker);
  const history = useHistory();

  const onGridScroll = () => {
    const { scrollHeight, clientHeight, scrollTop } = sneakerGrid.current;
    // Detect bottom of grid view
    if (scrollHeight - clientHeight <= scrollTop && !loading) {
      dispatch(nextPage());
    }
  };

  const onSneakerSelect = (item: Sneaker) => {
    history.push(`/sneaker/${item.id}`);
  };

  const onSortByChange = (value: SneakSearchSortBy) => {
    dispatch(initPagination());
    dispatch(setSortBy(value));
  };

  const onNameChange = (value: string) => {
    dispatch(initPagination());
    dispatch(setNameLike(value));
  };

  const onConditionChange = (value: string) => {
    dispatch(initPagination());
    dispatch(setShoeCondtion(value));
  };

  useLayoutEffect(() => {
    sneakerGrid.current.onscroll = onGridScroll;
    return () => {
      // Remove div scroll event listener
      sneakerGrid.current.onscroll = null;
    };
  });

  useEffect(() => {
    dispatch(
      fetchSneakers({
        pageNo: pageNo,
        limit: limit,
        sortBy: sortBy,
        nameLike: nameLike,
        shoeCondtion: shoeCondtion,
      })
    );
  }, [pageNo, sortBy, nameLike, shoeCondtion]);

  useEffect(() => {
    return () => {
      // Dispose store data
      dispatch(initState());
    };
  }, []);

  return (
    <div ref={sneakerGrid} className="sneaker-grid-page">
      {/* Filter,Search condition */}
      <SneakerGridToolbox defaultSortBy={sortBy} onSortBy={onSortByChange} onNameChange={onNameChange} onConditionChange={onConditionChange} />
      {/* Sneaker grid */}
      <Card>
        {sneakers.map((item) => {
          return (
            <Card.Grid key={item.id} className="sneaker-grid-page__grid-cell">
              <a onClick={() => onSneakerSelect(item)}>
                <SneakerCard item={item} />
              </a>
            </Card.Grid>
          );
        })}
      </Card>
    </div>
  );
};

export default SneakerGridPage;
