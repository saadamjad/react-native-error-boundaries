/** @format */

import { combineReducers } from 'redux';
import { categoryEntityReducer } from './category';

const featuresReducer = combineReducers({
	category: categoryEntityReducer,
});

export { featuresReducer };
