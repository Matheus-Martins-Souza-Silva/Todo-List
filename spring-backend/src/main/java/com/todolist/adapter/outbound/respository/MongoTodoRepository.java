package com.todolist.adapter.outbound.respository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.todolist.domain.entities.todo.Todo;
import com.todolist.domain.entities.todo.TodoID;
import com.todolist.domain.entities.todo.TodoStatus;
import com.todolist.domain.repository.TodoRepository;

@Repository
public class MongoTodoRepository implements TodoRepository {

    private final SpringDataMongoTodoRepository repository;

    public MongoTodoRepository(SpringDataMongoTodoRepository repository)
    {
        this.repository = repository;
    }

    @Override
    public void save(Todo todo)
    {
        repository.save(toDocument(todo));
    }

    @Override
    public Optional<Todo> findById(TodoID ID)
    {
        return repository.findById(ID.id().toString())
            .map(this::toDomain);
    }

    @Override
    public List<Todo> findAll()
    {
        return repository.findAll().stream().map(this::toDomain).toList();
    }

    @Override
    public void delete(String id)
    {
        repository.deleteById(id);
    }

    public boolean existByTitle(String title)
    {
        return repository.findAll().stream().anyMatch(handle -> handle.getTitle().equals(title));
    }

    private TodoDocument toDocument(Todo todo)
    {
        return new TodoDocument(todo.getId().id().toString(), todo.getTitle(), todo.getStatus().getValue());
    }

    private Todo toDomain(TodoDocument doc)
    {
        return new Todo(new TodoID(UUID.fromString(doc.getId())), doc.getTitle(), TodoStatus.fromValue(doc.getStatus()));
    }
}
