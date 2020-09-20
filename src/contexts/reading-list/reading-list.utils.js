export const inReadingList = (readingList, id) => {
    return readingList.find(book => book.id === id);
};

export const add = (readingList, bookToAdd) => {
    const existingItem = inReadingList(readingList, bookToAdd.id);

    if (existingItem) {
        return false;
    }

    return [...readingList, bookToAdd];
};

export const remove = (readingList, id) => {
    return readingList.filter(book => book.id !== id);
};