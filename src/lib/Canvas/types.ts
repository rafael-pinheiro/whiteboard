export interface Point {
	x: number;
	y: number;
}

export interface Drawable extends Point {
	path: Path2D;
	width: number;
	height: number;
	color: string;
}

export interface BasicElement extends Drawable {
	id: string;
	points: Point[];
	z: number;
}

export interface FreeDrawElement extends BasicElement {
	type: 'free-draw';
}

export type CanvasElement = FreeDrawElement;
