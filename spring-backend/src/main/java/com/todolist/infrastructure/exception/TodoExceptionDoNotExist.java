package com.todolist.infrastructure.exception;

public class TodoExceptionDoNotExist extends RuntimeException {

    public TodoExceptionDoNotExist() {
        super("Theres no such task.");
    }

    public TodoExceptionDoNotExist(String msg) {
        super(msg);
    }
}
