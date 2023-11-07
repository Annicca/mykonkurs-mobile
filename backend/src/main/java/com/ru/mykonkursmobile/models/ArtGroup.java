package com.ru.mykonkursmobile.models;

import com.ru.mykonkursmobile.dto.GroupChangeDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "art_group")
public class ArtGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idGroup;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_user", nullable = false)
    @NotNull
    public User director;

    @NotBlank
    @Size(max = 25, message = "Максимальная длина названия 25 символов")
    private String nameGroup;

    private String descriptionGroup;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_city", nullable = false)
    @NotNull
    private City cityGroup;

    @NotBlank
    private String addressGroup;

    private String category;

    private String img;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "participant",
            joinColumns = @JoinColumn(name = "id_group"),
            inverseJoinColumns = @JoinColumn(name = "id_competition"))
    private List<Competition> competitions = new ArrayList<>();

    public List<Competition> getCompetitions () {
        return competitions;
    }

    public void setCompetitions(List<Competition> competitions) {
        this.competitions = competitions;
    }

    public void setIdGroup(int idGroup) {
        this.idGroup = idGroup;
    }

    public int getIdGroup() {
        return idGroup;
    }

    public User getDirector() {
        return director;
    }

    public void setDirector(User director) {
        this.director = director;
    }

    public void setNameGroup(String nameGroup) {
        this.nameGroup = nameGroup;
    }

    public String getNameGroup() {
        return nameGroup;
    }

    public void setDescriptionGroup(String descriptionGroup) {
        this.descriptionGroup = descriptionGroup;
    }

    public String getDescriptionGroup() {
        return descriptionGroup;
    }

    public City getCityGroup() {
        return cityGroup;
    }

    public void setCityGroup(City cityGroup) {
        this.cityGroup = cityGroup;
    }

    public void setAddressGroup(String addressGroup) {
        this.addressGroup = addressGroup;
    }

    public String getAddressGroup() {
        return addressGroup;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCategory() {
        return category;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getImg() {
        return img;
    }

    public ArtGroup(Integer idGroup, User director, String nameGroup, String descriptionGroup, City cityGroup, String addressGroup, String category, String img){
        this.idGroup = idGroup;
        this.director = director;
        this.nameGroup = nameGroup;
        this.descriptionGroup  = descriptionGroup;
        this.cityGroup = cityGroup;
        this.addressGroup = addressGroup;
        this.category = category;
        this.img = img;
    }

    public ArtGroup(User director, String nameGroup, String descriptionGroup, City cityGroup, String addressGroup){
        this.director = director;
        this.nameGroup = nameGroup;
        this.descriptionGroup  = descriptionGroup;
        this.cityGroup = cityGroup;
        this.addressGroup = addressGroup;
    }

    public ArtGroup() {
    }

    public void update(GroupChangeDTO groupChangeDTO){
        this.nameGroup = groupChangeDTO.getNameGroup();
        this.descriptionGroup  = groupChangeDTO.getDescriptionGroup();
        this.addressGroup = groupChangeDTO.getAddressGroup();
        this.category = groupChangeDTO.getCategory();
    }
}
