import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'

function App() {
	return (
		<div className="app">
			<Header />
			<div className="app__pages">
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<></>} />
					</Routes>
				</BrowserRouter>
			</div>
		</div>
	)
}

export default App
