// App constants
const HEADING: string = 'Start posting to begin conversation!!!';
const REPLY_TO: string = 'Replying to ';
const EDIT_BY: string = 'Editing comment by ';

// Api constants
const MASTER_KEY: string = '$2a$10$cjgA3Q4K3v4184Y6PqMHeebZ5ztmDq4gdGVqYk.76CRJ3YSreySoa';
const BIN_ID: string = '652e8bb212a5d376598ce4f3';
const API_URL: string = 'https://api.jsonbin.io/v3';
const GET_BINS_ROUTE: string = `/b/${BIN_ID}`;
const REQUEST_TYPE = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT'
};

export {
  HEADING,
  REPLY_TO,
  EDIT_BY,
  MASTER_KEY,
  API_URL,
  GET_BINS_ROUTE,
  REQUEST_TYPE
}