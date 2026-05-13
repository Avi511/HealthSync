package com.healthsync.authservice.entity;

import com.healthsync.authservice.enums.Role;
import jakarta.persistence.*;

@Entity
@Table(name = "auth_users")
public class AuthUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Column(unique = true)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    public AuthUser() {
    }

    public AuthUser(Long id, String fullName, String email, String password, Role role) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public static AuthUserBuilder builder() {
        return new AuthUserBuilder();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public static class AuthUserBuilder {
        private Long id;
        private String fullName;
        private String email;
        private String password;
        private Role role;

        AuthUserBuilder() {
        }

        public AuthUserBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public AuthUserBuilder fullName(String fullName) {
            this.fullName = fullName;
            return this;
        }

        public AuthUserBuilder email(String email) {
            this.email = email;
            return this;
        }

        public AuthUserBuilder password(String password) {
            this.password = password;
            return this;
        }

        public AuthUserBuilder role(Role role) {
            this.role = role;
            return this;
        }

        public AuthUser build() {
            return new AuthUser(id, fullName, email, password, role);
        }
    }
}
