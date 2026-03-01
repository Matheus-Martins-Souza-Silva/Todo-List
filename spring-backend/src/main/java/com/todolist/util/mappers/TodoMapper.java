package com.todolist.util.mappers;

import org.springframework.stereotype.Component;

import com.todolist.application.usecase.todo.create.CreateTodoRequest;
import com.todolist.domain.entities.todo.Todo;
import com.todolist.domain.entities.todo.TodoID;
import com.todolist.domain.entities.todo.TodoStatus;

@Component
public class TodoMapper {

    /*public TodoDTO toDTO(Todo todo)
    {
        if(todo == null)
            return null;

        return new TodoDTO(todo.getTitle(), todo.getStatus().getValue());
    }

    public Todo toEntity(TodoDTO todoDTO)
    {
        if(todoDTO == null)
            return null;

        Todo todo = new Todo();

        todo.setId(new TodoID());
        todo.setTitle(todoDTO.title());
        todo.setStatus(TodoStatus.fromValue(todoDTO.status()));

        return todo;
    }*/

    public Todo toEntity(CreateTodoRequest todoRequest) {
        if(todoRequest == null)
            return null;

        Todo todo = new Todo();

        todo.setId(new TodoID());
        todo.setTitle(todoRequest.title());
        todo.setStatus(TodoStatus.fromValue(0));

        return todo;
    }

}
