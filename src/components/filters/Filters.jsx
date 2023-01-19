import React from 'react'
import usePathfinder from '../../hooks/usePathfinder'
import Dropdown from './dropdown/Dropdown'

const Filters = () => {
	const { allowedPathfinders, currentPathfinder, UpdateCurrentPathfinder } =
		usePathfinder()

	return (
		<nav className="filters">
			<ul className="filters__list container">
				<Dropdown
					name={currentPathfinder === '' ? 'Pathfinder' : currentPathfinder}
					dropdownItems={allowedPathfinders} //array of objects {name: '', key: 0}
					itemSelected={UpdateCurrentPathfinder} //event to fire when dropdown item is selected
					currentItem={currentPathfinder} //current item for updating visuals
				/>
			</ul>
		</nav>
	)
}

export default Filters
