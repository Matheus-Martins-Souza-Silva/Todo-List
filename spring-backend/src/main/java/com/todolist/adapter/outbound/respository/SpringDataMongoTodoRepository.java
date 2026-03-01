package com.todolist.adapter.outbound.respository;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface SpringDataMongoTodoRepository extends MongoRepository<TodoDocument, String> {

}