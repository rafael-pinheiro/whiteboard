import type { Canvas } from './Canvas';
import type { Drawable } from './types';

const cursors = {
	pen: new Path2D(
		'm0,7.2h3.21v.6H0v-.6Zm11.79.6h3.21v-.6h-3.21v.6Zm-4.59,3.98v3.21h.6v-3.21h-.6Zm0-11.79v3.21h.6V0h-.6Zm.23,6.91c-.33,0-.59.27-.59.59s.27.59.59.59.59-.27.59-.59-.27-.59-.59-.59Z'
	)
};
const pixelRatio = window.devicePixelRatio;

export class Cursor implements Drawable {
	path = cursors.pen;
	width = 15;
	height = 15;
	color = '#000';
	x = 0;
	y = 0;
	private cursorImage: ImageData;

	constructor(private canvas: Canvas) {
		this.cursorImage = this.getCursorImage();
		this.bindEvents();
	}

	private bindEvents() {
		window.addEventListener('pointermove', this.updatePosition);
	}

	private getCursorImage() {
		this.canvas.context.fillStyle = this.color;
		this.canvas.context.strokeStyle = '';
		this.canvas.context.fill(this.path);
		return this.canvas.context.getImageData(0, 0, this.width, this.height);
	}

	private updatePosition = ({ clientX, clientY }: PointerEvent) => {
		this.canvas.clear({
			x: this.x / pixelRatio - 5,
			y: this.y / pixelRatio + 5,
			width: this.width + 5,
			height: this.height + 5
		});
		this.x = clientX * pixelRatio;
		this.y = clientY * pixelRatio;
		this.canvas.context.putImageData(this.cursorImage, this.x, this.y);
	};
}
