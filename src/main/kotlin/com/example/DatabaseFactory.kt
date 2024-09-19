package com.example

import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.StdOutSqlLogger
import org.jetbrains.exposed.sql.addLogger
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.insertAndGetId
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.statements.InsertStatement
import com.example.models.Users
import com.example.models.HighScore

class DatabaseFactory {
    fun init() {
        Database.connect("jdbc:h2:mem:test;DB_CLOSE_DELAY=-1", driver = "org.h2.Driver")

        transaction {
            addLogger(StdOutSqlLogger)

            // Create tables
            SchemaUtils.create(Users, HighScore)


            val userId = Users.insertAndGetId {
                it[Users.name] = "Jane Doe"
            }

            // Create a high score for the user
            HighScore.insert {
                it[HighScore.score] = 1000
                it[HighScore.user] = userId
            }

            // Query and print data
            Users.selectAll().forEach { resultRow ->
                println("${resultRow[Users.id]}: ${resultRow[Users.name]}")
            }


        }
    }
}