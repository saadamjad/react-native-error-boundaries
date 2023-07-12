/** @format */

import React from 'react';
import { View, FlatList } from 'react-native';
import { staticText } from '../../../utils/staticTexts';
import {
	Header,
	AppLoader,
	ProductCard,
	NewSelectionBar,
} from '../../../components';
import { useSelector } from 'react-redux';
import {
	getNewsData,
	isLoading,
} from '../../../state/selectors/features/category';

const ProductList = ({ navigation }: ProductListProps) => {
	const news = useSelector(getNewsData);
	const isLoader = useSelector(isLoading);

	const renderItem = ({ item }: { item: Product }) => {
		return (
			<ProductCard
				item={item}
				navigation={navigation}
			/>
		);
	};
	const renderLoader = () => {
		if (isLoader) {
			return (
				<View testID='appLoaderComponent'>
					<AppLoader isActive />
				</View>
			);
		}
	};

	const renderFilterBar = () => {
		return <NewSelectionBar testID='parentContainerFilter' />;
	};

	const renderHeader = () => (
		<Header
			testID='headerComponent'
			headerText={staticText.TOP_NEWS}
		/>
	);
	return (
		<View testID='productParentComponent'>
			{renderHeader()}
			{renderFilterBar()}
			{renderLoader()}
			<FlatList
				testID='flatListComponent'
				showsVerticalScrollIndicator={false}
				data={news}
				renderItem={renderItem}
			/>
		</View>
	);
};

export default React.memo(ProductList);
