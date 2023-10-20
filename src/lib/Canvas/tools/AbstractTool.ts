import type { Mediator } from '../Mediator';

export abstract class AbstractTool {
	constructor(protected mediator: Mediator) {}

	abstract activate(): void;
	abstract deactivate(): void;
}
