import type { Mediator } from '../../../Mediator';
import type { Selected } from '../Selected';

export abstract class AbstractMode {
	constructor(protected mediator: Mediator, protected selected: Selected) {}

	abstract activate(): void;
	abstract deactivate(): void;
}
