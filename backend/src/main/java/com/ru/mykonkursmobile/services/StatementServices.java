package com.ru.mykonkursmobile.services;

import com.ru.mykonkursmobile.enums.Role;
import com.ru.mykonkursmobile.enums.StatusCompetition;
import com.ru.mykonkursmobile.enums.StatusStatement;
import com.ru.mykonkursmobile.enums.TypeStatement;
import com.ru.mykonkursmobile.exceptions.ChangeStatusException;
import com.ru.mykonkursmobile.exceptions.NotFoundEntityException;
import com.ru.mykonkursmobile.interfaces.IStatementService;
import com.ru.mykonkursmobile.models.ArtGroup;
import com.ru.mykonkursmobile.models.Competition;
import com.ru.mykonkursmobile.models.Statement;
import com.ru.mykonkursmobile.models.User;
import com.ru.mykonkursmobile.repositoryes.StatementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StatementServices implements IStatementService {
    @Autowired
    StatementRepository repository;

    @Autowired
    UserService userService;

    @Autowired
    CompetitionService competitionService;

    @Autowired
    GroupService groupService;

    @Override
    public Page<Statement> all(Pageable pageable) {
        return repository.findAllByOrderByStatusStatement(pageable);
    }

    @Override
    public Statement add(Statement statement) {
        return repository.save(statement);
    }


    @Override
    public Statement update(Statement statement) throws NotFoundEntityException {
        if(!repository.existsById(statement.getIdStatement())){
            throw new NotFoundEntityException(HttpStatus.BAD_REQUEST,"Такой заявки не существует");
        }
        return repository.save(statement);
    }


    @Override
    public Statement getById(Integer id) throws NotFoundEntityException {
        Statement statement = repository.findById(id).orElseThrow(
                ()-> new NotFoundEntityException(HttpStatus.NOT_FOUND, "Такой заявки не существует")
        );
        return statement;
    }

    @Override
    public Page<Statement> getByUserId(Integer idUser, Pageable pageable) throws NotFoundEntityException {
        User user = userService.getById(idUser);
        return  repository.findAllByUserId(user.getIdUser(), pageable);
    }

    @Override
    public Statement accept(Integer id) throws NotFoundEntityException, ChangeStatusException, DataIntegrityViolationException {

        Statement statement = getById(id);
        if(statement.getStatusStatement() != null){
            throw new ChangeStatusException(HttpStatus.BAD_REQUEST, "Вы не можете изменить статус заявки, так как у неё уже есть статус");
        }

        statement.setStatusStatement(StatusStatement.ACCEPTED);

        User user = userService.getById(statement.getUser().getIdUser());

        if(statement.getType() == TypeStatement.GROUP && (user.getRole() == Role.DIRECTOR || user.getRole() == Role.CLIENT)){
            ArtGroup group = new ArtGroup(
                    statement.getUser(),
                    statement.getName(),
                    statement.getDescription(),
                    statement.getCity(),
                    statement.getAddress()
            );
            groupService.add(group);
            userService.changeRole(user, Role.DIRECTOR);

        } else if(statement.getType() == TypeStatement.COMPETITION && (user.getRole() == Role.ORGANIZER || user.getRole() == Role.CLIENT)){
            Competition competition = new Competition(
                    statement.getUser(),
                    statement.getName(),
                    statement.getDescription(),
                    statement.getDateStart(),
                    statement.getDateFinish(),
                    statement.getCity(),
                    StatusCompetition.CREATED
            );
            competitionService.add(competition);
            userService.changeRole(user, Role.ORGANIZER);

        } else{
            throw new ChangeStatusException(HttpStatus.BAD_REQUEST,"Не удалось разместить коллектив или конкурс. Возможно пользователь имеет неподходящую роль. Разместить коллектив или конкурс может только клиент, конкурс - организатор, коллектив - руководитель");
        }

        return update(statement);
    }

    @Override
    public Statement reject(Integer id) throws NotFoundEntityException, ChangeStatusException {
        Statement statement = getById(id);
        if(statement.getStatusStatement() != null){
            throw new ChangeStatusException(HttpStatus.BAD_REQUEST, "Вы не можете изменить статус заявки, так как у неё уже есть статус");
        } else{
            statement.setStatusStatement(StatusStatement.REJECTED);
        }

        return update(statement);
    }

    @Override
    public void delete(Integer id) throws NotFoundEntityException{
        Statement statement = getById(id);
        repository.delete(statement);
    }


    @Override
    public Page<Statement> findById(Integer id, Pageable pageable){
        return repository.findAllByIdStatement(id, pageable);
    }

}
