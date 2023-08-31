import {getAudioDurationInSeconds} from '@remotion/media-utils';
import {Composition, staticFile} from 'remotion';
import {MyComposition} from './Composition';

const fps = 30;

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="MyComp"
				component={MyComposition}
				fps={fps}
				calculateMetadata={async () => {
					const duration = await getAudioDurationInSeconds(
						staticFile('music.mp3')
					);
					return {
						durationInFrames: Math.round(duration * fps),
					};
				}}
				width={1280}
				height={720}
			/>
		</>
	);
};
