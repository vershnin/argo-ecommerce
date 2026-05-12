# Argo Electronics - Backend

This is the backend for Argo Electronics, a full-stack ecommerce shop built with Spring Boot.

## What's here
- REST APIs for products, cart, orders, auth, admin stuff
- JWT security for login/register
- PostgreSQL database with entities like User, Product, Order
- Controllers, services, repositories - standard Spring setup

## Quick setup
1. Install Java 25, Maven, PostgreSQL
2. Create DB: `createdb argo_ecommerce`
3. Copy `backend/.env.example` to `backend/.env` and update values, or set equivalent environment variables.
4. Run: `mvn spring-boot:run`

Server starts at http://localhost:8080. Check APIs like `/api/products`.

### Seeded demo data
- Admin user: `admin@argo.com` / `Admin123!`
- Customer user: `customer@argo.com` / `Customer123!`
- Sample categories, products, and coupons are created automatically on first startup.

Built for reliability and security. Enjoy!
