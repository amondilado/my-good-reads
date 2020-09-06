interface VolumeInfo {
    title: string;
    imageLinks?: {
        smallThumbnail: string
    };
    authors?: Array<string>;
    publishedDate?: string;
    description?: string;
    publisher?: string;
}
export interface BookType {
    id: string;
    volumeInfo: VolumeInfo;
}