import React, { useEffect, useState } from 'react'

const usePathfinder = () => {
	const [currentPathfinder, setCurrentPathfinder] = useState('')
	const [currentSpeed, setCurrentSpeed] = useState('')
	const [grid, setGrid] = useState([])
	const [numOfRows, setNumOfRows] = useState(0)

	const numOfCols = 50

	const allowedPathfinders = [
		{ name: 'A Star', key: 0 },
		{ name: "Dijkstra's", key: 1 },
	]

	const allowedSpeeds = [
		{ name: 'Slow', key: 0 },
		{ name: 'Medium', key: 1 },
		{ name: 'Fast', key: 2 },
	]

	const UpdateCurrentPathfinder = (newPathfinder) => {
		setCurrentPathfinder(newPathfinder)
	}

	const UpdateCurrentSpeed = (newSearchSpeed) => {
		setCurrentSpeed(newSearchSpeed)
	}

	function ClearWalls() {
		const gridContent = document.querySelector('.grid__content').children
		for (let i = 0; i < grid.length; i++) {
			for (let j = 0; j < grid[i].length; j++) {
				const temp = numOfCols * i + j
				if (gridContent[temp].className === 'grid__item wall') {
					gridContent[temp].className = 'grid__item'
				}
			}
		}
	}

	function Partition(h, minX, maxX, minY, maxY) {
		if (h) {
			if (maxX - minX < 2) {
				return
			}

			var y = Math.floor(randomNumber(minY, maxY) / 2) * 2
			addHWall(minX, maxX, y)

			Partition(!h, minX, maxX, minY, y - 1)
			Partition(!h, minX, maxX, y + 1, maxY)
		} else {
			if (maxY - minY < 2) {
				return
			}

			var x = Math.floor(randomNumber(minX, maxX) / 2) * 2
			addVWall(minY, maxY, x)

			Partition(!h, minX, x - 1, minY, maxY)
			Partition(!h, x + 1, maxX, minY, maxY)
		}
	}

	function addHWall(minX, maxX, y) {
		var hole = Math.floor(randomNumber(minX, maxX) / 2) * 2 + 1
		const gridContent = document.querySelector('.grid__content').children

		for (var i = minX; i <= maxX; i++) {
			if (i !== hole) {
				const temp = numOfCols * y + i
				if (gridContent[temp].className === 'grid__item') {
					gridContent[temp].className = 'grid__item wall'
				}
			}
		}
	}

	function addVWall(minY, maxY, x) {
		var hole = Math.floor(randomNumber(minY, maxY) / 2) * 2 + 1
		const gridContent = document.querySelector('.grid__content').children

		for (var i = minY; i <= maxY; i++) {
			if (i !== hole) {
				const temp = numOfCols * i + x
				if (gridContent[temp].className === 'grid__item') {
					gridContent[temp].className = 'grid__item wall'
				}
			}
		}
	}

	function randomNumber(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

	function GenerateMaze() {
		ClearWalls()
		const gridContent = document.querySelector('.grid__content').children

		//Generate edges
		for (let i = 0; i < grid.length; i++) {
			for (let j = 0; j < grid[i].length; j++) {
				if (i === 0 || i === numOfRows - 1 || j === 0 || j === numOfCols - 1) {
					const temp = numOfCols * i + j
					if (gridContent[temp].className === 'grid__item') {
						gridContent[temp].className = 'grid__item wall'
					}
				}
			}
		}

		Partition(true, 1, numOfCols - 2, 1, numOfRows - 2)
	}

	//generate grid
	useEffect(() => {
		let temp = []
		for (let i = 0; i < numOfRows; i++) {
			temp.push([])
			for (let j = 0; j < numOfCols; j++) {
				temp[i].push({
					f: Infinity,
					h: 0,
					g: Infinity,
					neighbors: 0,
					previous: 0,
				})
			}
		}
		setGrid(temp)
	}, [numOfCols, numOfRows, setGrid])

	// update grid cell size
	useEffect(() => {
		var gridContent = document.querySelector('.grid__content')

		var gap = parseFloat(
			window.getComputedStyle(gridContent, null).getPropertyValue('gap')
		)
		gap = Math.floor(gap)
		var minW = parseFloat(
			window
				.getComputedStyle(gridContent, null)
				.getPropertyValue('grid-template-rows')
		)

		var Wc = document.querySelector('.grid__content').offsetHeight
		setNumOfRows(Math.floor((Wc + gap) / (minW + gap)))

		window.addEventListener('resize', function () {
			Wc = document.querySelector('.grid__content').offsetHeight
			minW = parseFloat(
				window
					.getComputedStyle(gridContent, null)
					.getPropertyValue('grid-template-rows')
			)
			setNumOfRows(Math.floor((Wc + gap) / (minW + gap)))
		})
	}, [setNumOfRows])

	useEffect(() => {}, [numOfRows])

	return {
		allowedPathfinders,
		allowedSpeeds,
		currentPathfinder,
		UpdateCurrentPathfinder,
		currentSpeed,
		UpdateCurrentSpeed,
		grid,
		numOfCols,
		numOfRows,
		GenerateMaze,
		ClearWalls,
	}
}

export default usePathfinder
