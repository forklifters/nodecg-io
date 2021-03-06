import { ServiceClient } from "nodecg-io-core/extension/types";
import { Packet, Sender } from "sacn";

export class SacnSenderServiceClient implements ServiceClient<Sender> {
    constructor(private sacn: Sender) {}

    getNativeClient(): Sender {
        return this.sacn;
    }

    /**
     * Send Payload via sACN
     *
     * The `payload` is an json object with following entries:
     *
     * DMX channel (1-512) : percentage value
     */
    sendPayload(payload: Record<number, number>): Promise<void> {
        return this.sacn.send({
            payload: payload,
            sourceName: "nodecg-io",
            priority: 100,
        });
    }

    /**
     * Send a Packet via sACN
     *
     * A `packet` is the low-level implementation of the E1.31 (sACN) protocol.
     * Constructed from either an existing `Buffer` or from `Options`.
     */
    sendPacket(packet: Packet): Promise<void> {
        return this.sacn.send(packet);
    }

    /**
     * Returns the Universe specified in the GUI
     */
    getUniverse(): number {
        return this.sacn.universe;
    }
}
