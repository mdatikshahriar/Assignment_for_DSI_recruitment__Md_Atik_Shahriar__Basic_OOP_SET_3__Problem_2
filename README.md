**Prerequisite**

1. Install [node](https://nodejs.org/de/download/)
2. Install [yarn](https://classic.yarnpkg.com/en/docs/install/)
3. Install [XAMPP](https://www.apachefriends.org/download.html)

*All the commands given below are for windows platform. Command on Linux and other platforms may vary.*

**How to run the server**

1. Go to the project root directory

2. Go to the "backend" directory

```
cd .\backend\
```

3. Install all the 'node' dependencies

```
npm install
```

4. Run 'XAMPP Control Panel' and start the 'Apache' and 'MySQL' server.

5. Go to 'MySQL' Admin Panel and create a database. Add a table in the database with the fields stated below.
Name - Type
i. id - varchar(10)
ii. name - varchar(100)
iii. url - varchar(200)
iv. img_url - varchar(200)
v. price - float
vi. createdAt - date
vii. updatedAt - date

6. Go to the "config" directory. Open the `database.js` file and edit the 'DTABASE_NAME', 'USER_NAME', 'PASSWORD' field according to your database.

7. Now run the server. It will be running on [localhost:3001](http://localhost:3001)
```
npm run dev
```

**How to run the frontend**

1. Go to the project root directory

2. Go to the "frontend" directory

```
cd .\frontend\
```

3. Install all the 'yarn' dependencies (it may take some times)
```
yarn install
```

4. Run the frontend client. It will be running on [localhost:3000](http://localhost:3000)
```
yarn start
```
