let chakram = require('chakram');
expect = chakram.expect;

describe("HTTP assertions", function () {
    it("should make HTTP assertions easy", function () {
      let response = chakram.get("http://httpbin.org/get?test=chakram");
      expect(response).to.have.status(200);
      expect(response).to.have.header("content-type", "application/json");
      expect(response).not.to.be.encoded.with.gzip;
      expect(response).to.comprise.of.json({
        args: { test: "chakram" }
      });
      return chakram.wait();
    });
  }); 

  xdescribe("Promises", function () {
    it("should support asserting Biggie's best track", function () {
      let artist = "Notorious B.I.G.";
      return chakram.get("https://api.spotify.com/v1/search?q="+artist+"&type=artist")
      .then(function (searchResponse) {
        let bigID = searchResponse.body.artists.items[0].id;
        return chakram.get("https://api.spotify.com/v1/artists/"+bigID+"/top-tracks?country=GB");
      })
      .then(function (topTrackResponse) {
        let topTrack = topTrackResponse.body.tracks[0];
        expect(topTrack.name).to.contain("Old Thing Back");
      });
    });
  });  

  describe("BDD + Hooks", function () {
    let thingName;
    before("post dweet", function () {
      thingName = "chakramtest" + Math.floor(Math.random()*2000);
      return chakram.post("https://dweet.io/dweet/for/"+thingName, {
        testing: "your API"
      });
    });
    
    it("should support getting latest dweet", function () {
      let postedData = chakram.get("https://dweet.io/get/latest/dweet/for/"+thingName);
      return expect(postedData).to.have.json('with[0].content', {
        testing: "your API"
      });
    });
    
    after("update dweet with result", function () {
      return chakram.post("https://dweet.io/dweet/for/" + thingName, {
        testing: "passed"
      });
    });
  });

  describe("Extensibility", function () {
    before("define teapot", function () {
      chakram.addProperty("teapot", function (respObj) {
        let statusCode = respObj.response.statusCode;
        this.assert(statusCode === 418,
          'expected status code ' + statusCode + ' to equal 418',
          'expected ' + statusCode + ' to not be equal to 418');
      });
    });
  
    it("should be able to detect teapots", function () {
      let notATeapot = chakram.get("http://httpbin.org/status/200");
      let aTeapot = chakram.get("http://httpbin.org/status/418");
      expect(notATeapot).to.not.be.teapot;
      expect(aTeapot).to.be.teapot;
      return chakram.wait();
    });
  });
