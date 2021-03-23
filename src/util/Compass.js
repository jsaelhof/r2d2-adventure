/**
 * Defines the data associated with each compass point.
 * axis: Indicates if this compass point is in the X or Y axis.
 * heading: A single letter indicating the compass heading (N, E, S, or W)
 * vector: A value of "+" or "-" indicating whether the compass points in the positive or negative direction along the axis
 * toLeft: Indicates the compass heading to the left of this point
 * toRight: Indicates the compass heading to the right of this point
 * degress: Indicates the rotational degrees when facing in this direction. N is 0 and degress increase clockwise.
 */
const compassPoints = {
    "N": {
        axis: "Y",
        heading: "N",
        vector: "+",
        toLeft: "W",
        toRight: "E",
        degrees: 0
    },
    "E": {
        axis: "X",
        heading: "E",
        vector: "+",
        toLeft: "N",
        toRight: "S",
        degrees: 90
    },
    "S": {
        axis: "Y",
        heading: "S",
        vector: "-",
        toLeft: "E",
        toRight: "W",
        degrees: 180
    },
    "W": {
        axis: "X",
        heading: "W",
        vector: "-",
        toLeft: "S",
        toRight: "N",
        degrees: 270
    }
}

export default {
    /**
     * Get the obejct of data related to the specified compass heading.
     * @param {string} heading A value of N, E, S or W.
     */ 
    getCompassForHeading: function getCompassForHeading ( heading ) {
        return compassPoints[heading];
    },

    /**
     * Returns a random compass data point
     */
    getRandomHeading: function getRandomHeading () {
        return compassPoints[ [this.NORTH,this.EAST,this.SOUTH,this.WEST][ Math.floor(Math.random() * 4) ] ];
    },

    /**
     * Given a specific heading, returns the rotational degrees relative to North (0 degrees)
     * @param {string} heading A value of N, E, S or W.
     */
    headingToDegrees: function headingToDegrees ( heading ) {
        return compassPoints[heading].degrees;
    },

    /**
     * Returns the compass data 90 degrees to the right of the specified heading.
     * @param {string} fromHeading 
     */
    right90: function right90 ( fromHeading ) {
        return compassPoints[ compassPoints[fromHeading].toRight ];
    },

    /**
     * Returns the compass data 90 degrees to the left of the specified heading.
     * @param {string} fromHeading 
     */
    left90: function left90 ( fromHeading ) {
        return compassPoints[ compassPoints[fromHeading].toLeft ];
    },

    /**
     * Constant for North
     */
    NORTH: "N",

    /**
     * Constant for East
     */
    EAST: "E",

    /**
     * Constant for South
     */
    SOUTH: "S",

    /**
     * Constant for West
     */
    WEST: "W",

    /**
     * Constant for Y Axis
     */
    Y_AXIS: "Y",

    /**
     * Constant for X Axis
     */
    X_AXIS: "X",

    /**
     * Constant for Positive Vector
     */
    POS_VECTOR: "+",

    /**
     * Constant for Negative Vector
     */
    NEG_VECTOR: "-"
}