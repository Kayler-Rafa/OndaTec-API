const express = require('express');
const router = express.Router();
const Professor = require('../models/Professor');
const { create } = require('../models/Aluno');

const professorController = {
    login: async (req, res) => {
        const { email, senha } = req.query;

        try {
        if(!email || !senha) {
            console.warn('Email e senha são obrigatórios');
            return res.status(400).json({
            sucess: false,
             message: "Email e senha são obrigatórios" });
        }

        const professor = await Professor.findOne({email});

        if(!professor){
            console.warn('Professor não encontrado');
                return res.status(404).json({
                sucess: false,
                message: "Professor não encontrado"
            });
        }

        if(professor.senha !== senha) {
            console.warn('Senha incorreta');
            return res.status(401).json({
                sucess: false,
                message: "Senha incorreta"
            });
        }  

        console.log('Login realizado com sucesso');
        return res.status(200).json({
            sucess: true,
            message: "Login realizado com sucesso"
        });
        }catch(err){
            console.error('Erro ao realizar login', err);
            return res.status(400).json({
                sucess: false,
                message: "Erro ao realizar login"
            });
        }
    },
    create: async (req, res) => {
        const { email, senha } = req.query;

        try {
            const professorExistente = await Professor.findOne({ email });

            if (professorExistente) {
                console.warn('Professor já cadastrado');
                return res.status(400).json({
                    success: false,
                    message: "Professor já cadastrado"
                });
            }

           const novoProfessor = new Professor({ email, senha });

            await novoProfessor.save();

        console.log('Professor cadastrado com sucesso');
        return res.status(200).json({
            sucess: true,
            message: "Professor cadastrado com sucesso",
            professor: novoProfessor
        });
        }catch(err){
            console.error('Erro ao cadastrar professor', err);
            return res.status(400).json({
                sucess: false,
                message: "Erro ao cadastrar professor"
            });
        }
    }
};

module.exports = professorController;