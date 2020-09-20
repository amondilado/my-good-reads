import { expect } from 'chai';
import sinon from 'sinon';
import assert from 'assert';
import {inReadingList, add, remove} from './reading-list.utils';
import {mockReadingListItem} from "../../testing-mockdata";

describe('Render list Utils', () => {
    test('inReadingList', () => {
        const mockReadingList = [mockReadingListItem];
        const inReadingListSpy = sinon.spy(inReadingList);

        // Return item when in reading list
        const resultValid = inReadingListSpy(mockReadingList, 'fq_oDwAAQBAJ');
        assert(inReadingListSpy.calledOnce);
        assert(inReadingListSpy.returned);
        expect(resultValid).to.equal(mockReadingListItem);

        // Return undefined when not in reading list
        const resultInvalid = inReadingListSpy(mockReadingList, 'xxx');
        assert(inReadingListSpy.calledTwice);
        assert(inReadingListSpy.returned);
        expect(resultInvalid).to.equal(undefined);
    });

    test('remove', () => {
        const mockReadingList = [mockReadingListItem];
        const removeSpy = sinon.spy(remove);
        const id = 'fq_oDwAAQBAJ';

        // Return item when in reading list
        const result = removeSpy(mockReadingList, id);
        assert(removeSpy.calledOnce);
        assert(removeSpy.calledWith(mockReadingList, id));
        assert(removeSpy.returned);
        expect(result).to.be.empty;
    })

    test('add', () => {
        const mockReadingListEmpty = [];
        const addSpy = sinon.spy(add);

        const result = addSpy(mockReadingListEmpty, mockReadingListItem);
        assert(addSpy.calledOnce);
        assert(addSpy.calledWith(mockReadingListEmpty, mockReadingListItem));
        assert(addSpy.returned);
        expect(result.length).to.equal(1);
        expect(result[0]).to.equal(mockReadingListItem);

        // Return if item exists
        const mockReadingList = [mockReadingListItem];
        const resultExists = addSpy(mockReadingList, mockReadingListItem);
        assert(addSpy.calledTwice);
        assert(addSpy.calledWith(mockReadingList, mockReadingListItem));
        assert(addSpy.returned);
        expect(resultExists).to.be.false;
    })
});