import { Canvas } from './Canvas';
import { Cursor } from './Cursor';
import { ToolManager, lock, onPointerLockChange } from './ToolManager';
import type { CanvasElement } from './types';

export class Mediator {
	public toolManager: ToolManager;
	public DOMElement: HTMLElement;
	// public cursor: Cursor;

	private pixelRatio = window.devicePixelRatio;
	private canvas: Canvas;
	private uiCanvas: Canvas;
	private cursorCanvas: Canvas;
	private elements = new Set<CanvasElement>();
	private rect: DOMRect;

	constructor(wrapper: HTMLDivElement) {
		this.DOMElement = wrapper;
		this.canvas = new Canvas(wrapper.querySelector('#main') as HTMLCanvasElement);
		this.uiCanvas = new Canvas(wrapper.querySelector('#ui') as HTMLCanvasElement);
		this.cursorCanvas = new Canvas(wrapper.querySelector('#cursor') as HTMLCanvasElement);
		this.toolManager = new ToolManager(this);
		// this.cursor = new Cursor(this.cursorCanvas);

		this.rect = wrapper.getBoundingClientRect();
		this.adjustSize();

		this.bindEvents();
	}

	public destroy = () => {
		this.toolManager.clean();
		this.unbindEvents();
	};

	private bindEvents() {
		this.uiCanvas.canvas.addEventListener('click', this.clickHandler);
		window.addEventListener('pointerlockchange', this.lockHandler);
		window.addEventListener('resize', this.adjustSize);
	}

	private unbindEvents() {
		this.canvas.canvas.removeEventListener('click', this.clickHandler);
		window.removeEventListener('pointerlockchange', this.lockHandler);
		window.removeEventListener('resize', this.adjustSize);
	}

	private adjustSize = () => {
		this.canvas.adjustSize(this.rect, this.pixelRatio);
		this.uiCanvas.adjustSize(this.rect, this.pixelRatio);
		this.cursorCanvas.adjustSize(this.rect, this.pixelRatio);
	};

	private clickHandler = () => {
		lock(this.uiCanvas);
	};

	private lockHandler = () => {
		onPointerLockChange(this.uiCanvas, document);
	};

	public renderElement(element: CanvasElement) {
		this.canvas.context.lineCap = 'round';
		this.canvas.context.lineWidth = element.width;
		this.canvas.context.strokeStyle = element.color;
		this.canvas.context.stroke(element.path);
		console.log('Element render:', element);
		console.log(this.elements);
		this.elements.add(element);
	}

	public renderUI(renderer: (context: CanvasRenderingContext2D) => void) {
		renderer(this.uiCanvas.context);
	}

	public clearUI() {
		this.uiCanvas.clear(this.rect);
	}

	private nonZeroInt(input: number): number {
		return input > 0 ? Math.ceil(input) : Math.floor(input);
	}

	public getElementsAt(
		inputX: number,
		inputY: number,
		inputWidth = 1,
		inputHeight = 1
	): CanvasElement[] {
		const x = inputX * this.pixelRatio;
		const y = inputY * this.pixelRatio;
		const width = this.nonZeroInt(inputWidth * this.pixelRatio);
		const height = this.nonZeroInt(inputHeight * this.pixelRatio);

		const { data } = this.canvas.context.getImageData(x, y, Math.round(width), Math.round(height));
		const hasNoElement = data.find((colorChannel) => colorChannel > 0) === undefined;
		if (hasNoElement) return [];

		const result = [];

		for (const element of this.elements) {
			this.uiCanvas.context.lineWidth = element.width;
			this.uiCanvas.context.setLineDash([]);
			this.uiCanvas.context.stroke(element.path);

			const { data } = this.uiCanvas.context.getImageData(x, y, width, height);

			if (data.find((colorChannel) => colorChannel > 0) !== undefined) {
				result.push(element);
			}

			this.uiCanvas.context.clearRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
		}

		return result;
	}
}
