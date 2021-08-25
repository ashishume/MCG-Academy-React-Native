import React, {useEffect, useState} from 'react';
import {API_NAME} from '../../../../API/ApiPaths';
import Axios from '../../../../API/HttpService';
import AllTestSeriesListTemplate from './AllTestSeriesListTemplate';

const AllTestSeriesList = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get(API_NAME.ALL_TEST_SERIES).then((response) => {
      setData(response.data);
    });
  }, []);

  return data?.length ? (
    <AllTestSeriesListTemplate {...props} data={data} />
  ) : null;
};

export default AllTestSeriesList;
