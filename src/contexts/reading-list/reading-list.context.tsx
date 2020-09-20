import React, {createContext, useState, useEffect} from 'react';
import {add, inReadingList, remove} from './reading-list.utils';
import {ReadingListItemType} from './reading-list.interface';

export const ReadingListContext = createContext<{
    readingList: ReadingListItemType[];
    readingListCount: number;
    addItem: (item: ReadingListItemType) => ReadingListItemType | void;
    removeItem: (id: string) => ReadingListItemType | void;
    isRead: (id: string) => boolean;
}>({
    readingList: [],
    readingListCount: 0,
    addItem: () => {},
    removeItem: () => {},
    isRead: () => false
});

const ReadingListProvider: React.FC = ({children}) => {
    const [readingList, setReadingList] = useState<ReadingListItemType[]>([]);
    const [readingListCount, setReadingListCount] = useState(0);

    const addItem = (item: ReadingListItemType) => {
        const updatedState = add(readingList, item);
        updatedState && setReadingList(updatedState);
    };
    const isRead = (id: string) => {
        return inReadingList(readingList, id);
    };
    const removeItem = (id: string) => setReadingList(remove(readingList, id) || readingList);

    useEffect(() => {
        setReadingListCount(readingList.length);
    }, [readingList]);

    return (
        <ReadingListContext.Provider value={{
            readingList,
            readingListCount,
            addItem,
            removeItem,
            isRead,
        }}>
            {children}
        </ReadingListContext.Provider>
    )
};

export default ReadingListProvider;