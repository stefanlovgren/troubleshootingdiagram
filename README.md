# Server installation troubleshooting (Mermaid)

A static site that presents **troubleshooting charts** for a complicated server installation. **Mermaid diagrams** are shown with text, and you **drill down by clicking** diagram nodes. The main page shows the high-level problem areas; each node links to a subpage with a **sub-chart** (troubleshooting flow for that area) and steps.

## Structure

- **index.html** – Main troubleshooting chart: problem areas (Installation failures, Network issues, Permissions, Services & config). Nodes are clickable and link to subpages.
- **architecture.html** – Installation failures: disk space → dependencies → logs → permissions → retry.
- **components.html** – Network issues: ping/DNS → firewall → ports → bind address.
- **data-flow.html** – Permissions: run-as user → directories → config files → SELinux/AppArmor.
- **api.html** – Services & config: status/logs → config → env → dependencies → restart.

Each **check step** in the sub-diagrams is clickable and opens an **instruction page** under **instructions/** that explains how to do that check (e.g. how to check disk space, how to check firewall, how to check service logs).

## How to run

Open the site with a local HTTP server so paths and scripts work correctly. From the project folder:

**Python 3:**
```bash
python -m http.server 8080
```

**Node (npx):**
```bash
npx serve -l 8080
```

Then open **http://localhost:8080** in your browser.

## Customizing

- **Main diagram**: Edit the `<pre class="mermaid">` block in `index.html`. Add more nodes and `click NodeId "subpage.html" "Tooltip"` lines to link to new subpages.
- **Subpages**: Duplicate one of the existing subpage HTML files, change the diagram in its `<pre class="mermaid">` block and the prose, and add a corresponding `click` on the main diagram.
- **Styling**: Adjust `styles.css` and the `themeVariables` in each page’s `mermaid.initialize()` if you want different colors or layout.

## Mermaid click syntax

To make a node open a page on click:

```text
click nodeId "page.html" "Optional tooltip"
```

Node IDs must match the IDs used in the flowchart (e.g. `A`, `B` in `A[Label]`).
