package com.todolist.domain.entities.todo;

import com.todolist.infrastructure.exception.TodoExceptionNotFound;

public enum TodoStatus {
    PENDING(0),
    COMPLETED(1);

    private final int value;

    TodoStatus(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public static TodoStatus fromValue(int value) {
        for(TodoStatus status : values()) {
            if(status.value == value)
                return status;
        }

        throw new TodoExceptionNotFound("Invalid Status Value: " + value);
    }
}
