/* eslint-disable react/no-multi-comp */
import React from 'react';

import {AppConfigLoader} from './components';


const App = () => {
  return (<AppConfigLoader />
	);
};

export default React.memo(App);
