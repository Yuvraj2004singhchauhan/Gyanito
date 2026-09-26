import express from "express";
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  submitQuiz,
  updateQuiz,
  deleteQuiz,
} from "../../../controllers/quiz-controller.js";
import { auth } from "../../../middleware/auth.js";

const router = express.Router();

// Public: anyone can browse and take quizzes
router.get("/", getAllQuizzes);
router.get("/:id", getQuizById);
router.post("/submit", submitQuiz);

// Protected: only logged-in users (e.g. teachers/admins) can create or modify quizzes
router.post("/create", auth, createQuiz);
router.put("/update/:id", auth, updateQuiz);
router.delete("/delete/:id", auth, deleteQuiz);




export default router;
