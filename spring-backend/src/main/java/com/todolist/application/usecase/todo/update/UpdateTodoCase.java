package com.todolist.application.usecase.todo.update;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.todolist.domain.entities.todo.Todo;
import com.todolist.domain.entities.todo.TodoID;
import com.todolist.domain.entities.todo.TodoStatus;
import com.todolist.domain.repository.TodoRepository;
import com.todolist.infrastructure.exception.TodoExceptionDoNotExist;

@Service
public class UpdateTodoCase {

    private TodoRepository repository;

    public UpdateTodoCase(TodoRepository repository) {
        this.repository = repository;
    }

    public void execute(String id, UpdateTodoRequest request) {

        Todo todo = repository.findById(new TodoID(UUID.fromString(id)))
                        .orElseThrow(() -> new TodoExceptionDoNotExist("Todo not found."));

        if(request.title() != todo.getTitle())
            todo.setTitle(request.title());

        todo.changeStatus(TodoStatus.fromValue(request.status()));

        repository.save(todo);
    }
}
