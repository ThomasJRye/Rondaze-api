package com.example

import io.ktor.server.application.*
import com.example.models.*

fun main(args: Array<String>) {

    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {

    val databaseFactory = DatabaseFactory()
    databaseFactory.init()
    configureRouting()
}