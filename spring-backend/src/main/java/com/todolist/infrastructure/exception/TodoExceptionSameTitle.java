package com.todolist.infrastructure.exception;

public class TodoExceptionSameTitle extends RuntimeException {

    public TodoExceptionSameTitle() {
        super("This task is already created.");
    }

    public TodoExceptionSameTitle(String msg) {
        super(msg);
    }
}
