import type { CanvasElement } from '$lib/Canvas/types';
import { db } from './db';

const ref = db.ref('elements');

export const add = async (element: CanvasElement) => {
	try {
		await ref.push(element);
	} catch (error) {
		console.error('Could not insert a new element');
		throw error;
	}
};

export const newElements = ref.on<CanvasElement>('child_added');
export const modifiedElements = ref.on<CanvasElement>('child_changed');
export const removedElements = ref.on<CanvasElement>('child_removed');
