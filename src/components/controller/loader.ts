import { Callback, Endpoint, Options, StatusCode } from '../../types';

class Loader {
    private readonly baseLink: string;
    private readonly options: Readonly<Pick<Options, 'apiKey'>>;

    constructor(baseLink: string, options: Pick<Options, 'apiKey'>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: { endpoint: Endpoint; options?: Partial<Options> },
        callback: Callback<T> = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === StatusCode.Unauthorized || res.status === StatusCode.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Partial<Options>, endpoint: Endpoint): string {
        const urlOptions: Partial<Options> = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        (Object.keys(urlOptions) as (keyof Options)[]).forEach((key: keyof Options): void => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(method: string, endpoint: Endpoint, callback: Callback<T>, options: Partial<Options> = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response): Promise<T> => res.json())
            .then((data: T): void => callback(data))
            .catch((err: Error): void => console.error(err));
    }
}

export default Loader;
