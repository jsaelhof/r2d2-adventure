import Resize from './Resize';

it ('Should not apply dyanmic styling when resizing if the game is not on the DOM', () => {
    // Set up our document body
    document.body.innerHTML =
    '<div id="root"/>'

    // Change the viewport to 900px x 400px.
    // This viewport is too short and narrow. It should not apply any transform to the root.
    global.innerWidth = 900;
    global.innerHeight = 400;
    Resize();
    expect(document.getElementById("root").style.transform).toBe("");
} );