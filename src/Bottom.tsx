import React from 'react';
import {AbsoluteFill} from 'remotion';
import {AudioViz} from './AudioViz';
import {padding} from './Dots';

export const Bottom: React.FC = () => {
	return (
		<AbsoluteFill>
			<div
				style={{
					position: 'absolute',
					bottom: padding / 2,
					left: padding + 22,
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'flex-end',
				}}
			>
				<AudioViz />
				<h1
					style={{
						color: 'white',
						fontSize: 40,
						marginBottom: 0,
						marginLeft: 20,
					}}
				>
					NEFFEX - Grateful
				</h1>
			</div>
		</AbsoluteFill>
	);
};
