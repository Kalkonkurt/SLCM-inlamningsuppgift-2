import './App.css';
import { useState, useEffect } from 'react';
import SpellForm from './components/SpellForm';
import Button from './components/Button';
const STATUS_IN_PROGRESS = 'brewing';
const STATUS_DONE = 'mastered';

function App() {
	const [tasks, setTasks] = useState(() => {
		try {
			return JSON.parse(localStorage.getItem('tasks')) ?? [];
		} catch {
			return [];
		}
	});

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

	function addSpell({ title, description }) {
		setTasks([...tasks, { id: crypto.randomUUID(), title, description, status: STATUS_IN_PROGRESS }]);
	}
	function completeSpell(id) {
		setTasks(tasks.map((t) => (t.id === id ? { ...t, status: STATUS_DONE } : t)));
	}

	function deleteSpell(id) {
		setTasks(tasks.filter((t) => t.id !== id));
	}

	return (
		<>
			<h1>The Spellbook</h1>
			<div className="base">
				<section className="left">
					<h2>The Index</h2>
					<ul>
						{tasks.map((t) => (
							<li key={t.id}>
								<h4>{t.title}</h4>
							</li>
						))}
					</ul>
					<h3>Mastered Spells</h3>
					<ul className="spell-list">
						{tasks
							.filter((t) => t.status === STATUS_DONE)
							.map((t) => (
								<li key={t.id}>
									<strong>{t.title}</strong>
									<p>{t.description}</p>
									<Button variant="danger" onClick={() => deleteSpell(t.id)}>
										Delete
									</Button>
								</li>
							))}
					</ul>

					<h3>Spells in progress</h3>
					<ul className="spell-list">
						{tasks
							.filter((t) => t.status === STATUS_IN_PROGRESS)
							.map((t) => (
								<li key={t.id}>
									<strong>{t.title}</strong>
									<p>{t.description}</p>
									<Button onClick={() => completeSpell(t.id)}>Master</Button>
									<Button onClick={() => deleteSpell(t.id)}>Forget spell</Button>
								</li>
							))}
					</ul>
				</section>

				<section className="right">
					<h2>The Current Page</h2>
					<h3>Add a new spell:</h3>
					<SpellForm onAdd={addSpell} />
					<h3>Magical diagnostics</h3>
					<h3>Magical disturbances</h3>
				</section>
			</div>
		</>
	);
}

export default App;
