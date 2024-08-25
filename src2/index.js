const { connectDB, getDB } = require('./config/db');

const { insertSurvey, getAllSurveys, getSurveyById, updateSurvey, deleteSurvey } = require('./surveyModule');
const { createAnswer, readAllAnswers, readAnswerById, updateAnswer, deleteAnswer } = require('./answerModule');
const { createQuestion, readAllQuestions, readQuestionById, updateQuestion, deleteQuestion } = require('./questionModule');

// Connexion à la base de données
connectDB().then(async () => {
    // Gestion des enquêtes
    await insertSurvey({
        idSurvey: 2,  // Changement d'ID pour éviter les conflits
        name: "Enquête de Satisfaction 002",
        description: "Deuxième enquête visant à évaluer la satisfaction des clients.",
        createdAt: "2024-08-13T10:00:00Z",
        createdBy: {
            employeeName: "Sid'Ahmed",
            employeeRole: "Gestionnaire"
        }
    });

    await getAllSurveys();
    await getSurveyById(2);
    await updateSurvey(2, { 
        name: "Enquête de Satisfaction 002 - Mise à jour", 
        description: "Mise à jour de project.",
        createdAt: "2024-08-13T10:00:00Z",
        createdBy: {
            employeeName: "Abdoul Ba",
            employeeRole: "Gestionnaire"
        }
    });
    await deleteSurvey(2);
    await getAllSurveys();

    // Gestion des questions
    await createQuestion(2, "Quelle est votre satisfaction globale ?", "rating", { minValue: 1, maxValue: 10, step: 1 }); // surveyId corrigé
    await readAllQuestions();
    await readQuestionById(2);  // ID corrigé pour correspondre à l'enquête
    await updateQuestion(2, { title: "Comment évalueriez-vous notre service ? (Mise à jour)" }); // ID corrigé
    await deleteQuestion(2);
    await readAllQuestions();

    // Gestion des réponses
    await createAnswer(2, [  // ID corrigé pour correspondre à l'enquête
        { title: "Très bien" }
    ]);
    await readAllAnswers();
    await readAnswerById(2);  // ID corrigé pour correspondre à la réponse
    await updateAnswer(2, { title: "Extrêmement satisfait" }); // ID corrigé
    await deleteAnswer(2);
    await readAllAnswers();
}).catch(err => {
    console.error("Erreur lors de la connexion à la base de données :", err.message);
});
