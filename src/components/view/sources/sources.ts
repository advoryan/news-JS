import './sources.css';
import { NewsSource } from '../../../types';
import getElement from '../../../utils/getElement';

class Sources {
    public draw(data: readonly NewsSource[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = getElement<HTMLTemplateElement>(document, '#sourceItemTemp');

        data.forEach((item: NewsSource): void => {
            const sourceClone: DocumentFragment = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            getElement(sourceClone, '.source__item-name').textContent = item.name;
            getElement(sourceClone, '.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        getElement(document, '.sources').append(fragment);
    }
}

export default Sources;
