import React, { useEffect } from 'react'
import usePathfinder from '../../hooks/usePathfinder'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const Grid = () => {
	const { grid, numOfRows } = usePathfinder()

	function HandleWallPlacement(e) {
		if (
			e.buttons === 1 &&
			e.shiftKey &&
			(e.target.className === 'grid__item' ||
				e.target.className === 'grid__item wall')
		) {
			e.target.classList.toggle('wall')
		}
	}

	function PlaceStartNode(e) {
		const start = document.createElement('i')
		start.classList.add('fa-solid')
		start.classList.add('fa-arrow-right')
		start.classList.add('grid__item__start')
		e.classList.add('start')
		e.appendChild(start)
	}

	function HandleStartPlacement(e) {
		if (e.buttons === 1 && e.target.className === 'grid__item') {
			const start = document.querySelector('.grid__item__start')
			if (start) {
				start.parentElement.classList.remove('start')
				start.parentElement.removeChild(start)
			}
			PlaceStartNode(e.target)
		}
	}

	function ItemClicked(e) {
		if (e.shiftKey && e.buttons) {
			HandleWallPlacement(e)
		} else if (e.buttons) {
			HandleStartPlacement(e)
		}
	}

	const MakeGrid = () => {
		const container = document.querySelector('.grid__content')

		var child = container.lastElementChild
		while (child) {
			container.removeChild(child)
			child = container.lastElementChild
		}

		var rowCount = 0
		var colCount = 0

		grid.forEach((row) => {
			colCount = 0
			row.forEach((col) => {
				const newEle = document.createElement('span')
				newEle.classList.toggle('grid__item')
				newEle.addEventListener('mousedown', (e) => ItemClicked(e))
				newEle.addEventListener('mouseover', (e) => HandleWallPlacement(e))
				if (rowCount === Math.floor(numOfRows / 2) && colCount === 8) {
					PlaceStartNode(newEle)
				}

				container.appendChild(newEle)
				colCount++
			})
			rowCount++
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
