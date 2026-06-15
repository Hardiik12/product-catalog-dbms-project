package com.example.backend.config;

import com.example.backend.model.Role;
import com.example.backend.model.RoleName;
import com.example.backend.model.User;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner init(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder encoder) {
        return args -> {
            if (roleRepository.count() == 0) {
                roleRepository.save(new Role(RoleName.ROLE_ADMIN));
                roleRepository.save(new Role(RoleName.ROLE_MANAGER));
                roleRepository.save(new Role(RoleName.ROLE_USER));
            }

            if (!userRepository.existsByEmail("admin@vectorcart.com")) {
                Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN).orElseThrow();
                User admin = new User("Admin User", "admin@vectorcart.com", encoder.encode("admin123"));
                admin.setRoles(Set.of(adminRole));
                userRepository.save(admin);
            }

            if (!userRepository.existsByEmail("manager@vectorcart.com")) {
                Role managerRole = roleRepository.findByName(RoleName.ROLE_MANAGER).orElseThrow();
                User manager = new User("Manager User", "manager@vectorcart.com", encoder.encode("manager123"));
                manager.setRoles(Set.of(managerRole));
                userRepository.save(manager);
            }

            if (!userRepository.existsByEmail("user@vectorcart.com")) {
                Role userRole = roleRepository.findByName(RoleName.ROLE_USER).orElseThrow();
                User user = new User("Normal User", "user@vectorcart.com", encoder.encode("user123"));
                user.setRoles(Set.of(userRole));
                userRepository.save(user);
            }

            java.util.List<User> allUsers = userRepository.findAll();
            for(User u : allUsers) {
                if(u.getPassword() != null && !u.getPassword().startsWith("$2a$")) {
                    u.setPassword(encoder.encode(u.getPassword()));
                    userRepository.save(u);
                }
            }
        };
    }
}
