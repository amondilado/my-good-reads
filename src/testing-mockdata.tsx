// Sample data for mocking tests
import {BookCardType} from "./components/book-card/book-card.interface";

export const mockBookCardProps = {
    "id": "fq_oDwAAQBAJ",
    "volumeInfo": {
        "title": "The Lagos Consulate 1851 - 1861",
        "authors": [
            "Robert S. Smith"
        ],
        "publishedDate": "2021-01-08",
        "description": "This title is part of UC Press's Voices Revived program, which commemorates University of California Press's mission to seek out and cultivate the brightest minds and give them voice, reach, and impact. Drawing on a backlist dating to 1893, Voices Revived makes high-quality, peer-reviewed scholarship accessible once again using print-on-demand technology. This title was originally published in 1979.",
        "imageLinks": {
            "smallThumbnail": "http://books.google.com/books/content?id=fq_oDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
            "thumbnail": "http://books.google.com/books/content?id=fq_oDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        }},
    // "isRead": true
};

export const mockBookResults = [{
    "id": "fq_oDwAAQBAJ",
    "volumeInfo": {
        "title": "The Lagos Consulate 1851 - 1861",
        "authors": [
            "Robert S. Smith"
        ],
        "publishedDate": "2021-01-08",
        "description": "This title is part of UC Press's Voices Revived program, which commemorates University of California Press's mission to seek out and cultivate the brightest minds and give them voice, reach, and impact. Drawing on a backlist dating to 1893, Voices Revived makes high-quality, peer-reviewed scholarship accessible once again using print-on-demand technology. This title was originally published in 1979.",
        "imageLinks": {
            "smallThumbnail": "http://books.google.com/books/content?id=fq_oDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
            "thumbnail": "http://books.google.com/books/content?id=fq_oDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        }}
}];
export const mockBookResults_empty: BookCardType[] = [];

export const mockReadingListItemAdd = {
    "id": "fq_oDwAAQBAJ",
    "title": "The Lagos Consulate 1851 - 1861"
}