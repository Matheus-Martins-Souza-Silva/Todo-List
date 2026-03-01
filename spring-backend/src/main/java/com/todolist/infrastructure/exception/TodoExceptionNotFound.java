package com.todolist.infrastructure.exception;

public class TodoExceptionNotFound extends RuntimeException {

    public TodoExceptionNotFound() {
        super("Error on send todo list.");
    }

    public TodoExceptionNotFound(String msg) {
        super(msg);
    }
}
