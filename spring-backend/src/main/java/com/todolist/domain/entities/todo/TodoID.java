package com.todolist.domain.entities.todo;

import java.util.UUID;

import org.springframework.util.Assert;

public record TodoID (UUID id) {

    public TodoID{
        Assert.notNull(id, "ID must be not null!");
    }

    public TodoID() {
        this(UUID.randomUUID());
    }
}
