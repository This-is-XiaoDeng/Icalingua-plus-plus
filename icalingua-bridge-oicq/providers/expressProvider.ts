import express from 'express'
import sendImgTokenManager from '../utils/sendImgTokenManager'
import type oicqAdapter from '../adapters/oicqAdapter'
import { json } from 'body-parser'
import path from 'path'

export const app = express()
const parser = json({
    limit: '100mb',
})

export const initExpress = (adapter: typeof oicqAdapter) => {
    app.post('/api/:token/sendMessage', parser, (req, res) => {
        if (req.params.token && sendImgTokenManager.verify(req.params.token)) {
            adapter.sendMessage(req.body)
            res.sendStatus(202).end()
        } else res.sendStatus(403).end()
    })
}
function getAppBasePath() {
    try {
        // Electron 环境
        if (typeof require !== 'undefined' && require('electron')) {
            const { app } = require('electron')
            return app.getAppPath()
        }
        // 常规 Node.js 环境
        return require.main ? require.main.path : process.cwd()
    } catch (e) {
        return process.cwd()
    }
}

const basePath = getAppBasePath()
const staticPath = path.join(basePath, 'static', 'file-manager')
const recordsPath = path.join(basePath, 'data', 'records')

app.use('/file-manager', express.static(staticPath))
app.use('/records', express.static(recordsPath))
app.get('/ping', (req, res) => {
    res.json({
        code: '200',
        status: 'success',
        data: 'pong',
    })
})
