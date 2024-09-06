package com.example.onlinemarketplace.config;

import com.example.onlinemarketplace.login.CustomUserDetailsService;
import com.example.onlinemarketplace.security.JwtRequestFilter;
import com.example.onlinemarketplace.security.JwtUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final CustomUserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;
    public SecurityConfig(CustomUserDetailsService userDetailsService, JwtUtil jwtUtil) {
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
    }
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("OPTIONS");
        config.addAllowedMethod("HEAD");
        config.addAllowedMethod("GET");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("DELETE");
        config.addAllowedMethod("PATCH");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers(HttpMethod.POST, "/api/v1/blacklists").hasRole("USER")
                                .requestMatchers(HttpMethod.DELETE, "api/v1/blacklists?{sellerId}").hasRole("USER")
                                .requestMatchers(HttpMethod.GET, "/api/v1/blacklists/search?{searchQuery}").hasRole("USER")
                                .requestMatchers(HttpMethod.GET, "/api/v1/blacklists/all").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/v1/blacklists/user?{userId}").hasRole("USER")


                                .requestMatchers(HttpMethod.POST, "/api/v1/products").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/v1/products/all").hasAnyRole("USER", "ADMIN")
                                .requestMatchers(HttpMethod.PUT, "/api/v1/products/{productId}").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "/api/v1/products/{productId}").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/v1/products/search?{searchQuery}").hasAnyRole("USER", "ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/v1/products/seller?{productId}").hasAnyRole("USER", "ADMIN")

                                .requestMatchers(HttpMethod.POST, "/api/v1/favorites").hasRole("USER")
                                .requestMatchers(HttpMethod.DELETE, "/api/v1/favorites/").hasRole("USER")
                                .requestMatchers(HttpMethod.GET,"api/v1/favorites/user?{userId}").hasAnyRole("USER","ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/v1/favorites/all").hasAnyRole("USER", "ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/v1/favorites/search?{searchQuery}").hasAnyRole("USER", "ADMIN")

                                .requestMatchers(HttpMethod.POST, "/api/v1/users").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/v1/users/all").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.PUT, "/api/v1/users/{userId}").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "/api/v1/users/").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/v1/users/search?{searchQuery}").hasRole("ADMIN")

                                .requestMatchers(HttpMethod.POST, "/api/v1/sellers").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/v1/sellers/all").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.PUT, "/api/v1/sellers/{sellerId}").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "/api/v1/sellers/{sellerId}").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET, "/api/v1/sellers/search?{searchQuery}").hasRole("ADMIN")

                                .requestMatchers(HttpMethod.POST, "/api/v1/auth/login").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/v1/auth/info").permitAll()
                                .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .logout(logout -> logout.permitAll());
        http.addFilterBefore(new JwtRequestFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
