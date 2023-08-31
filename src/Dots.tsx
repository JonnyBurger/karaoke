import {interpolate, spring, useCurrentFrame} from 'remotion';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import React, {useMemo} from 'react';
import {Word} from './types';

type Layout = {
	x: number;
	y: number;
	width: number;
	height: number;
};

type Difference = {
	x: number;
	y: number;
};

export const fontSize = 70;
export const lineHeight = 2;
export const dotSize = 20;
export const transitionDuration = 10;

export type LayoutsState = (Layout | null)[];
export const padding = 100;

export const Dots: React.FC<{
	layouts: LayoutsState;
	words: Word[];
}> = ({layouts, words}) => {
	const {width} = useVideoConfig();
	const hasAllLayouts = layouts.every((layout) => layout !== null);
	const maximumLineWidth = width - padding * 2;

	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const positions = useMemo(() => {
		return layouts.map((layout, i) => {
			let x = padding;
			let y = padding;

			let lineWidths = 0;
			words.forEach((word, idx) => {
				const isShown = idx <= i;
				if (!isShown) {
					return 0;
				}
				lineWidths += layouts[idx]?.width as number;

				const previousWord = layouts[idx - 1];

				const nextWordIsShown = idx + 1 <= i;

				if (previousWord) {
					x += previousWord.width;
				}

				if (lineWidths >= maximumLineWidth) {
					lineWidths = layouts[idx]?.width as number;
					x = padding;
					y += fontSize * lineHeight;
				}

				if (!nextWordIsShown) {
					x += (layouts[idx]?.width as number) / 2;
				}
			});
			return {x, y, word: words[i]};
		});
	}, [layouts, maximumLineWidth, words]);

	const differences = useMemo(() => {
		const arr: Difference[] = [];
		positions.forEach((position, i) => {
			if (i === 0) {
				return;
			}
			const previousPosition = positions[i - 1];
			const difference = {
				x: position.x - previousPosition.x,
				y: position.y - previousPosition.y,
			};
			arr.push(difference);
		});
		return arr;
	}, [positions]);

	const currentPosition = useMemo(() => {
		let {x, y} = positions[0];

		for (let i = 1; i < words.length; i++) {
			const layout = layouts[i];
			if (!layout) {
				continue;
			}

			const spr = spring({
				fps,
				frame,
				config: {
					damping: 200,
				},
				durationInFrames: transitionDuration,
				delay: words[i].start * fps - transitionDuration / 2,
			});
			const curvature = -30 * Math.sin(spr * Math.PI);

			x += spr * (differences[i - 1]?.x as number);
			y += spr * (differences[i - 1]?.y as number) + curvature;
		}

		return {x, y};
	}, [differences, fps, frame, layouts, positions, words]);

	return (
		<AbsoluteFill>
			{hasAllLayouts ? (
				<div
					style={{
						backgroundColor: 'white',
						height: dotSize,
						width: dotSize,
						borderRadius: dotSize / 2,
						position: 'absolute',
						left: currentPosition.x - dotSize / 2,
						top: currentPosition.y,
					}}
				/>
			) : null}
		</AbsoluteFill>
	);
};
