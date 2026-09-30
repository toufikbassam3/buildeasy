# BuildEasy backend and PostgreSQL

This project runs locally in Docker Compose: PostgreSQL stores the data, and the Node.js API serves the website and enforces account and order permissions. Payments are intentionally not included.

## Start or update the app

Open PowerShell in this folder and run:

```powershell
docker compose up -d --build
docker compose ps
```

The database keeps its existing `postgres_data` volume. Never use `docker compose down -v` unless you mean to permanently erase the database.

Open the website at `http://localhost:3000`. Confirm the API/database connection at `http://localhost:3000/api/health`.

The frontend is served on port 3000, the backend API listens on port 3001, and PostgreSQL listens on port 5432. The frontend's `/api` requests are proxied to the API by Nginx.

## User workflows

1. Customers create an account or sign in, enter a material requirement, and select an approved supplier.
2. Placing the order requires a customer account so the order has an owner and appears in their order history.
3. Suppliers register and wait for admin approval. Approved suppliers sign in, see orders assigned to them, and either decline or accept with a unit price and delivery date.
4. Customers can view status, price, supplier, delivery date, and tracking updates from **Login → View my orders**.
5. The supplier updates the order through processing, out for delivery, and delivered. An admin can review suppliers, manage materials, and oversee order progress.

Orders have no payment step. Supplier acceptance records the agreed unit price and total in PostgreSQL.

## First local admin account

Open **Admin Access** on the site. On the first admin login, enter your email and choose a private password with at least 12 characters. That creates the first admin account for this database. Keep the same email and password for later logins. The local Docker ports are bound to this computer only.

## Database backup and sharing

Follow [SHARE-WITH-FRIEND.md](SHARE-WITH-FRIEND.md) to export data and package the project. Never put `.env` in the ZIP or send it to anyone. A database backup can contain account and delivery information, so share it only with a trusted person.

## Items requiring real deployment choices

The local non-payment workflow is implemented, but public launch still needs a hosting/domain decision and security review, HTTPS with `COOKIE_SECURE=true`, email verification and password recovery, profile-photo storage, and operational backups/monitoring. Payment processing remains out of scope as requested. Do not expose this local starter publicly before that work.
