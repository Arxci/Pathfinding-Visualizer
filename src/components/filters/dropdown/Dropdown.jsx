import React, { useEffect, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const Dropdown = ({
	name,
	dropdownItems,
	itemSelected,
	currentItem,
	offsetMultiplier,
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [dropdownClass, setDropdownClass] = useState('_')
	const [arrowDirection, setArrowDirection] = useState('')

	const OnToggle = (e) => {
		if (isOpen) {
			OnClose()
		} else {
			OnOpen()
		}
	}

	const OnOpen = () => {
		if (!isOpen) {
			setIsOpen(true)
			setDropdownClass('fade-in')
			setArrowDirection('rotate-forward')
		}
	}

	const OnClose = () => {
		if (isOpen) {
			setIsOpen(false)
			setArrowDirection('rotate-back')
			setDropdownClass('fade-out')
		}
	}

	const CreateDropdown = () => {
		const filters = document.querySelector('.filters')
		const scroll = document.querySelector('.filters__list')

		let child = filters.lastElementChild
		if (child && child !== scroll) {
			filters.removeChild(child)
			child = filters.lastElementChild
		}

		const div = document.createElement('div')
		div.classList.add('dropdown__items')
		div.classList.add('has-fade')
		div.classList.add(dropdownClass)
		const ul = document.createElement('ul')
		ul.classList.add('dropdown__list')
		div.appendChild(ul)

		dropdownItems.forEach((item) => {
			const li = document.createElement('li')
			li.classList.add('dropdown__item')
			if (currentItem === item.name) {
				li.classList.add('active')
			}
			const p = document.createElement('p')
			p.innerText = item.name
			li.appendChild(p)
			li.addEventListener('mousedown', () => itemSelected(item.name))
			ul.appendChild(li)
		})

		let edgeOffset = scroll.getBoundingClientRect().left
		const scrollOffset = scroll.scrollLeft
		const basePadding = 32
		const baseWidth = 200
		const gap = 10

		// prettier-ignore
		const divOffset = ((edgeOffset + basePadding) + (baseWidth * offsetMultiplier) + (gap * offsetMultiplier)) - scrollOffset
		div.style.left = divOffset + 'px'
		filters.appendChild(div)
	}

	useEffect(() => {
		const scroll = document.querySelector('.filters__list')

		scroll.addEventListener('scroll', () => OnClose())

		return scroll.removeEventListener('scroll', () => OnClose())
	}, [])

	useEffect(() => {
		window.addEventListener('resize', () => OnClose())

		return window.addEventListener('resize', () => OnClose())
	}, [])

	useEffect(() => {
		CreateDropdown()
	}, [dropdownClass])

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
	offsetMultiplier: 0,
}

export default Dropdown
