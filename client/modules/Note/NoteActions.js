import callApi from '../../util/apiCaller';
import { createAction } from 'redux-actions';
import localStorage from 'localStorage';

// Export Constants
export const ADD_NOTE = 'ADD_NOTE';
export const ADD_NOTES = 'ADD_NOTES';
export const DELETE_NOTE = 'DELETE_NOTE';
export const UPVOTE = 'UPVOTE';
export const DOWNVOTE = 'DOWNVOTE';
export const ADD_MYNOTE_FILTER = 'ADD_MYNOTE_FILTER';
export const REMOVE_MYNOTE_FILTER = 'REMOVE_MYNOTE_FILTER';

export const addNote = createAction(
  ADD_NOTE,
  note => note,
);

export function addNoteRequest(title, content, tags) {
  return (dispatch) => {
    return callApi('note/new', 'post', {
      title,
      content,
      tags,
      isPrivate: true,
      owner: {
        username: localStorage.getItem('username'),
        fullname: localStorage.getItem('fullname'),
      }
    }, {title, content, tags}).then(res => dispatch(addNote(res.note)));
  };
}

export function requestNoteUpvote(noteId) {
  const username = localStorage.getItem('username');
  return (dispatch) => {
    return callApi('note/upvote', 'post', {
      noteId
    }).then(res => dispatch(upVote({noteId, username})));
  }
}

export function requestNoteDownvote(noteId) {
  const username = localStorage.getItem('username');
  return (dispatch) => {
    return callApi('note/downvote', 'post', {
      noteId
    }).then(res => dispatch(downVote({noteId, username})));
  }
}

export const upVote = createAction(
  UPVOTE,
  obj => obj,
)

export const downVote = createAction(
  DOWNVOTE,
  obj => obj,
)

export const addNotes = createAction(
  ADD_NOTES,
  notes => notes,
);

export const addMyNoteFilter = createAction(
  ADD_MYNOTE_FILTER
)

export const removeMyNoteFilter = createAction(
  REMOVE_MYNOTE_FILTER
)

// Export Actions
export function fetchNotes({pageNumber, contentQuery, tagQuery}) {
  let query = { 'filter':{} }
  if (contentQuery) {
    query.filter.content = contentQuery
  } else if(tagQuery) {
    query.filter.tags = tagQuery
  }

  return (dispatch) => {
    return callApi(`note/getNotes/${pageNumber}`, 'post', query).then(response => {
      dispatch(addNotes(response.result));
    });
  };

}

export function fetchNote(id) {
  return (dispatch) => {
    return callApi(`notes/${id}`).then(res => dispatch(addNote(res.result)));
  };
}

export function deleteNote(id) {
  return {
    type: DELETE_NOTE,
    id,
  };
}

export function deleteNoteRequest(id) {
  return (dispatch) => {
    return callApi(`notes/${id}`, 'delete').then(() => dispatch(deleteNote(id)));
  };
}
