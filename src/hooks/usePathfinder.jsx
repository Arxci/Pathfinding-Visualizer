import React, { useState } from 'react'

const usePathfinder = () => {
	const allowedPathfinders = [
		{ name: 'A Star', key: 0 },
		{ name: "Dijkstra's", key: 1 },
	]
	const [currentPathfinder, setCurrentPathfinder] = useState('')

	const UpdateCurrentPathfinder = (newPathfinder) => {
		console.log(newPathfinder)
		setCurrentPathfinder(newPathfinder)
	}

	return { allowedPathfinders, currentPathfinder, UpdateCurrentPathfinder }
}

export default usePathfinder
