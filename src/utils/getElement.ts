function getElement<T extends Element = HTMLElement>(parent: ParentNode, selector: string): T {
    const element: T | null = parent.querySelector<T>(selector);

    if (!element) {
        throw new Error(`Element ${selector} not found`);
    }

    return element;
}

export default getElement;
