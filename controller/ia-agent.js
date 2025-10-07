const { GoogleGenerativeAI } = require('@google/generative-ai')
require('dotenv').config()

const API_KEY = process.env.API_KEY_GOOGLE

exports.analyzeCsvWithGemini = async (req, res) => {
    try{
        if(!API_KEY){
            return res.status(500).json({ error: 'API_KEY_GOOGLE não configurada' })
        }
        const receiveFile = req?.file
        if(!receiveFile){
            return res.status(400).json({ error: 'CSV não enviado. Use multipart/form-data com campo "file" ou envie "csv" no body.' })
        }

        const csvText = receiveFile.buffer.toString('utf8') 

        const instruction = 'Analise o cvs e retorne qual melhor grupo RBAC se encaixa cada funcionario. Retorne uma tabela apenas com o nome dos funcionários, atribuição, grupo selectionado e uma breve justificativa, sem descrever sobre cada grupo.'
        const prompt = `${instruction}\n\nCSV:\n${csvText}`

        const genAI = new GoogleGenerativeAI(API_KEY)
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        return res.status(200).json(text)
    }catch(error){
        return res.status(500).json({ error: 'Erro ao analisar CSV com Gemini', details: error?.message || String(error) })
    }
}


