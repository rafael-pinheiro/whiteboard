import type { FreeDrawElement } from '$lib/Canvas/types';
import { nanoid } from 'nanoid';
import { AbstractTool } from './AbstractTool';
import { style } from '../ToolManager';

let z = -1;

export class Pen extends AbstractTool {
	activate(): void {
		window.addEventListener('pointerdown', this.onPointerDown);
		window.addEventListener('pointerup', this.onPointerUp);
	}
	deactivate(): void {
		window.removeEventListener('pointerdown', this.onPointerDown);
		window.removeEventListener('pointermove', this.onPointerMove);
		window.removeEventListener('pointerup', this.onPointerUp);
	}
	static newElement(): FreeDrawElement {
		return {
			type: 'free-draw',
			id: nanoid(),
			x: 0,
			y: 0,
			z: z++,
			width: 10,
			color: style.get(),
			points: [],
			path: new Path2D()
		};
	}

	private element: FreeDrawElement = Pen.newElement();

	onPointerDown = (event: PointerEvent) => {
		this.element = Pen.newElement();

		this.element.x = event.clientX;
		this.element.y = event.clientY;
		this.element.path.moveTo(this.element.x, this.element.y);

		window.addEventListener('pointermove', this.onPointerMove);
	};

	onPointerMove = (event: PointerEvent) => {
		this.element.path.lineTo(event.clientX, event.clientY);

		this.mediator.renderElement(this.element);

		this.element.points.push({
			x: event.clientX,
			y: event.clientY
		});
	};

	onPointerUp = () => {
		window.removeEventListener('pointermove', this.onPointerMove);
	};
}
