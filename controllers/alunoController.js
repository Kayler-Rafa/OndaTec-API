const express = require('express');
const router = express.Router();
const Aluno = require('../models/Aluno');

const alunoController = {
    login: async (req, res) => {
        const { email, senha } = req.query;

        try {
        if(!email || !senha) {
            console.warn('Email e senha são obrigatórios');
            return res.status(400).json({
            sucess: false,
             message: "Email e senha são obrigatórios" });
        }

        const aluno = await Aluno.findOne({email});

        if(!aluno){
            console.warn('Aluno não encontrado');
                return res.status(404).json({
                sucess: false,
                message: "Aluno não encontrado"
            });
        }

        if(aluno.senha !== senha) {
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
            const alunoExistente = await Aluno.findOne({ email });
            
            if (alunoExistente) {
                console.warn('Aluno já cadastrado');
                return res.status(400).json({
                    success: false,
                    message: "Aluno já cadastrado"
                });
            }
    
            const novoAluno = new Aluno({
                email,
                senha
            });

            await novoAluno.save();
    
            console.log('Aluno cadastrado com sucesso');
            return res.status(201).json({
                success: true,
                message: "Aluno cadastrado com sucesso",
                aluno: novoAluno,
            });
        } catch (error) {
            console.error('Erro ao cadastrar aluno', error);
            return res.status(500).json({
                success: false,
                message: "Erro ao cadastrar aluno"
            });
        }
    }
}
    module.exports = alunoController;
