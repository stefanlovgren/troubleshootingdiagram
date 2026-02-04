/**
 * Run after Mermaid has rendered:
 * 1. Round corners on diagram rects
 * 2. Apply distinct colors by node type (override Mermaid inline styles)
 */
(function () {
  var ROUND_RADIUS = 10;

  var COLORS = {
    mainChartLink: { fill: '#a8dfda', stroke: '#1a7a6f' },
    subChartLink: { fill: '#f5c4b8', stroke: '#c94a32' },
    subChartNode: { fill: '#d4c8e8', stroke: '#5a4a9e' }
  };

  function applyColor(shape, fill, stroke, strokeWidth) {
    if (!shape) return;
    shape.setAttribute('fill', fill);
    shape.setAttribute('stroke', stroke);
    shape.setAttribute('stroke-width', strokeWidth || '2');
    shape.style.setProperty('fill', fill, 'important');
    shape.style.setProperty('stroke', stroke, 'important');
  }

  function setNodeColors(container) {
    var isMain = document.body.classList.contains('main-chart');
    var isSub = document.body.classList.contains('sub-chart');
    var svg = container.querySelector('svg');
    if (!svg) return;

    // Find node groups: <g> that contains a single node shape (rect or path), not edge/cluster
    var allG = container.querySelectorAll('svg g');
    allG.forEach(function (g) {
      if (g.closest('defs')) return;
      if (g.classList.contains('cluster') || g.classList.contains('edge')) return;
      if (g.querySelector('marker')) return;

      var shape = g.querySelector('rect') || g.querySelector('path');
      if (!shape || shape.closest('defs')) return;

      var isLink = !!g.querySelector('a');
      var fill, stroke, strokeWidth;

      if (isMain && isLink) {
        fill = COLORS.mainChartLink.fill;
        stroke = COLORS.mainChartLink.stroke;
        strokeWidth = '2.5';
      } else if (isSub && isLink) {
        fill = COLORS.subChartLink.fill;
        stroke = COLORS.subChartLink.stroke;
        strokeWidth = '2.5';
      } else if (isSub && !isLink) {
        fill = COLORS.subChartNode.fill;
        stroke = COLORS.subChartNode.stroke;
        strokeWidth = '2';
      } else if (isMain && !isLink) {
        return;
      } else {
        return;
      }

      applyColor(shape, fill, stroke, strokeWidth);
    });
  }

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
      setNodeColors(container);
    });
  }

  window.diagramEnhance = enhance;

  // Auto-run when DOM ready (for startOnLoad), with retries so we run after Mermaid
  function runAfterMermaid(retriesLeft) {
    var svg = document.querySelector('.diagram-container svg');
    if (svg) {
      enhance();
      return;
    }
    if (retriesLeft > 0) {
      setTimeout(function () { runAfterMermaid(retriesLeft - 1); }, 150);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(function () { runAfterMermaid(40); }, 300);
    });
  } else {
    setTimeout(function () { runAfterMermaid(40); }, 300);
  }
})();
