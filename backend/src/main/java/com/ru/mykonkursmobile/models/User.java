package com.ru.mykonkursmobile.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ru.mykonkursmobile.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "user")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("idUser")
	@Column(name="id_user", unique = true, nullable = false)
	private int idUser;

	@NotBlank
	@Column(name="surname_user")
	private String surnameUser;

	@NotBlank
	@Column(name="name_user")
	private String nameUser;

	@Column(name="patronimyc_user")
	private String patronimycUser;

	@NotBlank(message = "Логин обязателен")
	@Size(min = 5, message = "Минимальная длина логина 5 символов")
	@Pattern(regexp = "^[A-Za-z0-9]+$", message = "Логин может содержать только буквы латинского алфавита и цифры")
	private String loginUser;


	@Size(min = 8, message = "Минимальная длина пароля 8 символов")
	@Pattern(regexp = "((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Za-z]).*$", message = "Пароль должен включать буквы латинского алфавита, цифры и хотя бы 1 спец символ")
	@NotBlank(message = "Пароль обязателен")
	@Column(name="password_user", nullable = false)
	private String passwordUser;

	@NotBlank
	@Pattern(regexp = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
			+ "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$")
	@Column(name="mail_user")
	private String mailUser;

	@Column(name="phone_user")
	private String phoneUser;

	@Column(name="role")
	@Enumerated(EnumType.STRING)
	private Role role;

	public void setIdUser(int idUser){

		this.idUser = idUser;
	}
	@Id
	public int getIdUser(){

		return this.idUser;
	}

	public void setSurnameUser(String surnameUser){

		this.surnameUser = surnameUser;
	}
	public String getSurnameUser(){

		return this.surnameUser;
	}

	public void setNameUser(String nameUser){

		this.nameUser = nameUser;
	}
	public String getNameUser(){

		return this.nameUser;
	}

	public void setPatronimycUser(String patronimycUser){

		this.patronimycUser = patronimycUser;
	}
	public String getPatronimycUser(){

		return this.patronimycUser;
	}

	public void setLoginUser(String loginUser){
		this.loginUser = loginUser;
	}

	public String getLoginUser(){
		return this.loginUser;
	}

	public void setPasswordUser(String passwordUser){
		this.passwordUser = passwordUser;
	}

	public String getPasswordUser(){
		return this.passwordUser;
	}

	public void setMailUser(String mailUser){

		this.mailUser = mailUser;
	}
	public String getMailUser(){

		return this.mailUser;
	}

	public void setPhoneUser(String phoneUser){

		this.phoneUser = phoneUser;
	}
	public String getPhoneUser(){

		return this.phoneUser;
	}

	public void setRole(Role role) {
		this.role = role;
	}
	public Role getRole(){
		return  this.role;
	}

	public User(int idUser,
				String surnameUser,
				String nameUser,
				String patronimycUser,
				String loginUser,
				String passwordUser,
				String mailUser,
				String phoneUser,
				Role role){
		this.idUser = idUser;
		this.surnameUser = surnameUser;
		this.nameUser = nameUser;
		this.patronimycUser = patronimycUser;
		this.loginUser = loginUser;
		this.passwordUser = passwordUser;
		this.mailUser = mailUser;
		this.phoneUser = phoneUser;
		this.role = role;
	}

	public User(
				String surnameUser,
				String nameUser,
				String patronimycUser,
				String loginUser,
				String passwordUser,
				String mailUser,
				String phoneUser,
				Role role){
		this.surnameUser = surnameUser;
		this.nameUser = nameUser;
		this.patronimycUser = patronimycUser;
		this.loginUser = loginUser;
		this.passwordUser = passwordUser;
		this.mailUser = mailUser;
		this.phoneUser = phoneUser;
		this.role = role;
	}

	public User(){
	}
}