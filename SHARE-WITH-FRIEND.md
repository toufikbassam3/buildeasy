# Share BuildEasy with a friend

The project ZIP should contain the API, frontend, Docker Compose file, schema, and a PostgreSQL backup. **Do not share your `.env` file.** It contains your local database password. The ZIP command below lists only safe files and excludes `.env`.

## Create a complete handoff ZIP on your computer

Open PowerShell in this folder and run these commands one at a time:

```powershell
# Export the current database, including its schema and saved data.
docker compose exec -T db pg_dump -Fc -U buildeasy -d buildeasy -f /tmp/buildeasy-backup.dump

# Copy that database backup from Docker onto your computer.
docker cp buildeasy-postgres:/tmp/buildeasy-backup.dump .\buildeasy-backup.dump

# Package the app and backup. The private .env is deliberately not listed.
Compress-Archive -Path .\api, .\init, .\docker-compose.yml, .\README.md, .\SHARE-WITH-FRIEND.md, .\.env.example, .\buildeasy-backup.dump -DestinationPath .\BuildEasy-for-friend.zip -Force
```

Send `BuildEasy-for-friend.zip` to your friend through a private method. The database backup can contain delivery addresses and other saved details, so share it only with someone you trust.

## Friend: restore and run it

1. Extract the ZIP.
2. In the extracted folder, make a copy of `.env.example` named `.env`. Edit the password value to a private password they choose.
3. Open PowerShell in that extracted folder and run `docker compose up -d --build`.
4. Copy the backup into their PostgreSQL container and restore it:

   ```powershell
   docker cp .\buildeasy-backup.dump buildeasy-postgres:/tmp/buildeasy-backup.dump
   docker compose exec -T db pg_restore --clean --if-exists --no-owner -U buildeasy -d buildeasy /tmp/buildeasy-backup.dump
   ```

5. Open `http://localhost:3000` in their browser. The frontend uses port 3000, the API uses port 3001, and PostgreSQL uses port 5432.

The app persists materials, customer and supplier accounts, material requirements, supplier price/date responses, orders, and fulfillment tracking. Payment processing is intentionally not included. If the backup contains an admin account, give your friend the admin sign-in credentials through a separate private channel; never put passwords in the ZIP.

