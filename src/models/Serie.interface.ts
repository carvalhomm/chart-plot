import { SerieType } from "./Serie.type";

export interface Serie {
    type: SerieType;
    timestamp: number;
    select?: ResponseTime[];
    group?: Group[];
    begin?: number;
    end?: number;
    min_response_time?: number;
    max_response_time?: number;
    os?: string;
    browser?: string;
}

type ResponseTime = 'min_response_time' | 'max_response_time';
type Group = 'os' | 'browser';
