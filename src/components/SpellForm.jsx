import { useState } from 'react';
import './SpellForm.css';
import Button from './Button';

function SpellForm({ onAdd }) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	function handleSubmit(e) {
		e.preventDefault();

		if (!title.trim()) return;
		onAdd({ title: title.trim(), description: description.trim() });
		setTitle('');
		setDescription('');
	}

	return (
		<form className="formWrapper" onSubmit={handleSubmit}>
			<input
				required
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Name of the spell"
			/>
			<textarea
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				placeholder="Describe the spell..."
			/>

			<Button type="submit">Learn</Button>
		</form>
	);
}

export default SpellForm;
