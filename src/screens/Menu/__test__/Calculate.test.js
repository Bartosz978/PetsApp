import { calculateDistance } from "../Calculate"

describe('Distance calculations', () => {

    it('No distance', () => {
        const r = calculateDistance(0, 0, 0, 0);
        expect(r).toEqual("0")
    })

    it('Distance along longitude', () => {
        const r = calculateDistance(-6.2000, 106.8167, -6.2000, 103.8198);
        expect(r).toEqual("331.29")
    })

    it('Distance along latitude', () => {
        const r = calculateDistance(-6.2000, 106.8167, 1.3521, 106.8167);
        expect(r).toEqual("839.76")
    })

    it('Distance along longitude and latitude', () => {
        const r = calculateDistance(-6.2000, 106.8167, 1.3521, 103.8198);
        expect(r).toEqual("903.26")
    })

    it('Changing order does not affect distance', () => {
        const r = calculateDistance(1.3521, 103.8198, -6.2000, 106.8167);
        expect(r).toEqual("903.26")
    })

})