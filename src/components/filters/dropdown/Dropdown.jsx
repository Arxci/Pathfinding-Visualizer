import React, { useEffect, useState, useMemo } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const Dropdown = ({
	name,
	dropdownItems,
	itemSelected,
	currentItem,
	offsetMultiplier,
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [arrowDirection, setArrowDirection] = useState('')

	//crete dropdown element
	const div = useMemo(() => {
		return document.createElement('div')
	}, [])

	const ul = useMemo(() => {
		return document.createElement('ul')
	}, [])

	//add classes
	div.classList.add('dropdown__items')
	div.classList.add('has-fade')
	ul.classList.add('dropdown__list')
	div.appendChild(ul)

	function OnToggle() {
		if (isOpen) {
			OnClose()
		} else {
			OnOpen()
		}
	}

	function OnOpen() {
		div.classList.remove('fade-out')
		div.classList.add('fade-in')
		setArrowDirection('rotate-forward')

		setIsOpen(true)
	}

	function OnClose() {
		div.classList.remove('fade-in')
		div.classList.add('fade-out')
		setArrowDirection('rotate-back')
		setIsOpen(false)
	}

	//update list state
	function UpdateList() {
		for (let i = 0; i < ul.childNodes.length; i++) {
			ul.childNodes[i].classList.remove('active')
			if (dropdownItems[i].name === currentItem) {
				ul.childNodes[i].classList.add('active')
			}
		}
	}

	//update dropdown offset
	function UpdatePosition() {
		const scroll = document.querySelector('.filters__list')

		let edgeOffset = scroll.getBoundingClientRect().left
		const scrollOffset = scroll.scrollLeft
		const basePadding = parseFloat(
			window.getComputedStyle(scroll, null).getPropertyValue('padding-left')
		)
		const baseWidth = 200
		const gap = 10

		// prettier-ignore
		const divOffset = ((edgeOffset + basePadding) + (baseWidth * offsetMultiplier) + (gap * offsetMultiplier)) - scrollOffset
		div.style.left = divOffset + 'px'
	}

	//on scrollbar scroll
	useEffect(() => {
		const scroll = document.querySelector('.filters__list')

		scroll.addEventListener('scroll', () => UpdatePosition())

		return scroll.removeEventListener('scroll', () => UpdatePosition())
	}, [])

	useEffect(() => {
		window.addEventListener('resize', () => UpdatePosition())

		return window.removeEventListener('resize', () => UpdatePosition())
	}, [])

	//create out list on load
	useEffect(() => {
		dropdownItems.forEach((item) => {
			const li = document.createElement('button')
			li.classList.add('dropdown__item')
			const p = document.createElement('p')
			p.innerText = item.name
			li.appendChild(p)
			li.addEventListener('mousedown', () => itemSelected(item.name))
			ul.appendChild(li)
		})
	}, [])

	useEffect(() => {
		if (isOpen) {
			UpdatePosition()
			UpdateList()
			const filters = document.querySelector('.filters')
			filters.appendChild(div)
		}
	}, [isOpen])

	return (
		<div className="dropdown">
			<button
				className="dropdown__btn"
				onClick={(e) => OnToggle(e)}
				onBlur={() => OnClose()}
			>
				<div className="dropdown__name">
					<p className={currentItem === '' ? '' : 'active'}>{name}</p>
					<KeyboardArrowDownIcon
						className={
							currentItem === ''
								? 'dropdown__icon ' + arrowDirection
								: 'dropdown__icon ' + arrowDirection + ' ' + 'active'
						}
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
