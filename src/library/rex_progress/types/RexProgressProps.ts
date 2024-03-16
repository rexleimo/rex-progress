export interface RexProgressProps {
    history?: {
        date: string;
        value: number;
    }[];
}

export interface RexProgress {
    el: HTMLElement;
    options?: RexProgressProps;
}

export type PartialCSSStyleDeclaration = Partial<CSSStyleDeclaration>;
