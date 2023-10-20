import { AbstractMode } from './AbstractMode';

export class Selection extends AbstractMode {
	private coordinates: [number, number, number, number] = [
		// Starting point (x, y)
		0, 0,
		// width, height
		0, 0
	];

	activate(): void {
		this.mediator.DOMElement.addEventListener('pointerdown', this.handlePointerDown);
	}
	deactivate(): void {
		this.mediator.DOMElement.removeEventListener('pointerdown', this.handlePointerDown);
	}

	private handlePointerDown = ({ clientX, clientY }: PointerEvent) => {
		this.coordinates = [clientX - 2, clientY + 2, 1, 1];
		this.mediator.DOMElement.addEventListener('pointermove', this.handlePointerMove);
		this.mediator.DOMElement.addEventListener('pointerup', this.handlePointerUp);
	};

	private handlePointerMove = ({ clientX, clientY }: PointerEvent) => {
		this.coordinates[2] = clientX - this.coordinates[0];
		this.coordinates[3] = clientY - this.coordinates[1];
		this.render();
	};

	private handlePointerUp = () => {
		this.mediator.DOMElement.removeEventListener('pointermove', this.handlePointerMove);
		this.mediator.DOMElement.removeEventListener('pointerup', this.handlePointerUp);
		this.mediator.clearUI();
		if (this.coordinates[2] !== 0 && this.coordinates[3] !== 0) {
			this.selected.selectedElements = this.mediator.getElementsAt(...this.coordinates);
		}
	};

	private render() {
		this.mediator.clearUI();
		this.mediator.renderUI((context) => {
			context.lineWidth = 1;
			context.strokeStyle = 'rgba(200, 200, 200, .8)';
			context.setLineDash([6, 3]);

			context.strokeRect(...this.coordinates);

			context.setLineDash([]);
		});
	}
}
