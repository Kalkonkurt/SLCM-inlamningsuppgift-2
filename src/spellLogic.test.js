import { describe, it, expect } from 'vitest';
import {
	STATUS_IN_PROGRESS,
	STATUS_DONE,
	addSpell,
	completeSpell,
	deleteSpell,
	countCompleted
} from './spellLogic';

describe('spellLogic', () => {
	it('creates a spell with correct title, description and status', () => {
		const result = addSpell([], { title: 'Fireball', description: 'Ball of fire that burns things' });
		expect(result).toHaveLength(1);
		expect(result[0]).toMatchObject({
			title: 'Fireball',
			description: 'Ball of fire that burns things',
			status: STATUS_IN_PROGRESS
		});
		expect(result[0].id).toBeTruthy();
	});
});
