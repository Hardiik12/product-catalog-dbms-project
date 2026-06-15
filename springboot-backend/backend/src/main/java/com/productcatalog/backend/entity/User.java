package com.productcatalog.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")

public class User {

    @Id
    @GeneratedValue(
            strategy =
            GenerationType.IDENTITY
    )

    private Long id;

    private String fullname;

    @Column(unique = true)

    private String email;

    private String password;

    private String role;

    // STATUS

    private String status;

    // CONSTRUCTOR

    public User() {
    }

    // GET ID

    public Long getId() {

        return id;
    }

    // SET ID

    public void setId(Long id) {

        this.id = id;
    }

    // GET FULLNAME

    public String getFullname() {

        return fullname;
    }

    // SET FULLNAME

    public void setFullname(
            String fullname
    ) {

        this.fullname = fullname;
    }

    // GET EMAIL

    public String getEmail() {

        return email;
    }

    // SET EMAIL

    public void setEmail(
            String email
    ) {

        this.email = email;
    }

    // GET PASSWORD

    public String getPassword() {

        return password;
    }

    // SET PASSWORD

    public void setPassword(
            String password
    ) {

        this.password = password;
    }

    // GET ROLE

    public String getRole() {

        return role;
    }

    // SET ROLE

    public void setRole(
            String role
    ) {

        this.role = role;
    }

    // GET STATUS

    public String getStatus() {

        return status;
    }

    // SET STATUS

    public void setStatus(
            String status
    ) {

        this.status = status;
    }
}