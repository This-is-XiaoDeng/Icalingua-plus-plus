import oicqAdapter from './adapters/oicqAdapter'
import { config, userConfig } from './providers/configManager'
import { init as initSocketIo } from './providers/socketIoProvider'
import onebotAdapter from './adapters/onebotAdapter'

process.on('unhandledRejection', (error) => {
    console.error('UnhandledException: ', error)
})

export function initBridge(port: number, wsUrl: string) {
    console.log(`正在 127.0.0.1:${port} 上开启 Icalingua-Bidge-OICQ`)
    const adapter: typeof oicqAdapter = onebotAdapter
    config.onebot = wsUrl
    initSocketIo(adapter, port)
    adapter.createBot(userConfig.account)
}
