import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

interface props {
	placeholder: string;
	onPress?: () => void;
	value: string;
	onChangeText: (text: string) => void;
}

const SearchBar = ({ onPress, placeholder, onChangeText, value }: props) => {
	return (
		<View className='flex-row bg-dark-200 items-center rounded-full px-5 py-4'>
			<Image
				source={icons.search}
				className='size-5'
				resizeMode='contain'
				tintColor={'#AB8BFF'}
			/>

			<TextInput
				onPress={onPress}
				placeholder={placeholder}
				value={value}
				onChangeText={onChangeText}
				placeholderTextColor={'#A8B5DB'}
				className='flex-1 ml-2 text-white'
			/>
		</View>
	);
};

export default SearchBar;
