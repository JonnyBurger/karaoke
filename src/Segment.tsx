import React, {useCallback, useState} from 'react';
import {
	AbsoluteFill,
	Img,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Dots, LayoutsState, lineHeight, padding} from './Dots';
import {Segment} from './types';
import {WordComponent} from './Word';

const InnerComponent: React.FC<{
	segment: Segment;
}> = ({segment}) => {
	const [wordRefs] = useState(() => {
		return new Array(segment.words.length)
			.fill(0)
			.map(() => React.createRef<HTMLSpanElement>());
	});

	const [layouts, setLayouts] = useState<LayoutsState>(() => {
		return new Array(segment.words.length).fill(null);
	});

	const onWordLayout = useCallback(
		({
			height,
			index,
			width,
			x,
			y,
		}: {
			x: number;
			y: number;
			width: number;
			height: number;
			index: number;
		}) => {
			setLayouts((layouts) => {
				return layouts.map((layout, i) => {
					if (i !== index) {
						return layout;
					}

					return {
						x,
						y,
						width,
						height,
					};
				});
			});
		},
		[]
	);

	return (
		<AbsoluteFill
			style={{
				fontWeight: 'bold',
				lineHeight,
				padding,
			}}
		>
			<Dots layouts={layouts} words={segment.words} />
			<div>
				{segment.words.map((word, i) => {
					return (
						<WordComponent
							ref={wordRefs[i]}
							key={i}
							index={i}
							word={word}
							onWordLayout={onWordLayout}
						/>
					);
				})}
			</div>
		</AbsoluteFill>
	);
};

export const SegmentComp: React.FC<{
	segment: Segment;
}> = ({segment}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const timeInSeconds = frame / fps;
	const {start, end} = segment;

	if (timeInSeconds < start || timeInSeconds > end) {
		return null;
	}

	return <InnerComponent segment={segment} />;
};
