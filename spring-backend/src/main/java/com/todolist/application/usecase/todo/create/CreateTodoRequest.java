package com.todolist.application.usecase.todo.create;

import jakarta.validation.constraints.NotBlank;

public record CreateTodoRequest(@NotBlank String title) {
}
