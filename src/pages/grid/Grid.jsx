import React, { useEffect } from 'react'
import usePathfinder from '../../hooks/usePathfinder'

const Grid = () => {
	const { grid, itemHeight, itemWidth } = usePathfinder()

	const MakeGrid = (w, h) => {
		const container = document.querySelector('.grid__content')

		var child = container.lastElementChild
		while (child) {
			container.removeChild(child)
			child = container.lastElementChild
		}

		grid.forEach((row) => {
			row.forEach((col) => {
				const newEle = document.createElement('span')
				newEle.classList.toggle('test')
				container.appendChild(newEle)
			})
		})
	}

	useEffect(() => {
		if (grid !== []) {
			MakeGrid()
		}
	}, [grid])

	return (
		<div className="grid">
			<div className="grid__container container">
				<div className="grid__content"></div>
			</div>
		</div>
	)
}

export default Grid
