
function screenSizeDefinition() {
  return document.documentElement.clientWidth;
}


function screenCoefficient() {
  const width = screenSizeDefinition();
    if (width >= 1280) {
      return 3;
    } return 2;
  }

export { screenSizeDefinition, screenCoefficient }
