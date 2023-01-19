import React, { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const Dropdown = ({ name, dropdownItems, itemSelected, currentItem }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [dropdownClass, setDropdownClass] = useState('dropdown__items has-fade')
	const [arrowDirection, setArrowDirection] = useState('')

	const OnToggle = (e) => {
		if (isOpen) {
			OnClose()
		} else {
			OnOpen()
		}
	}

	const OnOpen = () => {
		setDropdownClass('dropdown__items has-fade fade-in')
		setArrowDirection('rotate-forward')
		setIsOpen(true)
	}

	const OnClose = () => {
		setIsOpen(false)
		setArrowDirection('rotate-back')
		setDropdownClass('dropdown__items has-fade fade-out')
	}

	return (
		<div className="dropdown">
			<button
				className="dropdown__btn"
				onClick={(e) => OnToggle(e)}
				onBlur={() => OnClose()}
			>
				<div className="dropdown__name">
					<p>{name}</p>
					<KeyboardArrowDownIcon
						className={'dropdown__icon ' + arrowDirection}
					/>
				</div>
			</button>
			<div id="items" className={dropdownClass}>
				<ul className="dropdown__list">
					{dropdownItems.map((item) => (
						<li
							onClick={() => itemSelected(item.name)}
							key={item.key}
							className={
								currentItem === item.name
									? 'dropdown__item active'
									: 'dropdown__item'
							}
						>
							<p>{item.name}</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

Dropdown.defaultProps = {
	name: 'Dropdown',
	dropdownItems: [
		{ name: 'Dropdown One', key: 0 },
		{ name: 'Dropdown Two', key: 1 },
		{ name: 'Dropdown Three', key: 2 },
	],
}

export default Dropdown
