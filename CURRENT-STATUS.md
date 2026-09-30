# BuildEasy backend checkpoint

## Implemented in the saved source

- PostgreSQL schema updates for accounts, order ownership, guest request claim tokens, supplier responses, delivery dates, and order status history.
- Customer/supplier registration and login with scrypt password hashes, server-side sessions, role checks, login throttling, same-origin mutation checks, and basic response security headers.
- Customer material requests, supplier selection, customer-owned order creation, customer order history, cancellation, and decline.
- Admin approval for suppliers and admin material/order controls.
- Supplier order desk: accept with a unit price and expected delivery date, decline, then move the order through fulfillment states. The database stores the agreed total and tracking updates.
- No payment processing, by request.

## Apply the latest code

The latest files are in this folder, but the Docker API image must be rebuilt so these changes and migration `004-marketplace-workflow.sql` are used. From PowerShell here, run:

```powershell
docker compose up -d --build
docker compose ps
```

Then reload the website at `http://localhost:3000` with Ctrl+F5. Confirm `http://localhost:3000/api/health` shows the database connected. The API listens on port 3001 behind the frontend proxy; PostgreSQL remains on port 5432.

## Still required before public launch

Choose a hosting/domain setup, enable HTTPS and `COOKIE_SECURE=true`, add email verification/password recovery and profile photo storage, set a private production admin bootstrap method, configure automated backups/monitoring, and get a security/business-rules review. The app currently runs locally only.

Do not share `.env`. The Explorer showed extra `POSTGRES_PASSWORD=...`-named files; these are not part of the handoff ZIP, but remove them in File Explorer and rotate the local database password before sharing any screenshots or project access.
