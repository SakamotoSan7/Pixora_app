import React from 'react';
import { StatusBar, Text, View } from 'react-native';

const MovieDetails = () => {
	return (
		<>
			<StatusBar
				hidden={true}
				animated={true}
				showHideTransition={'slide'}
			/>

			<View>
				<Text>MovieDetails</Text>
			</View>
		</>
	);
};

export default MovieDetails;
