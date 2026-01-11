import { startMdnsServer } from './server.js';

// Start the server
const server = startMdnsServer();

// Example: Query immediately
console.log(`[Query] Broadcasting search for 'brunhilde.local'...`);
server.query({
    questions: [{
        name: 'brunhilde.local',
        type: 'A'
    }]
});
