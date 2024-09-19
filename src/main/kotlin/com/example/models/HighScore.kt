package com.example.models

import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.ReferenceOption
import com.example.models.Users

object HighScore : IntIdTable() {
    val score = integer("score")
    val user = reference("user_id", Users, onDelete = ReferenceOption.CASCADE)
}