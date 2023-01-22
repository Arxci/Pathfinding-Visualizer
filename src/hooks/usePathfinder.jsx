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
	}
}

export default usePathfinder
