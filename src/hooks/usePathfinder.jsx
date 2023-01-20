import React, { useEffect, useState } from 'react'

const usePathfinder = () => {
	const [currentPathfinder, setCurrentPathfinder] = useState('')
	const [currentSpeed, setCurrentSpeed] = useState('')
	const [grid, setGrid] = useState([])

	const numOfRows = 25
	const numOfCols = 50
	const itemHeight = 20
	const itemWidth = 20

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
	}, [])

	return {
		allowedPathfinders,
		allowedSpeeds,
		currentPathfinder,
		UpdateCurrentPathfinder,
		currentSpeed,
		UpdateCurrentSpeed,
		grid,
		itemHeight,
		itemWidth,
	}
}

export default usePathfinder
