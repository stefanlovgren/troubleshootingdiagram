# Diagram node categories and styles

Use these three categories in every Mermaid diagram and add the matching `style` lines so nodes look consistent.

## 1. Link to diagram (top level / sub-page with diagram)

**When:** Node links to a page that has another Mermaid diagram (e.g. main chart → Installation failures, Network issues; or a section that shows a sub-flow).

**Mermaid style:**
```text
style NodeId fill:#a8dfda,stroke:#1a7a6f,stroke-width:2px
```

**Example (main chart):** `A`, `B`, `C`, `D` on index.

---

## 2. Link to sub-page (no diagram)

**When:** Node links to a page that has no diagram (e.g. instruction / how-to page).

**Mermaid style:**
```text
style NodeId fill:#f5c4b8,stroke:#c94a32,stroke-width:2px
```

**Example (sub-diagrams):** CheckDisk, Status, Ping, User, etc. — nodes that have `click NodeId "instructions/..."`.

---

## 3. Level in hierarchy — step only (no link)

**When:** Node is part of the flow but has no link (e.g. “Service problem?”, “Restart or fix config”, “Install failed?”).

**Mermaid style:**
```text
style NodeId fill:#d4c8e8,stroke:#5a4a9e,stroke-width:2px
```

**Example (sub-diagrams):** Start, Restart, Retry, Resolve, Fix, etc.

---

## Summary

| Category              | Use when                         | Fill     | Stroke   |
|-----------------------|-----------------------------------|----------|----------|
| Link to diagram       | Links to a page with a diagram   | `#a8dfda`| `#1a7a6f`|
| Link to sub-page      | Links to instruction (no diagram)| `#f5c4b8`| `#c94a32`|
| Step only (no link)   | Flow step, not clickable         | `#d4c8e8`| `#5a4a9e`|

Add one `style NodeId ...` line per node in your flowchart so each box gets the right style.
