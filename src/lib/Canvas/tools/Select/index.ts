import type { Mediator } from '../../Mediator';
import { AbstractTool } from '../AbstractTool';
import { Selected } from './Selected';
import { Selection } from './modes/Selection';

interface Modes {
	selection: Selection;
}

export class Select extends AbstractTool {
	private selected: Selected;
	private modes: Modes;
	private currentMode: Modes[keyof Modes];

	constructor(mediator: Mediator) {
		super(mediator);
		this.selected = new Selected(mediator);
		this.modes = {
			selection: new Selection(mediator, this.selected)
		};
		this.currentMode = this.modes.selection;
	}

	activate(): void {
		this.modes.selection.activate();
	}

	deactivate(): void {
		this.currentMode.deactivate();
	}
}
