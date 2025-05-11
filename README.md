This is a university group project - web application called 'Clinic' and serve as a system for registrators and doctors organise patients visits and medical examinations.

To connect to the PostgreSQL database, make sure PostgreSQL is installed on your computer, and add the following lines to the /resources/application.properties file:
spring.datasource.url=jdbc:postgresql://localhost:5432/nameOfDatabase
spring.datasource.username=postgres
spring.datasource.password=PassForDatabase

spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

There is in this repo a SQL file, which you can download and import to postgreSQL app on your computer.

Make sure you have Node.js installed on your computer, because this project is built with React.
To start server go to /frontend folder in cmd and type there:
npm install (only once)
npm start dev
