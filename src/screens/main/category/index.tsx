/** @format */

import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, PermissionsAndroid, Button } from 'react-native';
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
import Contacts from 'react-native-contacts';

const ProductList = ({ navigation }: ProductListProps) => {
	const news = useSelector(getNewsData);
	const isLoader = useSelector(isLoading);
	const [contact, setContacts] = useState([]);

	const renderItem = ({ item, index }: { item: Product }) => {
		// console.log('===', item?.phoneNumbers[0]?.number);
		// console.log('===11', index);
		if (contact?.length >= 1) {
			return (
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						height: 70,
						borderBottomWidth: 1,
						paddingHorizontal: 10,
					}}>
					<View
						style={{
							height: 40,
							width: 40,
							borderRadius: 40,
							backgroundColor: 'gray',
						}}></View>
					<View style={{ paddingHorizontal: 10 }}>
						<Text style={{ fontSize: 20 }}> {item.givenName} </Text>
						<Text style={{ fontSize: 20 }}>
							{item?.phoneNumbers[0]?.number}{' '}
						</Text>
					</View>
				</View>
			);
		}
		// else {
		// 	return (
		// 		<Button
		// 			title='Import Contacts'
		// 			onPress={importContacts}
		// 		/>
		// 	);
		// }
		// return (
		// 	<ProductCard
		// 		item={item}
		// 		navigation={navigation}
		// 	/>
		// );
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
			headerText={'contacts'}
		/>
	);

	const requestContactsPermission = async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
				{
					title: 'Contacts Permission',
					message: 'This app requires access to your contacts.',
					buttonNeutral: 'Ask Me Later',
					buttonNegative: 'Cancel',
					buttonPositive: 'OK',
				}
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log('Contacts permission granted');
			} else {
				console.log('Contacts permission denied');
			}
		} catch (error) {
			console.log('Error requesting contacts permission:', error);
		}
	};
	useEffect(() => {
		// requestContactsPermission();
	}, []);

	const importContacts = () => {
		Contacts.getAll()
			.then((contacts) => {
				console.log('Contacts:', contacts);
				setContacts(contacts);
			})
			.catch((error) => {
				console.log('Error importing contacts:', error);
			});
	};
	return (
		<View testID='productParentComponent'>
			{renderHeader()}
			{renderLoader()}
			{contact?.length === 0 && (
				<Button
					title='Import Contacts'
					onPress={importContacts}
				/>
			)}
			<FlatList
				testID='flatListComponent'
				showsVerticalScrollIndicator={false}
				data={contact}
				renderItem={renderItem}
			/>
		</View>
	);
};

export default React.memo(ProductList);
