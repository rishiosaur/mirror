import React from 'react'
import useSWR from 'swr'

import useImageColor from 'use-image-color'
import { motion } from 'framer-motion'
import { fetcher } from '../src/util/fetcher'
import { hexSort } from '../src/util/hexsort'

const Div = motion.div
const Image = motion.img
const Title = motion.h1
const Subtitle = motion.h2
const Text = motion.p
const Spotify: React.FC = () => {
	const { data, error } = useSWR('/api/spotify/current', fetcher, {
		refreshInterval: 500,
	})

	const { colors } = useImageColor(data?.item.album.images[0].url, {
		cors: true,
		colors: 6,
	})
	// = usePalette(data?.item.album.images[0].url)
	// eslint-disable-next-line no-nested-ternary
	return (
		<>
			<Div
				style={{
					width: '100%',
					height: '100%',
					position: 'absolute',
					top: 0,
					left: 0,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
				animate={{
					backgroundColor:
						data?.is_playing && colors
							? hexSort.sortColors(colors, 'mostBrightColor').slice(1)
							: [
									'#f72585',
									'#b5179e',
									'#7209b7',
									'#560bad',
									'#480ca8',
									'#3a0ca3',
									'#3f37c9',
									'#4361ee',
									'#4895ef',
									'#4cc9f0',
							  ],
				}}
				transition={{
					ease: 'easeInOut',
					duration: 10,
					repeat: Infinity,
					repeatType: 'reverse',
				}}>
				<div
					style={{
						width: data?.is_playing && colors && !error ? '50%' : '35%',
						height: data?.is_playing && colors && !error ? '50%' : '35%',
						display: 'flex',
						flexDirection: 'row',

						backgroundColor: 'rgba(255, 255, 255, 0.2)',
						backdropFilter: 'blur(50px)',
						borderRadius: '5px',
						border: '1px solid rgba(255, 255, 255, 0.3)',
						boxShadow: '0 0 50px rgba(255, 255, 255, 0.1)',
					}}>
					{data?.is_playing && colors && !error && (
						<div
							style={{
								width: '50%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}>
							<img
								src={data.item.album.images[0].url}
								style={{
									width: '75%',
									borderRadius: '5px',
									border: '1px solid rgba(255, 255, 255, 0.3)',
									boxShadow: '0 0 50px rgba(255, 255, 255, 0.3)',
								}}
							/>
						</div>
					)}

					<div
						style={{
							width: '50%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							flexDirection: 'column',
						}}>
						<div style={{ width: '75%', color: 'rgba(255, 255, 255, 0.6)' }}>
							{data?.is_playing && colors && !error ? (
								<>
									<div>
										<Text style={{ marginBottom: 0 }}>
											{data.item.artists
												.map((artist) => artist.name)
												.join(' & ')}
											's
										</Text>
										<Title style={{ marginTop: 0 }}>{data.item.name}</Title>
									</div>
									<div>
										<Text style={{ margin: 0 }}>From</Text>
										<Subtitle style={{ marginTop: 0 }}>
											{data.item.album.name}
										</Subtitle>
									</div>
									<div>
										<Text style={{ margin: 0 }}>Released</Text>
										<Subtitle style={{ marginTop: 0 }}>
											{new Date(
												data.item.album.release_date
											).toLocaleDateString()}
										</Subtitle>
									</div>
									<div>
										<Text style={{ margin: 0 }}>Track</Text>
										<Subtitle style={{ marginTop: 0 }}>
											{data.item.track_number} of {data.item.album.total_tracks}
										</Subtitle>
									</div>
								</>
							) : (
								<div>
									<Text style={{ marginBottom: 0 }}>Listening to</Text>
									<Title style={{ marginTop: 0 }}>Nothing!</Title>
								</div>
							)}
						</div>
					</div>
				</div>
			</Div>
		</>
	)
}

export default Spotify

/*
{
  timestamp: 1649042161887,
  context: {
    external_urls: {
      spotify: 'https://open.spotify.com/playlist/3YhwAgjl458ZoJpYSzIT9w'
    },
    href: 'https://api.spotify.com/v1/playlists/3YhwAgjl458ZoJpYSzIT9w',
    type: 'playlist',
    uri: 'spotify:playlist:3YhwAgjl458ZoJpYSzIT9w'
  },
  progress_ms: 15834,
  item: {
    album: {
      album_type: 'album',
      artists: [Array],
      available_markets: [Array],
      external_urls: [Object],
      href: 'https://api.spotify.com/v1/albums/66uh2zByzGn6sW3mbpZTVh',
      id: '66uh2zByzGn6sW3mbpZTVh',
      images: [Array],
      name: 'Ribbons',
      release_date: '2019-04-12',
      release_date_precision: 'day',
      total_tracks: 16,
      type: 'album',
      uri: 'spotify:album:66uh2zByzGn6sW3mbpZTVh'
    },
    artists: [ [Object] ],
    available_markets: [
      'AD', 'AE', 'AG', 'AL', 'AM', 'AO', 'AR', 'AT', 'AU', 'AZ',
      'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BN',
      'BO', 'BR', 'BS', 'BT', 'BW', 'BY', 'BZ', 'CA', 'CD', 'CG',
      'CH', 'CI', 'CL', 'CM', 'CO', 'CR', 'CV', 'CW', 'CY', 'CZ',
      'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'ES',
      'FI', 'FJ', 'FM', 'FR', 'GA', 'GB', 'GD', 'GE', 'GH', 'GM',
      'GN', 'GQ', 'GR', 'GT', 'GW', 'GY', 'HK', 'HN', 'HR', 'HT',
      'HU', 'ID', 'IE', 'IL', 'IN', 'IQ', 'IS', 'IT', 'JM', 'JO',
      'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KR', 'KW', 'KZ', 'LA',
      'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY',
      ... 83 more items
    ],
    disc_number: 1,
    duration_ms: 197933,
    explicit: false,
    external_ids: { isrc: 'GBBPW1900017' },
    external_urls: {
      spotify: 'https://open.spotify.com/track/2dXAmfTnWAzuBakuyMNoMu'
    },
    href: 'https://api.spotify.com/v1/tracks/2dXAmfTnWAzuBakuyMNoMu',
    id: '2dXAmfTnWAzuBakuyMNoMu',
    is_local: false,
    name: 'Curls',
    popularity: 56,
    preview_url: 'https://p.scdn.co/mp3-preview/a54118ee153c1f05e7afff0e53f394ba69bdb792?cid=8761078e17c745f1833140283a3dbc60',
    track_number: 4,
    type: 'track',
    uri: 'spotify:track:2dXAmfTnWAzuBakuyMNoMu'
  },
  currently_playing_type: 'track',
  actions: { disallows: { resuming: true } },
  is_playing: true
}
 */
