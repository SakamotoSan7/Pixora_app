import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const Search = () => {
	const [searchQuery, setSearchQuery] = useState('');

	const {
		data: movies,
		loading: moviesLoading,
		error: moviesError,
		refetch: loadMovies,
		reset,
	} = useFetch(() => {
		return fetchMovies({ query: searchQuery });
	}, false);

	useEffect(() => {
		const timeoutId = setTimeout(async () => {
			if (searchQuery.trim()) {
				await loadMovies();
			} else {
				reset();
			}
		}, 600);

		return () => clearTimeout(timeoutId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchQuery]);

	return (
		<View className='bg-primary flex-1'>
			<Image
				className='flex-1 absolute z-0 w-full'
				source={images.bg}
				resizeMode='cover'
			/>

			<FlatList
				data={movies}
				renderItem={({ item }) => <MovieCard {...item} />}
				keyExtractor={(item) => item.id.toString()}
				className='px-5'
				numColumns={3}
				columnWrapperStyle={{
					justifyContent: 'flex-start',
					gap: 20,
					paddingRight: 5,
					marginBottom: 10,
				}}
				contentContainerStyle={{ paddingBottom: 100 }}
				ListHeaderComponent={
					<>
						<View className='justify-center mt-16 flex-row w-full items-center'>
							<Image
								source={icons.logo}
								className='w-24 h-16'
							/>
						</View>

						<View className='my-5'>
							<SearchBar
								value={searchQuery}
								placeholder='Search movies ...'
								onChangeText={(text: string) =>
									setSearchQuery(text)
								}
							/>
						</View>

						{moviesLoading && (
							<ActivityIndicator
								size={'large'}
								color={'#0000FF'}
								className='my-3'
							/>
						)}

						{moviesError && (
							<Text className='text-red-500 px-5 my-3'>
								Error: {moviesError.message}
							</Text>
						)}

						{!moviesError &&
							!moviesLoading &&
							searchQuery.trim() &&
							movies?.length > 0 && (
								<Text className='text-xl text-white font-bold mb-5'>
									Search result for{' '}
									<Text className='text-accent'>
										{searchQuery}
									</Text>
								</Text>
							)}
					</>
				}
				ListEmptyComponent={
					!moviesLoading && !moviesError ? (
						<View className='mt-10 px-5'>
							<Text className='text-center text-gray-500'>
								{searchQuery.trim()
									? 'No movies found'
									: 'Search for a movie'}
							</Text>
						</View>
					) : null
				}
			/>
		</View>
	);
};

export default Search;
