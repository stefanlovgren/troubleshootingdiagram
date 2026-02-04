/**
 * Run after Mermaid has rendered: round corners on diagram rects.
 * Node colors are set in Mermaid with style directives (see DIAGRAM-CATEGORIES.md).
 */
(function () {
  var ROUND_RADIUS = 10;

  function roundDiagramRects(container) {
    container.querySelectorAll('rect').forEach(function (rect) {
      rect.setAttribute('rx', ROUND_RADIUS);
      rect.setAttribute('ry', ROUND_RADIUS);
    });
  }

  function enhance() {
    document.querySelectorAll('.diagram-container').forEach(function (container) {
      var svg = container.querySelector('svg');
      if (!svg) return;
      roundDiagramRects(container);
    });
  }

  window.diagramEnhance = enhance;
})();
