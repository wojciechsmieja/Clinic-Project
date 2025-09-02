# This is a university group project - web application called 'Clinic', which serve as a system for registrators and doctors to organise patient's visits and medical examinations.

## Here are steps to run this project on your computer:
1. To connect to the PostgreSQL database, make sure PostgreSQL is installed on your computer, and add the following lines to the **/resources/application.properties** file:
```
***spring.datasource.url=jdbc:postgresql://localhost:5432/nameOfDatabase***
***spring.datasource.username=postgres***
***spring.datasource.password=PassForDatabase***
***spring.jpa.hibernate.ddl-auto=none***
***spring.jpa.show-sql=true***
***spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect***
```
2. There is an **SQL** file that you can download and import into the **PostgreSQL app** (Pg4Amin) on your computer to get the database ready.

3. Make sure you have **Node.js** installed on your computer, because this project is built with React.

To start server go to the **/frontend** folder in cmd and type there:
```
***npm install *** <- (to install all environment modules)
***npm start dev*** <- to start local server
```
