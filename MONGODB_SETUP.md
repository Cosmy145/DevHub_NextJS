# MongoDB Setup Instructions

## Error: Could not connect to MongoDB Atlas

You're seeing this error because:

1. **MongoDB URI is not set** - You need to add your MongoDB connection string to `.env`
2. **IP Address not whitelisted** - Your current IP needs to be added to MongoDB Atlas whitelist
3. **Network/Firewall issues** - Your network might be blocking the connection

## Quick Fix Steps:

### 1. Set up MongoDB Atlas (if you haven't already)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or sign in
3. Create a new cluster (free tier is fine)
4. Wait for the cluster to be created (takes a few minutes)

### 2. Get Your Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/...`)
4. Replace `<password>` with your actual database user password
5. Replace `<dbname>` with your database name (e.g., `events-db`)

### 3. Add to Environment Variables

Create or update `.env.local` file in your project root:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/events-db?retryWrites=true&w=majority
```

**Important:** Replace with your actual connection string!

### 4. Whitelist Your IP Address

1. In MongoDB Atlas, go to "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Either:
   - Click "Add Current IP Address" (recommended for development)
   - Or click "Allow Access from Anywhere" (0.0.0.0/0) - **less secure but easier for development**

### 5. Restart Your Dev Server

After adding the environment variable:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Alternative: Use Local MongoDB (for development)

If you want to develop locally without MongoDB Atlas:

### Install MongoDB locally:

**macOS (using Homebrew):**

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Then update your `.env.local`:**

```env
MONGODB_URI=mongodb://localhost:27017/events-db
```

## Verify Connection

After setting up, test your API:

```bash
curl http://localhost:3000/api/events
```

You should see:

```json
{
  "success": true,
  "count": 0,
  "data": []
}
```

## Common Issues

### Issue: "Authentication failed"

- Check your username and password in the connection string
- Make sure you created a database user (not your Atlas account)

### Issue: "IP not whitelisted"

- Add your IP to Network Access in Atlas
- Or temporarily allow all IPs (0.0.0.0/0)

### Issue: "Connection timeout"

- Check your firewall/network settings
- Try using a different network
- Verify the connection string is correct

## Need Help?

Check the MongoDB Atlas documentation:
https://www.mongodb.com/docs/atlas/getting-started/
