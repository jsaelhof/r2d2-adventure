export default {
    /**
     * Constant for number of grid spaces in the X direction
     */
    X_SIZE: 100,

    /**
     * Constant for number of grid spaces in the Y direction
     */
    Y_SIZE: 100,

    /**
     * Constant for number of pixels in the X direction
     */
    WIDTH: 800,

    /**
     * Constant for number of pixels in the Y direction
     */
    HEIGHT: 800,

    /**
     * Constant for number of pixels in a grid space
     */
    GRID_SIZE: 8,

    /**
     * Returns a random X,Y point on the surface
     */
    getRandomCoordOnSurface: function getRandomCoordOnSurface () {
        let x = Math.floor(Math.random() * this.X_SIZE);
        let y = Math.floor(Math.random() * this.Y_SIZE);
        return { x:x, y:y };
    }
}