package com.todolist.infrastructure.exception;

public class TodoExceptionNotFound extends RuntimeException {

    public TodoExceptionNotFound() {
        super("Erro ao enviar ao envio dos dados da todo-list.");
    }

    public TodoExceptionNotFound(String msg) {
        super(msg);
    }
}
