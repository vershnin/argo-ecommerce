# Argo Electronics - Backend

This is the backend for Argo Electronics, a full-stack ecommerce shop built with Spring Boot.

## What's here
- REST APIs for products, cart, orders, auth, admin stuff
- JWT security for login/register
- PostgreSQL database with entities like User, Product, Order
- Controllers, services, repositories - standard Spring setup

## Quick setup
1. Install Java 21, Maven, PostgreSQL
2. Create DB: `createdb argo_ecommerce`
3. Edit `src/main/resources/application.properties` with your DB creds and JWT secret
4. Run: `mvn spring-boot:run`

Server starts at http://localhost:8080. Check APIs like /api/products.

Built for reliability and security. Enjoy! 🚀
