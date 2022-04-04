import { NextApiRequest, NextApiResponse } from 'next'
import { baseSpotifyApi, spotify } from '../../../src/util/token'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const response = await spotify(
		'https://api.spotify.com/v1/me/player/currently-playing'
	)

	const json = await response.json()
	console.log(json)

	res.json(json)
}

export default handler
