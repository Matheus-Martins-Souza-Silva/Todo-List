package com.todolist.domain.entities.todo;

import org.springframework.util.Assert;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Todo {
    private TodoID id;
    private String title;
    private TodoStatus status;

    public Todo()
    {

    }

    public Todo(TodoID id, String title, TodoStatus status)
    {
        Assert.notNull(id, "ID must be not null!");
        Assert.notNull(title, "Title must be not null!");
        Assert.notNull(status, "Status must be not null!");
        this.id = id;
        this.title = title;
        this.status = status;
    }

    public void changeStatus(TodoStatus status) {
        this.status = status;
    }
}
