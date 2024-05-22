export interface Analysis {
    Keywords: Keyword[];
    QuantitativeData: QuantitativeDatum[];
    Sections: Section[];
}

export interface Keyword {
    keyword: string;
    count: number;
}

export interface QuantitativeDatum {
    datum: string;
    sentence: string;
}

export interface Section {
    title: string;
    content: string;
}