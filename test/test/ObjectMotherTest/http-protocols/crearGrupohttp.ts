import { UrlWithParsedQuery, parse } from "url";

export class UrlCrearGrupo{
    public static parseUrl(url: string): UrlWithParsedQuery {
        return parse(url, true);
    }
}