export const STATUS_IN_PROGRESS = 'brewing';
export const STATUS_DONE = 'mastered';

export function addSpell(spells, { title, description }) {
	if (!title || title.trim()) return spells;
	return [
		...spells,
		{
			id: crypto.randomUUID(),
			title: title.trim(),
			description: (description ?? '').trim(),
			status: STATUS_IN_PROGRESS
		}
	];
}

export function completeSpell(spells, id) {
	return spells.map((spells) => (spells.id === id ? { ...spells, status: STATUS_DONE } : spells));
}

export function deleteSpell(spells, id) {
	return spells.filter((spells) => spells.id !== id);
}

export function countCompletedSpells(spells) {
	return spells.filter((spells) => spells.status === STATUS_DONE).length;
}
