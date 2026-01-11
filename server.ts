import makeMdns from "multicast-dns";

export const MY_HOSTNAME = 'my-device.local';
export const MY_IP = '192.168.1.100';

export function startMdnsServer(mdnsInstance = makeMdns()) {
    console.log(`[mDNS] Service started. Listening as ${MY_HOSTNAME}...`);

    mdnsInstance.on('query', (query) => {
        const isAskingForMe = query.questions.some(q => q.name === MY_HOSTNAME);

        if (isAskingForMe) {
            console.log(`[Query] Peer requested ${MY_HOSTNAME}. Sending A Record...`);
            mdnsInstance.respond({
                answers: [{
                    name: MY_HOSTNAME,
                    type: 'A',
                    ttl: 300,
                    data: MY_IP
                }]
            });
        }
    });

    mdnsInstance.on('response', (response) => {
        const answers = response.answers.map(a => `${a.name} -> ${a.data}`);
        if (answers.length > 0) {
            console.log('[Response] Discovered:', answers.join(', '));
        }
    });

    return mdnsInstance;
}
