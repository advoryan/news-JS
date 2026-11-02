import './sources.css';
import { NewsSource, ScrollDirection } from '../../../types';
import getElement from '../../../utils/getElement';

class Sources {
    private readonly container: HTMLElement = getElement(document, '.sources');
    private readonly prevButton: HTMLButtonElement = getElement(document, '.sources-slider__arrow_prev');
    private readonly nextButton: HTMLButtonElement = getElement(document, '.sources-slider__arrow_next');

    constructor() {
        this.prevButton.addEventListener('click', (): void => this.scroll(ScrollDirection.Left));
        this.nextButton.addEventListener('click', (): void => this.scroll(ScrollDirection.Right));
        this.container.addEventListener('scroll', (): void => this.updateArrows());
    }

    public draw(data: readonly NewsSource[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = getElement<HTMLTemplateElement>(document, '#sourceItemTemp');

        data.forEach((item: NewsSource): void => {
            const sourceClone: DocumentFragment = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            getElement(sourceClone, '.source__item-name').textContent = item.name;
            getElement(sourceClone, '.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        this.container.append(fragment);
        this.updateArrows();
    }

    private scroll(direction: ScrollDirection): void {
        this.container.scrollBy({ left: direction * this.container.clientWidth * 0.8, behavior: 'smooth' });
    }

    private updateArrows(): void {
        const maxScroll: number = this.container.scrollWidth - this.container.clientWidth;

        this.prevButton.disabled = this.container.scrollLeft <= 0;
        this.nextButton.disabled = this.container.scrollLeft >= maxScroll - 1;
    }
}

export default Sources;
