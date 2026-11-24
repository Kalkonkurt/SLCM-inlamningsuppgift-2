import './App.css';
import { useState, useEffect } from 'react';
import SpellForm from './components/SpellForm';
import Button from './components/Button';
import {
	STATUS_IN_PROGRESS,
	STATUS_DONE,
	addSpell,
	completeSpell,
	deleteSpell,
	countCompletedSpells
} from './spellLogic';
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

	function handleAdd(spell) {
		setTasks((prev) => addSpell(prev, spell));
	}
	function handleComplete(id) {
		setTasks((prev) => completeSpell(prev, id));
	}

	function handleDelete(id) {
		setTasks((prev) => deleteSpell(prev, id));
	}

	return (
		<main>
			<>
				<h1>The Spellbook</h1>
				<div className="base">
					<section className="left sketchy">
						<h2>The Index</h2>
						<ul>
							{tasks.map((t) => (
								<li key={t.id}>
									<h4>{t.title}</h4>
								</li>
							))}
						</ul>
						<h3>Mastered Spells ({countCompletedSpells(tasks)})</h3>
						<ul className="spell-list">
							{tasks
								.filter((t) => t.status === STATUS_DONE)
								.map((t) => (
									<li key={t.id}>
										<h4>
											<strong>{t.title}</strong>
										</h4>
										<p>{t.description}</p>
										<div className="btn-group">
											<Button variant="danger" onClick={() => handleDelete(t.id)}>
												Delete
											</Button>
										</div>
									</li>
								))}
						</ul>

						<h3>Spells in progress</h3>
						<ul className="spell-list">
							{tasks
								.filter((t) => t.status === STATUS_IN_PROGRESS)
								.map((t) => (
									<li key={t.id}>
										<h4>
											<strong>{t.title}</strong>
										</h4>
										<p>{t.description}</p>
										<div className="btn-group">
											<Button onClick={() => handleComplete(t.id)}>Master</Button>
											<Button onClick={() => handleDelete(t.id)}>Forget spell</Button>
										</div>
									</li>
								))}
						</ul>
					</section>

					<section className="right">
						<h2>The Current Page</h2>
						<h3>Add a new spell:</h3>
						<SpellForm onAdd={handleAdd} />
						<h3>Magical diagnostics</h3>
						<h3>Magical disturbances</h3>
					</section>
				</div>
			</>
		</main>
	);
}

export default App;
