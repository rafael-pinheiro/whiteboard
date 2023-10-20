// import { nanoid } from 'nanoid';
// import type { BasicElement, Canvas } from '../types';

import type { AbstractTool } from './tools/AbstractTool';
import { Select } from './tools/Select';
import { Pen } from './tools/Pen';
import type { Canvas } from './Canvas';
import type { Mediator } from './Mediator';
import { atom } from 'nanostores';

let pointerLocked = false;

export const lock = async (canvas: Canvas) => {
	if (pointerLocked) return;

	try {
		await canvas.canvas.requestPointerLock();
	} catch (error) {
		if ((error as Error).name === 'InUseAttributeError') {
			pointerLocked = true;
			return;
		}

		throw error;
	}
};

export const onPointerLockChange = (canvas: Canvas, document: Document) => {
	if (document.pointerLockElement === canvas.canvas) {
		console.log('The pointer lock status is now locked');
		// Do something useful in response
	} else {
		console.log('The pointer lock status is now unlocked');
		// Do something useful in response
	}
};

export type Tool = 'pen' | 'select';

export const activeToolType = atom<Tool>('pen');
export const activeOverlay = atom<ConstructorOfATypedSvelteComponent | undefined>();
export const style = atom<string>('#000');

export class ToolManager {
	private tools: Record<Tool, AbstractTool>;
	public activeTool: AbstractTool;

	constructor(mediator: Mediator) {
		this.tools = {
			pen: new Pen(mediator),
			select: new Select(mediator)
		};

		this.activeTool = this.tools.pen;
		this.activeTool.activate();
		activeToolType.set('pen');
	}

	clean() {
		this.activeTool.deactivate();
	}

	activate(tool: Tool) {
		this.activeTool.deactivate();
		this.activeTool = this.tools[tool];
		this.activeTool.activate();
		activeToolType.set(tool);
	}
}
