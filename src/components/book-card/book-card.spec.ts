import { expect } from 'chai';
import BookItem from './book-card';
import sinon from 'sinon';
import assert from 'assert';

declare global {
    namespace NodeJS {
        interface Global {
            fetch: any;
        }
    }
}
describe('Testing FetchUrl - Wrapper over fetch', () => {

});
