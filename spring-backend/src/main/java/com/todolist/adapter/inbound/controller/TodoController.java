package com.todolist.adapter.inbound.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.todolist.application.usecase.todo.create.CreateTodoCase;
import com.todolist.application.usecase.todo.create.CreateTodoRequest;
import com.todolist.application.usecase.todo.create.CreateTodoResponse;
import com.todolist.application.usecase.todo.delete.DeleteTodoCase;
import com.todolist.application.usecase.todo.get.GetTodoCase;
import com.todolist.application.usecase.todo.get.GetTodoResponse;
import com.todolist.application.usecase.todo.update.UpdateTodoCase;
import com.todolist.application.usecase.todo.update.UpdateTodoRequest;
import com.todolist.application.usecase.todo.update.UpdateTodoResponse;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;



@RequiredArgsConstructor
@RestController
@RequestMapping("/api/todo")
public class TodoController {

    private final CreateTodoCase createTodoCase;
    private final UpdateTodoCase updateTodoCase;
    private final DeleteTodoCase deleteTodoCase;
    private final GetTodoCase getTodoCase;

    @PostMapping()
    public ResponseEntity<CreateTodoResponse> createTodo(@Valid @RequestBody CreateTodoRequest todoRequest) {
        CreateTodoResponse response = createTodoCase.execute(todoRequest.title());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/getall")
    public List<GetTodoResponse> list() {
        return getTodoCase.getList();
    }


    @PatchMapping("/{id}")
    public ResponseEntity<UpdateTodoResponse> updateTodo(@PathVariable @NotNull String id, @Valid @RequestBody UpdateTodoRequest todoRequest) {
        updateTodoCase.execute(id, todoRequest);
        return ResponseEntity.status(HttpStatus.OK).body(new UpdateTodoResponse(todoRequest.title(), todoRequest.status()));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull String id) {
        deleteTodoCase.execute(id);
    }

}
