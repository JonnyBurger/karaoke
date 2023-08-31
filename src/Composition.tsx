import {Img} from 'remotion';
import {Audio} from 'remotion';
import {AbsoluteFill, staticFile} from 'remotion';
import {Bottom} from './Bottom';
import {fontSize} from './Dots';
import {Subtitles} from './Subtitles';

export const MyComposition = () => {
	return (
		<AbsoluteFill
			style={{
				fontSize,
				fontFamily: 'sans-serif',
				backgroundColor: 'black',
			}}
		>
			<AbsoluteFill>
				<Img src={staticFile('background.jpg')} />
			</AbsoluteFill>
			<Subtitles />
			<Audio src={staticFile('music.mp3')} />
			<Bottom />
		</AbsoluteFill>
	);
};
