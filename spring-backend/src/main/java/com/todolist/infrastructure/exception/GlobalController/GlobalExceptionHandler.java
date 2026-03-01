package com.todolist.infrastructure.exception.GlobalController;

import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.todolist.infrastructure.exception.SchemaErrorMessage;
import com.todolist.infrastructure.exception.TodoExceptionDoNotExist;
import com.todolist.infrastructure.exception.TodoExceptionNotFound;
import com.todolist.infrastructure.exception.TodoExceptionSameTitle;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(TodoExceptionNotFound.class)
    private ResponseEntity<SchemaErrorMessage> todoExceptionNotFound(TodoExceptionNotFound exception) {
        SchemaErrorMessage threatResponse = new SchemaErrorMessage(HttpStatus.NOT_FOUND, exception.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(threatResponse);
    }

    @ExceptionHandler(TodoExceptionSameTitle.class)
    private ResponseEntity<SchemaErrorMessage> todoExceptionSameTitle(TodoExceptionSameTitle exception) {
        SchemaErrorMessage threatResponse = new SchemaErrorMessage(HttpStatus.FORBIDDEN, exception.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(threatResponse);
    }

    @ExceptionHandler(TodoExceptionDoNotExist.class)
    private ResponseEntity<SchemaErrorMessage> todoExceptionDoNotExist(TodoExceptionDoNotExist exception) {
        SchemaErrorMessage threatResponse = new SchemaErrorMessage(HttpStatus.FORBIDDEN, exception.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(threatResponse);
    }

    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(
            HttpMessageNotReadableException ex,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request) {

        return ResponseEntity
                .status(status)
                .body(Map.of(
                        "status", status.value(),
                        "error", "Invalid request body",
                        "message", "Request contains unknown or invalid fields"
                ));
    }
}
