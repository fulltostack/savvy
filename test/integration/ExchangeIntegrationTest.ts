import { expect, request, use } from "chai";
import "chai-http";
import "mocha";
import app from "../../src/index";

// tslint:disable-next-line:no-var-requires
use(require("chai-http"));

describe("Exchange API request", () => {
  it("should return valid response", () => {
    return request(app).get("/v1/exchanges/rates")
      .query({ toCurrency: "ETH", fromCurrency: "POLY", quantity: 1 })
      .then((res) => {
        const parsedResponse = JSON.parse(res.text);
        expect(parsedResponse).to.have.property("quote");
        expect(parsedResponse).to.have.property("price");
        expect(parsedResponse.quote).to.have.property("ETH");
      });
  });

  it("should return invalid response with invalid toCurrency", () => {
    return request(app).get("/v1/exchanges/rates")
      .query({ toCurrency: "INVALID", fromCurrency: "POLY", quantity: 1 })
      .then((res) => { expect(res.status).to.eql(404); });
  });
});
