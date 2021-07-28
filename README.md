# CoScience database

## Initialise prisma

```zsh
yarn add express
yarn add prisma
npx prisma init
```

`.env` file:

```
DATABASE_URL="postgresql://db_user:***************@localhost:5432/coscience-db?schema=publicc"
```

Make sure you add the `.env` file in the `.gitignore`

## Create table

In `schema.prisma`:

```prisma
model Users {
  id          Int       @id @default(autoincrement())
  firstName   String    @db.VarChar(255)
  lastName    String    @db.VarChar(255)
  email       String    @unique @db.VarChar(255)
  createdAt   DateTime  @default(now())
  wallets     String[]
  articles    Int[]
  comments    Int[]
  reviews     Int[]

  @@map(name: "users")
}
```

Then start postgres:

```zsh
sudo service postgresql start
```

And migrate with the command:

```zsh
npx prisma migrate dev --name init
```

## Do query on the database

```
yarn add @prisma/client
```

Then create an instance of the client each time the table change:

```
npx prisma generate
```

See [some script](https://github.com/RaphaelHardFork/coscience-db/blob/main/testingPrismaClient.js) to do query on the database
