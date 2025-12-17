# MongoDB Connection Usage Examples

## Environment Setup

Add the following to your `.env` or `.env.local` file:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

## Usage in API Routes

### Example: GET Request

```typescript
// src/app/api/users/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User"; // Your Mongoose model

export async function GET() {
  try {
    // Connect to database
    await connectDB();

    // Query your data
    const users = await User.find({});

    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
```

### Example: POST Request

```typescript
// src/app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await connectDB();

    // Parse request body
    const body = await request.json();

    // Create new user
    const user = await User.create(body);

    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create user" },
      { status: 500 }
    );
  }
}
```

## Usage in Server Components

```typescript
// src/app/users/page.tsx
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export default async function UsersPage() {
  // Connect to database
  await connectDB();

  // Fetch data
  const users = await User.find({}).lean(); // .lean() returns plain JS objects

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id.toString()}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Example Mongoose Model

```typescript
// src/models/User.ts
import mongoose, { Schema, Model, Document } from "mongoose";

// Define the User interface
export interface IUser extends Document {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the User schema
const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      maxlength: [60, "Name cannot be more than 60 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Prevent model recompilation in development
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
```

## Key Features of the Connection

1. **Connection Caching**: Prevents multiple connections in serverless environments
2. **Hot-Reload Safe**: Works seamlessly with Next.js development mode
3. **Error Handling**: Properly handles connection failures and retries
4. **TypeScript Support**: Fully typed with no `any` types
5. **Production Ready**: Optimized for both development and production

## Best Practices

1. Always call `connectDB()` before database operations
2. Use `.lean()` when fetching data for React components (converts to plain objects)
3. Handle errors appropriately in try-catch blocks
4. Keep your MongoDB URI in environment variables
5. Use Mongoose models to prevent recompilation with the pattern shown above
