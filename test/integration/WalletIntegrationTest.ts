import { expect, request, use } from "chai";
import "chai-http";
import "mocha";
import app from "../../src/index";

// tslint:disable-next-line:no-var-requires
use(require("chai-http"));

describe("Wallet API request", () => {
  it("should return valid response", () => {
    return request(app)
      .get("/v1/wallets/balance")
      .query({walletAddress: "0x60E7ccd202FD2B807366Fd4450617Ad8350d86c7"})
      .then((res) => {
        const parsedResponse = JSON.parse(res.text);
        expect(parsedResponse).to.have.property("balance");
        expect(parsedResponse.balance).to.eql("18");
    });
  });

  it("should return invalid response with wrong wallet address", () => {
    return request(app)
      .get("/v1/wallets/balance")
      .query({walletAddress: "invalid address"})
      .then((res) => {
        const parsedResponse = JSON.parse(res.text);
        expect(parsedResponse).not.to.have.property("balance");
    });
  });
});
