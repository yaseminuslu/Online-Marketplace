package com.example.onlinemarketplace.auth;

import com.example.onlinemarketplace.dto.UserDto;
import com.example.onlinemarketplace.login.CustomUserDetailsService;
import com.example.onlinemarketplace.login.UserDetailsImpl;
import com.example.onlinemarketplace.mapper.UserMapper;
import com.example.onlinemarketplace.model.User;
import com.example.onlinemarketplace.repository.UserRepository;
import com.example.onlinemarketplace.security.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService customUserDetailsService;

    public AuthController(UserRepository userRepository, UserMapper userMapper, JwtUtil jwtUtil, AuthenticationManager authenticationManager, CustomUserDetailsService customUserDetailsService) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.customUserDetailsService = customUserDetailsService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password, HttpServletResponse response) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetailsImpl userDetails = (UserDetailsImpl) customUserDetailsService.loadUserByUsername(username);
            String token = jwtUtil.generateToken(userDetails);

            // Token'ı cookie olarak oluşturun
            Cookie cookie = new Cookie("authToken", token);
            cookie.setHttpOnly(true); // XSS koruması için HttpOnly olarak işaretleyin
            cookie.setSecure(true); // HTTPS kullanıyorsanız
            cookie.setPath("/"); // Cookie'nin geçerli olduğu path
            cookie.setMaxAge(3600); // Cookie'nin geçerlilik süresi (1 saat)

            // Cookie'yi HTTP cevabına ekleyin
            response.addCookie(cookie);

            return ResponseEntity.ok(token);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/info")
    public ResponseEntity<?> getUserInfo(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        if (jwtUtil.validateToken(token, jwtUtil.extractUsername(token))) {

             Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

             if (authentication != null && authentication.isAuthenticated()) {
                 Object principal = authentication.getPrincipal();

                 Optional<User> user = userRepository.findByUsername(principal.toString()); // Kullanıcıyı bulmak için bir servis çağrısı yapın

                 if (user != null) {
                     // DTO oluştur veya kullanıcı bilgilerini döndür
                     UserDto userDto = userMapper.toUserDto(user.get());
                     return ResponseEntity.ok(userDto);
                 } else {
                     return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Kullanıcı bulunamadı");
                 }

            }

        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }
}

