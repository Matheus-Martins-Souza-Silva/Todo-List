package com.todolist.domain.repository;

import java.util.List;
import java.util.Optional;

import com.todolist.domain.entities.todo.Todo;
import com.todolist.domain.entities.todo.TodoID;

public interface TodoRepository {
    void save(Todo todo);
    Optional<Todo> findById(TodoID ID);
    List<Todo> findAll();
    boolean existByTitle(String title);
    void delete(String id);
}