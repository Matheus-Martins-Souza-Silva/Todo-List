package com.todolist.application.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TodoDTO(@NotNull @NotBlank String title, @NotNull @Min(0) @Max(1) int status) {
}
