package com.example

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.http.*
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.*
import com.example.models.*

fun Application.configureRouting() {
    routing {
        get("/") {
            call.respondText("Hello, World!")
        }

        get("/HighScore/{UserId}") {
            val userIdParam = call.parameters["UserId"]
            val userId = userIdParam?.toIntOrNull()

            if (userId == null) {
                call.respond(io.ktor.http.HttpStatusCode.BadRequest, "Invalid user ID")
                return@get
            }

            val highscore = transaction {
                com.example.models.HighScore
                    .slice(com.example.models.HighScore.score)
                    .select { com.example.models.HighScore.user eq userId }
                    .orderBy(com.example.models.HighScore.score, org.jetbrains.exposed.sql.SortOrder.DESC)
                    .limit(1)
                    .firstOrNull()
                    ?.get(com.example.models.HighScore.score)
            }

            if (highscore != null) {
                call.respond(io.ktor.http.HttpStatusCode.OK, "Highscore for $userId is $highscore")
            } else {
                call.respond(io.ktor.http.HttpStatusCode.NotFound)
            }
        }
    }
}