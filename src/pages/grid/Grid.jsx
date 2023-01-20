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
				const newEle = document.createElement('div')
				newEle.classList.toggle('test')
				container.appendChild(newEle)
			})
		})
	}

	const resizeItems = () => {
		const containerWidth = document.querySelector('.grid__content').offsetWidth

		// prettier-ignore
		const h = ((containerWidth + 5 - (50*5)) / 50) -0.5

		const containerHeight =
			document.querySelector('.grid__content').offsetHeight

		// prettier-ignore
		const w = ((containerHeight + 5 - (25*5)) / 25) - 1

		const container = document.querySelector('.grid__content')

		// prettier-ignore
		container.style["grid-template-columns"] = "repeat(50, " + h + "px)"

		// prettier-ignore
		container.style["grid-template-rows"] = "repeat(25, " + w + "px)"
	}

	window.addEventListener('resize', () => resizeItems())

	useEffect(() => {
		if (grid !== []) {
			MakeGrid(itemWidth, itemHeight)
			resizeItems()
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
