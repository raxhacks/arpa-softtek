export interface Document {
    id: string;
    title: string;
    createdAt: string;
    publicURL: string;
    analysis_id: string;
    favorite: boolean | string;
}