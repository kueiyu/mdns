import makeMdns from 'multicast-dns';

// Initialize mDNS
const mdns = makeMdns();

// Configuration: Identity for this device
const MY_HOSTNAME = 'my-device.local';
const MY_IP = '192.168.1.100'; // Should be dynamic in production

console.log(`[mDNS] Service started. Listening as ${MY_HOSTNAME}...`);

/**
 * Event: Response
 * Log devices discovered on the network.
 */
mdns.on('response', (response) => {
    const answers = response.answers.map(a => `${a.name} -> ${a.data}`);
    if (answers.length > 0) {
        console.log('[Response] Discovered:', answers.join(', '));
    }
});

/**
 * Event: Query
 * Listen for peers looking for us.
 */
mdns.on('query', (query) => {
    // Check if the query matches our hostname
    const isAskingForMe = query.questions.some(q => q.name === MY_HOSTNAME);

    if (isAskingForMe) {
        console.log(`[Query] Peer requested ${MY_HOSTNAME}. Sending A Record...`);

        // Reply with our IP address
        mdns.respond({
            answers: [{
                name: MY_HOSTNAME,
                type: 'A',
                ttl: 300,
                data: MY_IP
            }]
        });
    }
});

// Example: Query the network for another device
console.log(`[Query] Broadcasting search for 'brunhilde.local'...`);
mdns.query({
    questions: [{
        name: 'brunhilde.local',
        type: 'A'
    }]
});
