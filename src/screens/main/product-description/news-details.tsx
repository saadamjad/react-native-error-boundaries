/** @format */

import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Sound from 'react-native-sound';
import { Routes } from '../../../routes/index-routes';
import { ROUTES } from '../../../constants/navigation-routes';
import { useIsFocused } from '@react-navigation/native';
import Slider from '@react-native-community/slider';

const App = ({ navigation }) => {
	Sound.setCategory('Playback', true);
	const SoundComponent = () => {
		const [soundFiles, setSoundFiles] = useState([
			{
				title: 'The Boys',
				playing: false,
				url: require('./TheBoys.mp3'), // Use require to load the sound file
			},
			{
				title: 'Remix',
				playing: false,
				url: require('./Thunderremix.mp3'), // Use require to load the sound file
			},
			{
				title: 'Rain',
				playing: false,

				url: require('./Rainn.mp3'), // Use require to load the sound file
			},
			{
				title: 'Iphone',
				playing: false,
				url: require('./iphone.mp3'), // Use require to load the sound file
			},
			{
				title: 'Froq',
				playing: false,
				url: require('./frog.wav'), // Use require to load the sound file
			},
		]);
		const [filteredSounds, setFilteredSounds] = useState([]);
		const [showMessage, setShowMessage] = useState('');
		const timeoutRef = useRef(null);

		const soundRefs = useRef<Sound[]>(
			soundFiles.map(
				(file) => new Sound(file.url, '', (error) => console.log(error))
			)
		);
		const isFocused = useIsFocused();

		useEffect(() => {
			return () => {
				// Clear the pending timeout
				if (timeoutRef.current) {
					clearTimeout(timeoutRef.current);
				}
				let currentSound: any = undefined;
				soundFiles.map((item, i) => {
					console.log('====');
					currentSound = soundRefs.current[i];

					currentSound.pause();
					setSoundFiles(soundFiles);
					setFilteredSounds(filteredSounds);
					setShowMessage(false);
				});
			};
		}, [isFocused]);

		const playNextSound = (index: number) => {
			if (index >= soundFiles.length) return; // All sounds played, do nothing
			const currentSound = soundRefs.current[index];

			try {
				const updateState = soundFiles.map((val, i) => {
					if (i === index) {
						return { ...val, playing: !val.playing };
					}
					return { ...val };
				});
				setSoundFiles(updateState);
				currentSound.play((success) => {
					if (success) {
						playNextSound(index + 1);
					} else {
						console.log('Sound playback failed.');
					}
				});
			} catch (error) {
				console.log('Error playing sound:', error);
			}
		};
		const stopSound = (index) => {
			const currentSound = soundRefs.current[index];
			const updateState = soundFiles.map((val, i) => {
				if (i === index) {
					return { ...val, playing: !val.playing };
				}
				return { ...val };
			});
			currentSound.pause();
			setSoundFiles(updateState);
		};
		const soundSaved = () => {
			const res = soundFiles.filter((item, i) => {
				return item?.selected;
			});

			if (res?.length > 0) {
				setFilteredSounds(res);
				setShowMessage(`Audio Saved! \n Go to your PlayList?`);
			}
			if (!res?.length > 0) {
				setShowMessage('Please Select Voices');
			}
		};

		const nextPage = () => {
			navigation.navigate(ROUTES.MIXING, {
				playList: filteredSounds,
			});
		};
		const handleVolumeChange = (index, value) => {
			const updateVolume = soundRefs.current[index];
			updateVolume.setVolume(value);
		};

		return (
			<>
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						flexWrap: 'wrap',
						justifyContent: 'space-around',
					}}>
					{soundFiles.map((item, i) => {
						return (
							<View
								style={{
									width: '40%',
								}}>
								<TouchableOpacity
									style={{
										height: 100,
										borderWidth: 1,
										borderColor: 'gray',
										borderRadius: 10,
										flexDirection: 'row',
										alignItems: 'center',
										marginVertical: 10,
										backgroundColor: item?.selected ? 'lightblue' : 'white',
									}}
									key={i}
									onPress={() => {
										const updateState = soundFiles.map((val, index) => {
											if (i === index) {
												return { ...val, selected: !val.selected };
											}
											return { ...val };
										});
										setSoundFiles(updateState);
									}}>
									<Text style={{ flex: 1 }}> {item.title} </Text>

									<Text
										style={{
											padding: 10,
											textAlignVertical: 'center',
											borderRadius: 10,
											overflow: 'hidden',
											backgroundColor: 'lightgreen',
										}}
										onPress={() =>
											item.playing ? stopSound(i) : playNextSound(i)
										}>
										{' '}
										{item.playing ? 'STOP' : 'START'}{' '}
									</Text>
								</TouchableOpacity>
								<Slider
									value={2}
									onValueChange={(val) => handleVolumeChange(i, val)}
									minimumValue={0}
									maximumValue={1}
									step={0.05}
								/>
							</View>
						);
					})}
				</View>

				<TouchableOpacity
					style={{
						height: 100,
						width: '100%',
						borderWidth: 1,
						alignItems: 'center',
						justifyContent: 'center',
					}}
					onPress={soundSaved}>
					<Text style={{ color: 'green', fontSize: 20 }}> Save </Text>
				</TouchableOpacity>
				{showMessage?.length > 1 && (
					<TouchableOpacity
						style={{
							height: 100,
							width: '100%',
							alignItems: 'center',
							justifyContent: 'center',
						}}
						onPress={nextPage}>
						<Text style={{ color: 'green' }}>{showMessage}</Text>
					</TouchableOpacity>
				)}
			</>
		);
	};

	return <SoundComponent />;
};

export default App;
