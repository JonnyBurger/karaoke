import React, {useEffect, useState} from 'react';
import {AbsoluteFill, staticFile} from 'remotion';
import {SegmentComp} from './Segment';
import {WhisperResponse} from './types';

export const Subtitles: React.FC = () => {
	const [subtitles, setSubtitles] = useState<WhisperResponse | null>(null);

	useEffect(() => {
		fetch(staticFile('music.json'))
			.then((res) => res.json())
			.then((data) => {
				setSubtitles(data);
			});
	}, []);

	if (subtitles === null) {
		return null;
	}

	return (
		<AbsoluteFill
			style={{
				color: 'white',
			}}
		>
			{subtitles.segments.map((segment) => {
				return <SegmentComp key={segment.id} segment={segment} />;
			})}
		</AbsoluteFill>
	);
};
