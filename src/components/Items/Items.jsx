import React, { Fragment } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { removeTask, changeState } from '../../slices/toDoReducer.js';
import { addComment } from '../../slices/comentReducer.js';
import { selectors } from '../../slices/toDoReducer.js';
import { commentSelectors } from '../../slices/comentReducer.js';
import FormAddComent from '../../components/modal/FormAddComent.jsx';

const Items = () => {
  const tasks = useSelector(selectors.selectAll);
  const comment = useSelector(commentSelectors.selectAll);
  console.log(comment, tasks);
  const { activeFilter } = useSelector((state) => state.toDo);
  const newTasks = activeFilter === 'all' ? tasks : tasks.filter((t) => t.state === activeFilter); 
    const dispatch = useDispatch();

    const handlerRemoveTask = (id) => (e) => {
      e.preventDefault();
      dispatch(removeTask(id));
    };

    const handlerChangeState = (id) => (e) => {
      e.preventDefault();
      const { state } = tasks.find((t) => t.id === id);
      const newState = state === 'active' ? 'finished' : 'active';
      dispatch(changeState({ id, changes: { state: newState } }));
    }
    const handlerSubmitPosts = (idTask) => (setState, inputState) => (text, upDateText) => (e) => {
      e.preventDefault();
      const comment = {
        id: _.uniqueId(),
        text,
        idTask 
      };
      dispatch(addComment(comment));
      setState(inputState);
      upDateText('');
    }
    if (tasks.length === 0) {
      return null;
    }
    return (
    <div className="mt-3">
      <ul className="list-group">
        {newTasks.map(({ id, text, state }) => (
          <Fragment key={id}>
          <li key={id} className="list-group-item d-flex justify-content-between">
            <span className="mr-auto">
              <button type="button" className="btn btn-link" onClick={handlerChangeState(id)}>
              {state === 'active' ? text : <s>{text}</s>}
              </button>
            </span>
            <button type="button" className="btn btn-outline-info" onClick={handlerRemoveTask(id)}>
            <span>&times;</span>
            </button>
          </li>
          <ul>
          {comment.filter((c) => c.idTask === id).map(({ id, text }) => (<li key={id}>{text}</li>))}
          </ul>
          <FormAddComent handler={handlerSubmitPosts(id)}/>
          </Fragment>
        ))}
      </ul>
    </div>
    );
};

export default Items;