export class Canvas {
	public context: CanvasRenderingContext2D;

	constructor(public canvas: HTMLCanvasElement) {
		const context = canvas.getContext('2d', {
			willReadFrequently: true
		});

		if (!context) {
			throw new Error('Failed to get context from canvas');
		}

		this.context = context;
	}

	public adjustSize = (rect: DOMRect, pixelRatio: number) => {
		// Set the "actual" size of the canvas
		this.canvas.width = rect.width * pixelRatio;
		this.canvas.height = rect.height * pixelRatio;

		// Scale the context to ensure correct drawing operations
		this.context.scale(pixelRatio, pixelRatio);

		// Set the "drawn" size of the canvas
		this.canvas.style.width = `${rect.width}px`;
		this.canvas.style.height = `${rect.height}px`;
	};

	clear(rect: { x: number; y: number; width: number; height: number }) {
		this.context.clearRect(rect.x, rect.y, rect.width, rect.height);
	}
}
