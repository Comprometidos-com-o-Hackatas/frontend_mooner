const wsUrl = `ws://127.0.0.1:8001/ws/moon_wave/`

class MoonWaveService {
    async createMoonWave(channel) {
        try {
        const socket = new WebSocket(`${wsUrl}${encodeURIComponent(channel)}/`);
        return socket
        }
        catch (error) {
            console.log('erro no socket', error)
        }
    }
}

export default new MoonWaveService();