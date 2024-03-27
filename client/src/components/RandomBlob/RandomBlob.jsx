import React, { useState, useEffect } from 'react';

const RandomBlob = ({ width, height }) => {
	const [blobPath, setBlobPath] = useState('');

	useEffect(() => {
		generateBlob();
	}, []);

	const generateBlob = () => {
		const numPoints = 8 + Math.floor(Math.random() * 8); // Random number of points
		const points = [];

		for (let i = 0; i < numPoints; i++) {
			const x = Math.random() * width;
			const y = Math.random() * height;
			points.push(`${x},${y}`);
		}

		// Sort points based on x coordinates to make sure the path closes smoothly
		points.sort((a, b) => parseFloat(a.split(',')[0]) - parseFloat(b.split(',')[0]));

		// Create a smooth blob path using Bezier curves
		let d = `M ${points[0]} `;
		for (let i = 1; i < numPoints - 2; i++) {
			const xAvg = (parseFloat(points[i].split(',')[0]) + parseFloat(points[i + 1].split(',')[0])) / 2;
			const yAvg = (parseFloat(points[i].split(',')[1]) + parseFloat(points[i + 1].split(',')[1])) / 2;
			d += `Q ${points[i]} ${xAvg},${yAvg} `;
		}
		d += `Q ${points[numPoints - 2]} ${points[numPoints - 1]} `;
		d += `Q ${points[0]} ${points[1]} Z`;

		setBlobPath(d);
	};

	return (
		<svg width={width} height={height}>
			<path d={blobPath} fill="currentColor" />
		</svg>
	);
};

export default RandomBlob;
