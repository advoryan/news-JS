type ResponseStatus = 'ok' | 'error';

export interface NewsSource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface Article {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface SourcesResponse {
    status: ResponseStatus;
    sources: NewsSource[];
}

export interface NewsResponse {
    status: ResponseStatus;
    totalResults: number;
    articles: Article[];
}

export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export enum StatusCode {
    Unauthorized = 401,
    NotFound = 404,
}

export interface Options {
    apiKey: string;
    sources: string;
}

export type Callback<T> = (data: T) => void;
