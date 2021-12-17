const { createIPMap, createIPKey, eliminatedClicks } = require("../src/helper");
const clicks = require("./mock-data.json");

describe("Helper functions test", () => {
  describe("the createIPKey function", () => {
    it("should return ip-date-hour'", () => {
      const key = createIPKey(clicks[0].ip, clicks[0].timestamp);
      expect(key).toBe("22.22.22.22-3/11/2020-07");
    });

    it("should fail when wrong input is given", () => {
      const sample = () => {
        createIPKey();
      };
      expect(sample).toThrow("IP address is required");
    });
  });

  describe("the createIPMap function", () => {
    it("should return ip-date-hour -> amount'", () => {
      const map = createIPMap(clicks);
      expect(Object.keys(map).length).toBe(3);
    });

    it("should fail when wrong input is given", () => {
      const map = () => {
        createIPMap()();
      };
      expect(map).toThrow("clicks array should not be empty");
    });
  });

  describe("the elimnatedClicks function", () => {
    it("should eliminate frequency more than 10'", () => {
      const updatedClicks = eliminatedClicks(clicks);
      expect(updatedClicks.length).not.toBe(clicks.length);

      for (let click of updatedClicks) {
        expect(click.ip).not.toBe("33.33.33.33");
      }
    });

    it("should fail when wrong input is given", () => {
      const sample = () => {
        eliminatedClicks([]);
      };
      expect(sample).toThrow("No clicks data in clicks.json");
    });
  });
});
