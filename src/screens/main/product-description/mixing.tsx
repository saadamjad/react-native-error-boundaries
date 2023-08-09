/** @format */

// /** @format */

// import React, { Component } from 'react';

// import {
// 	StyleSheet,
// 	Text,
// 	TouchableOpacity,
// 	View,
// 	ScrollView,
// 	Alert,
// } from 'react-native';
// import Sound from 'react-native-sound';

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 	},
// 	scrollContainer: {},
// 	title: {
// 		fontSize: 20,
// 		fontWeight: 'bold',
// 		paddingTop: 30,
// 		padding: 20,
// 		textAlign: 'center',
// 		backgroundColor: 'rgba(240,240,240,1)',
// 	},
// 	button: {
// 		fontSize: 20,
// 		backgroundColor: 'rgba(220,220,220,1)',
// 		borderRadius: 4,
// 		borderWidth: 1,
// 		borderColor: 'rgba(80,80,80,0.5)',
// 		overflow: 'hidden',
// 		padding: 7,
// 	},
// 	header: {
// 		textAlign: 'left',
// 	},
// 	feature: {
// 		flexDirection: 'row',
// 		padding: 10,
// 		alignSelf: 'stretch',
// 		alignItems: 'center',
// 		borderTopWidth: 1,
// 		borderTopColor: 'rgb(180,180,180)',
// 		borderBottomWidth: 1,
// 		borderBottomColor: 'rgb(230,230,230)',
// 	},
// });

// const Button = ({ title, onPress }) => (
// 	<TouchableOpacity onPress={onPress}>
// 		<Text style={styles.button}>{title}</Text>
// 	</TouchableOpacity>
// );

// const Header = ({ children, style }) => (
// 	<Text style={[styles.header, style]}>{children}</Text>
// );

// const Feature = ({ title, onPress, buttonLabel = 'PLAY', status }: any) => (
// 	<View style={styles.feature}>
// 		<Header style={{ flex: 1 }}>{title}</Header>
// 		{status ? (
// 			<Text style={{ padding: 5 }}>{resultIcons[status] || ''}</Text>
// 		) : null}
// 		<Button
// 			title={buttonLabel}
// 			onPress={onPress}
// 		/>
// 	</View>
// );

// const resultIcons = {
// 	'': '',
// 	pending: '?',
// 	playing: '\u25B6',
// 	win: '\u2713',
// 	fail: '\u274C',
// };

// const audioTests = [
// 	// {
// 	// 	title: 'mp3 in bundle',
// 	// 	url:advertising.mp3',
// 	// 	basePath: Sound.MAIN_BUNDLE,
// 	// },
// 	// {
// 	// 	title: 'mp3 in bundle (looped)',
// 	// 	url: require('advertising.mp3'),
// 	// 	isRequire: true,
// 	// 	// basePath: Sound.MAIN_BUNDLE,
// 	// 	onPrepared: (sound, component) => {
// 	// 		sound.setNumberOfLoops(-1);
// 	// 		component.setState({ loopingSound: sound });
// 	// 	},
// 	// },
// {
// 	title: 'mp3 via require()',
// 	isRequire: true,
// 	url: require('advertising.mp3'),
// },
// 	{
// 		title: 'mp3 remote download',
// 		url: 'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3',
// 	},

// 	{
// 		title: 'aac remote download',
// 		url: 'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/pew2.aac',
// 	},
// 	{
// 		title: 'wav remote download',
// 		url: 'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/frog.wav',
// 	},
// ];

// function setTestState(testInfo, component, status) {
// 	component.setState({
// 		tests: { ...component.state.tests, [testInfo.title]: status },
// 	});
// }

// /**
//  * Generic play function for majority of tests
//  */
// function playSound(testInfo, component) {
// 	setTestState(testInfo, component, 'pending');
// 	console.log('play');

// 	const callback = (error, sound) => {
// 		if (error) {
// 			Alert.alert('error', error.message);
// 			setTestState(testInfo, component, 'fail');
// 			return;
// 		}
// 		setTestState(testInfo, component, 'playing');
// 		// Run optional pre-play callback
// 		console.log('playing');

// 		testInfo.onPrepared && testInfo.onPrepared(sound, component);
// 		sound.play(() => {
// 			// Success counts as getting to the end
// 			setTestState(testInfo, component, 'win');
// 			// Release when it's done so we're not using up resources
// 			sound.release();
// 		});
// 		sound.playback;
// 	};

// 	// If the audio is a 'require' then the second parameter must be the callback.
// 	if (testInfo.isRequire) {
// 		const sound = new Sound(testInfo.url, (error) => callback(error, sound));
// 	}
// }

// class MainView extends Component {
// 	[x: string]: any;
// 	constructor(props) {
// 		super(props);

// 		Sound.setCategory('Playback', true); // true = mixWithOthers

// 		// Special case for stopping
// 		this.stopSoundLooped = () => {
// 			if (!this.state.loopingSound) {
// 				return;
// 			}

// 			this.state.loopingSound.stop().release();
// 			this.setState({
// 				loopingSound: null,
// 				tests: { ...this.state.tests, ['mp3 in bundle (looped)']: 'win' },
// 			});
// 		};

// 		this.state = {
// 			loopingSound: undefined,
// 			tests: {},
// 		};
// 	}

// 	render() {
// 		return (
// 			<View style={styles.container}>
// 				<Header style={styles.title}>react-native-sound-demo</Header>
// 				<ScrollView
// 					style={styles.container}
// 					contentContainerStyle={styles.scrollContainer}>
// 					{audioTests.map((testInfo) => {
// 						return (
// 							<Feature
// 								status={this.state.tests[testInfo.title]}
// 								key={testInfo.title}
// 								title={testInfo.title}
// 								onPress={() => {
// 									return playSound(testInfo, this);
// 								}}
// 							/>
// 						);
// 					})}
// 					<Feature
// 						title='mp3 in bundle (looped)'
// 						buttonLabel={'STOP'}
// 						onPress={this.stopSoundLooped}
// 					/>
// 				</ScrollView>
// 			</View>
// 		);
// 	}
// }

// export default MainView;

import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound';

const App = ({ route }) => {
	Sound.setCategory('Playback', true);
	const getPlaylist = route?.params?.playList;

	console.log(getPlaylist);
	const SoundComponent = () => {
		const [soundFiles, setSoundFiles] = useState([...getPlaylist]);

		const soundRefs = useRef<Sound[]>(
			soundFiles.map(
				(file) => new Sound(file.url, '', (error) => console.log(error))
			)
		);

		useEffect(() => {
			setTimeout(() => {
				soundFiles.map((item, i) => playNextSound(i));
			}, 1000);
		}, []);
		const isFocused = useIsFocused();

		useEffect(() => {
			return () => {
				// Clear the pending timeout

				// Stop the currently playing sound and release resources when component unmounts
				let currentSound: any = undefined;
				soundFiles.map((item, i) => {
					currentSound = soundRefs.current[i];

					currentSound.pause();
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

		return (
			<>
				<Text
					style={{ fontSize: 20, textAlign: 'center', paddingVertical: 40 }}>
					{' '}
					YOUR MIXING PLAYLIST{' '}
				</Text>
				{soundFiles.map((item, i) => {
					return (
						<TouchableOpacity
							style={{
								height: 100,
								width: '100%',
								borderBottomWidth: 1,
								flexDirection: 'row',
								alignItems: 'center',
							}}
							key={i}
							onPress={() => (item.playing ? stopSound(i) : playNextSound(i))}>
							<Text style={{ flex: 1 }}> {item.title} </Text>

							<Text
								style={{
									borderRadius: 10,
									overflow: 'hidden',
									padding: 10,
									textAlignVertical: 'center',
									backgroundColor: 'lightgreen',
								}}>
								{' '}
								{item.playing ? 'STOP' : 'START'}{' '}
							</Text>
						</TouchableOpacity>
					);
				})}
			</>
		);
	};

	return <SoundComponent />;
};

export default App;
