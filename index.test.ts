// index.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { startMdnsServer, MY_HOSTNAME, MY_IP } from './server';

const mockMdns = {
    on: vi.fn(),
    respond: vi.fn(),
    query: vi.fn()
};

describe('mDNS Server Logic', () => {
    
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should register event listeners upon startup', () => {
        startMdnsServer(mockMdns as any);
        expect(mockMdns.on).toHaveBeenCalledWith('query', expect.any(Function));
    });

    it('should respond with IP when receiving a query for MY_HOSTNAME', () => {
        startMdnsServer(mockMdns as any);
        const queryCallback = mockMdns.on.mock.calls.find(call => call[0] === 'query')![1];

        const fakeQueryPacket = {
            questions: [{ name: MY_HOSTNAME, type: 'A' }]
        };

        queryCallback(fakeQueryPacket);

        expect(mockMdns.respond).toHaveBeenCalledTimes(1);
        expect(mockMdns.respond).toHaveBeenCalledWith({
            answers: expect.arrayContaining([
                expect.objectContaining({
                    name: MY_HOSTNAME,
                    type: 'A',
                    data: MY_IP
                })
            ])
        });
    });

    it('should IGNORE queries for unrelated hostnames', () => {
        startMdnsServer(mockMdns as any);
        const queryCallback = mockMdns.on.mock.calls.find(call => call[0] === 'query')![1];

        const fakeQueryPacket = {
            questions: [{ name: 'google.com', type: 'A' }]
        };

        queryCallback(fakeQueryPacket);

        expect(mockMdns.respond).not.toHaveBeenCalled();
    });
});
