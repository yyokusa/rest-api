"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategory = void 0;
const getCategory = (level) => {
    if (level < 20) {
        return "Bronze";
    }
    else if (level >= 20 && level < 50) {
        return "Silver";
    }
    else {
        return "Gold";
    }
};
exports.getCategory = getCategory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21tb24vdXRpbHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQU8sTUFBTSxXQUFXLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtJQUN6QyxJQUFJLEtBQUssR0FBRyxFQUFFLEVBQUU7UUFDZCxPQUFPLFFBQVEsQ0FBQztLQUNqQjtTQUFNLElBQUksS0FBSyxJQUFJLEVBQUUsSUFBSSxLQUFLLEdBQUcsRUFBRSxFQUFFO1FBQ3BDLE9BQU8sUUFBUSxDQUFDO0tBQ2pCO1NBQU07UUFDTCxPQUFPLE1BQU0sQ0FBQztLQUNmO0FBQ0gsQ0FBQyxDQUFBO0FBUlUsUUFBQSxXQUFXLGVBUXJCIn0=