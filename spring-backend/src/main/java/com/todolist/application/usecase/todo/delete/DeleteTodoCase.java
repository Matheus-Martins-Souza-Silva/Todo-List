package com.todolist.application.usecase.todo.delete;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.todolist.domain.entities.todo.TodoID;
import com.todolist.domain.repository.TodoRepository;
import com.todolist.infrastructure.exception.TodoExceptionDoNotExist;

@Service
public class DeleteTodoCase {

    private final TodoRepository repository;

    public DeleteTodoCase (TodoRepository repository) {
        this.repository = repository;
    }

    public void execute(String id) {
        var todo = repository.findById(new TodoID(UUID.fromString(id)));

        if(todo == null)
            throw new TodoExceptionDoNotExist("This task do not exist");

        repository.delete(id);
    }
}
