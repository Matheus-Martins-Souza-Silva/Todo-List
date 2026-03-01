package com.todolist.application.usecase.todo.create;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.todolist.domain.entities.todo.Todo;
import com.todolist.domain.entities.todo.TodoID;
import com.todolist.domain.entities.todo.TodoStatus;
import com.todolist.domain.repository.TodoRepository;
import com.todolist.infrastructure.exception.TodoExceptionSameTitle;

@Service
public class CreateTodoCase {

    private final TodoRepository todoRepository;

    public CreateTodoCase(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public CreateTodoResponse execute(String title)
    {
        if(todoRepository.existByTitle(title))
            throw new TodoExceptionSameTitle("A Task informada ja existe.");

        Todo todo = new Todo(
            new TodoID(UUID.randomUUID()),
            title,
            TodoStatus.PENDING
        );

        todoRepository.save(todo);

        return new CreateTodoResponse(todo.getId().id().toString(), todo.getTitle(), todo.getStatus().getValue());
    }
}
