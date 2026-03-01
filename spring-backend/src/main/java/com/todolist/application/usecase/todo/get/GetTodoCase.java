package com.todolist.application.usecase.todo.get;

import java.util.List;

import org.springframework.stereotype.Service;

import com.todolist.domain.repository.TodoRepository;

@Service
public class GetTodoCase {

    private final TodoRepository repository;

    public GetTodoCase(TodoRepository repository) {
        this.repository = repository;
    }

    // ARRUMAR O FRONT-END

    public List<GetTodoResponse> getList() {
        return repository.findAll().stream().map( todo -> new GetTodoResponse(
            todo.getId().id().toString(),
            todo.getTitle(),
            todo.getStatus().getValue()
        )).toList();
    }
}
