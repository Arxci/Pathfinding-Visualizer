import React, { useEffect, useState } from 'react'

const Grid = ({ grid, numOfCols, numOfRows, needsReset, isRunning }) => {
	const [items, setItems] = useState(null)

	function HandleWallPlacement(e, pos) {
		if (
			e.buttons === 1 &&
			e.shiftKey &&
			(e.target.className === 'grid__item' ||
				e.target.className === 'grid__item wall')
		) {
			if (!isRunning) {
				if (!needsReset) {
					items.forEach((item) => {
						if (item.key === pos) {
							e.target.classList.toggle('wall')
						}
					})
				}
			}
		}
	}

	function HandleTargetPlacement(e, pos) {
		if (e.buttons === 1 && e.target.className === 'grid__item' && e.ctrlKey) {
			if (!isRunning) {
				if (!needsReset) {
					let tempArr = [...items]

					tempArr.forEach((item) => {
						if (item.className === 'grid__item target') {
							item.className = 'grid__item'
						}
					})

					tempArr.forEach((item) => {
						if (item.key === pos) {
							item.className = 'grid__item target'
						}
					})

					setItems(tempArr)
				}
			}
		}
	}

	function HandleStartPlacement(e, pos) {
		if (
			e.buttons === 1 &&
			e.target.className === 'grid__item' &&
			!e.ctrlKey &&
			!e.shiftKey
		) {
			if (!isRunning) {
				if (!needsReset) {
					let tempArr = [...items]

					tempArr.forEach((item) => {
						if (item.className === 'grid__item start') {
							item.className = 'grid__item'
						}
					})

					tempArr.forEach((item) => {
						if (item.key === pos) {
							item.className = 'grid__item start'
						}
					})

					setItems(tempArr)
				}
			}
		}
	}

	function ItemClicked(e, pos) {
		HandleWallPlacement(e, pos)
		HandleStartPlacement(e, pos)
		HandleTargetPlacement(e, pos)
	}

	const MakeGrid = () => {
		var temp = []

		for (let i = 0; i < numOfRows; i++) {
			for (let j = 0; j < numOfCols; j++) {
				if (j === 41 && i === Math.floor(numOfRows / 2)) {
					temp.push({
						key: numOfCols * i + j,
						className: 'grid__item target',
					})
				} else if (j === 8 && i === Math.floor(numOfRows / 2)) {
					temp.push({
						key: numOfCols * i + j,
						className: 'grid__item start',
					})
				} else {
					temp.push({
						key: numOfCols * i + j,
						className: 'grid__item',
					})
				}
			}
		}
		setItems(temp)
	}

	useEffect(() => {
		if (grid !== []) {
			MakeGrid()
		}
	}, [grid])

	return (
		<div className="grid">
			<div className="grid__container container">
				<div className="grid__content">
					{items &&
						items.map((item) => (
							<span
								onMouseDown={(e) => ItemClicked(e, item.key)}
								onMouseEnter={(e) => HandleWallPlacement(e, item.key)}
								key={item.key}
								className={item.className}
							>
								<i
									className={
										item.className === 'grid__item start'
											? 'fa-solid fa-arrow-right grid__item__start'
											: 'grid__item__none'
									}
								></i>
								<i
									className={
										item.className === 'grid__item target'
											? 'fa-solid fa-bullseye grid__item__target'
											: 'grid__item__none'
									}
								></i>
							</span>
						))}
				</div>
			</div>
		</div>
	)
}

export default Grid
