import makeMdns from "multicast-dns";
const mdns = makeMdns();

mdns.on('response', function (response) {
    console.log('got a response packet:', response)
})

mdns.on('query', function (query) {
    console.log('got a query packet:', query)
})

// lets query for an A record for 'brunhilde.local'
mdns.query({
    questions: [{
        name: 'brunhilde.local',
        type: 'A'
    }]
})