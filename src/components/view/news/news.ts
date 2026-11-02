import './news.css';
import { Article } from '../../../types';
import getElement from '../../../utils/getElement';

class News {
    public draw(data: readonly Article[]): void {
        const news: readonly Article[] =
            data.length >= 10 ? data.filter((_item: Article, idx: number): boolean => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement = getElement<HTMLTemplateElement>(document, '#newsItemTemp');

        news.forEach((item: Article): void => {
            const newsClone: DocumentFragment = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            getElement(newsClone, '.news__meta-photo').style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            getElement(newsClone, '.news__meta-author').textContent = item.author || item.source.name;
            getElement(newsClone, '.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            getElement(newsClone, '.news__description-title').textContent = item.title;
            getElement(newsClone, '.news__description-source').textContent = item.source.name;
            getElement(newsClone, '.news__description-content').textContent = item.description;
            getElement(newsClone, '.news__read-more a').setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        getElement(document, '.news').innerHTML = '';
        getElement(document, '.news').appendChild(fragment);
    }
}

export default News;
