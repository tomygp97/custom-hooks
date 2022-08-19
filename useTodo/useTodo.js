import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";


const initialState = [];
const init = () => {
    return JSON.parse( localStorage.getItem( "todos" ) ) || [];
}

export const useTodo = () => {

    const [ todos, dispatch ] = useReducer( todoReducer, initialState, init );

    useEffect(() => {

        localStorage.setItem("todos", JSON.stringify( todos ))

    }, [todos])

    const handleNewTodo = ( todo ) => {

        const action = {
            type: "[TODO] Add todo",
            payload: todo,
        }

        dispatch( action );
    };

    const handleRemoveTodo = ( id ) => {

        dispatch({
            type: "[TODO] Remove todo",
            payload: id,
        });
    };

    const handleToggleTodo = ( id ) => {

        dispatch({
            type: "[TODO] Toggle todo",
            payload: id,
        })

    };

    return {
        todos,
        todosCount: todos.length,
        prendingTodosCount: todos.filter( todo => !todo.done ).length,
        handleNewTodo,
        handleRemoveTodo,
        handleToggleTodo,
    }


};
