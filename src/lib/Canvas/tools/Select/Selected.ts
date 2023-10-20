import type { Mediator } from '$lib/Canvas/Mediator';
import type { CanvasElement } from '$lib/Canvas/types';

export class Selected {
	private selected: CanvasElement[] = [];

	constructor(private mediator: Mediator) {}

	set selectedElements(elements: CanvasElement[]) {
		this.selected = elements;

		this.render();
	}

	private render() {
		this.renderSelectionRect();
	}

	clear() {
		this.mediator.clearUI();
	}

	private renderSelectionRect() {
		const padding = 15;
		const elements = this.selected;
		const path = new Path2D();

		if (elements.length === 0) {
			this.clear();
		}

		const xs = elements.flatMap((_) => _.points).map((_) => _.x);
		const ys = elements.flatMap((_) => _.points).map((_) => _.y);
		const x = Math.min(...xs);
		const y = Math.min(...ys);

		path.rect(
			x - padding,
			y - padding,
			Math.max(...xs) - x + padding * 2,
			Math.max(...ys) - y + padding * 2
		);

		this.mediator.renderUI((context) => {
			context.lineWidth = 1;
			context.strokeStyle = 'rgba(200, 200, 200, .8)';
			context.setLineDash([6, 3]);

			context.stroke(path);
		});
	}
}
