package com.productcatalog.backend.controller;

import com.productcatalog.backend.dto.LoginRequest;
import com.productcatalog.backend.dto.SignupRequest;
import com.productcatalog.backend.entity.User;
import com.productcatalog.backend.repository.UserRepository;
import com.productcatalog.backend.security.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")

public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // SIGNUP

    @PostMapping("/signup")
    public ResponseEntity<?> signup(
            @RequestBody SignupRequest request
    ){

        if(userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Error: Email is already in use!");
        }

        User user = new User();

        user.setFullname(
                request.getFullname()
        );

        user.setEmail(
                request.getEmail()
        );

        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        user.setRole(
                request.getRole()
        );

        // ACTIVE STATUS

        user.setStatus("ACTIVE");

        userRepository.save(user);

        return ResponseEntity.ok("User Registered Successfully");
    }

    // LOGIN

    @PostMapping("/login")

    public Map<String,Object> login(
            @RequestBody LoginRequest request
    ){

        Optional<User> optionalUser =
                userRepository.findByEmail(
                        request.getEmail()
                );

        Map<String,Object> response =
                new HashMap<>();

        if(optionalUser.isPresent()){

            User user = optionalUser.get();

            // PASSWORD CHECK

            if(
                    passwordEncoder.matches(
                            request.getPassword(),
                            user.getPassword()
                    )
            ){

                String token =
                        jwtService.generateToken(
                                user.getEmail(),
                                user.getRole()
                        );

                response.put(
                        "success",
                        true
                );

                response.put(
                        "token",
                        token
                );

                response.put(
                        "role",
                        user.getRole()
                );

                response.put(
                        "email",
                        user.getEmail()
                );

                response.put(
                        "fullname",
                        user.getFullname()
                );

                response.put(
                        "status",
                        user.getStatus()
                );

                return response;
            }
        }

        response.put(
                "success",
                false
        );

        response.put(
                "message",
                "Invalid Credentials"
        );

        return response;
    }
}