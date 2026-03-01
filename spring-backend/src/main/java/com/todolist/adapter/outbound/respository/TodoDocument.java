package com.todolist.adapter.outbound.respository;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "todos")
public class TodoDocument {
    @Id
    private String id;
    private String title;
    private int status;

    public TodoDocument() {}

    public TodoDocument(String id, String title, int status) {
        this.id = id;
        this.title = title;
        this.status = status;
    }
}
