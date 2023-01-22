import React, { useEffect, useState } from 'react'
import usePathfinder from '../../hooks/usePathfinder'
import Button from './button/Button'
import Dropdown from './dropdown/Dropdown'

const Filters = () => {
	const {
		allowedPathfinders,
		allowedSpeeds,
		currentPathfinder,
		UpdateCurrentPathfinder,
		currentSpeed,
		UpdateCurrentSpeed,
		GenerateMaze,
		ClearWalls,
		StartVisualizer,
	} = usePathfinder()

	useEffect(() => {})

	return (
		<nav className="filters">
			<ul className="filters__list container">
				<div className="filters__dropdowns">
					<Dropdown
						name={currentPathfinder === '' ? 'Pathfinder' : currentPathfinder}
						dropdownItems={allowedPathfinders} //array of objects {name: '', key: 0}
						itemSelected={UpdateCurrentPathfinder} //event to fire when dropdown item is selected
						currentItem={currentPathfinder} //current item for updating visuals
						offsetMultiplier={0}
					/>
					<Dropdown
						name={currentSpeed === '' ? 'Select Speed' : currentSpeed}
						dropdownItems={allowedSpeeds} //array of objects {speed: '', key: 0}
						itemSelected={UpdateCurrentSpeed} //event to fire when dropdown item is selected
						currentItem={currentSpeed} //current item for updating visuals
						offsetMultiplier={1}
					/>
				</div>
				<div className="filters__buttons">
					<Button name={'Clear Walls'} onPressed={ClearWalls} />
					<Button name={'Create Maze'} onPressed={GenerateMaze} />
					<Button
						name={'Run Visualizer'}
						color={'primary'}
						onPressed={StartVisualizer}
					/>
				</div>
			</ul>
		</nav>
	)
}

export default Filters
