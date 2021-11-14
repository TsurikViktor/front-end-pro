const CHAT_URL = 'wss://fep-app.herokuapp.com';

export default class Chat {
    constructor(config) {
        this.config = config;
    }
    
    initChat() {
        this.socket = new WebSocket(CHAT_URL);

        this.socket.onopen = this.onOpenSocket.bind(this);
        this.socket.onclose = this.onCloseSocket.bind(this);
        this.socket.onmessage = this.onMessageSocket.bind(this);
    }

    onOpenSocket() {
        this.send(`System`, `New User Connected Chat`)
    }

    onCloseSocket() {
        alert(`System: Reconnected`);  
        this.initChat();
    }

    onMessageSocket(e) {
        this.config.onMessage && this.config.onMessage(JSON.parse(e.data));
    }
    
    send(username, message) {
        this.socket.send(
            JSON.stringify({
                name: username,
                message: message,
            })
        );
    }
}