import React, {useEffect, useImperativeHandle, useRef} from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {Word} from './types';

const WordComp: React.ForwardRefRenderFunction<
	HTMLSpanElement,
	{
		word: Word;
		index: number;
		onWordLayout: (option: {
			x: number;
			y: number;
			width: number;
			height: number;
			index: number;
		}) => void;
	}
> = ({word, onWordLayout, index}, ref) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const timeInSeconds = frame / fps;

	const componentRef = useRef<HTMLSpanElement>(null);
	useImperativeHandle(ref, () => componentRef.current as HTMLSpanElement);

	const isShown = timeInSeconds >= word.start;

	useEffect(() => {
		const {current} = componentRef;
		if (!current) {
			return;
		}

		const observer = new ResizeObserver((entries) => {
			const layout = entries[0].contentRect;

			onWordLayout({
				x: layout.x,
				y: layout.y,
				width: layout.width,
				height: layout.height,
				index,
			});
		});

		observer.observe(current);

		return () => {
			observer.unobserve(current as HTMLSpanElement);
		};
	}, [index, onWordLayout]);

	return (
		<span
			ref={componentRef}
			style={{
				opacity: isShown ? 1 : 0.6,
				display: 'inline-block',
				whiteSpace: 'pre-wrap',
			}}
		>
			{word.word}
		</span>
	);
};

export const WordComponent = React.forwardRef(WordComp);
