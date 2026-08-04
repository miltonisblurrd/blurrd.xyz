import { useEffect } from "react";

type MermaidBlocksProps = {
  contentKey: string;
};

export function MermaidBlocks({ contentKey }: MermaidBlocksProps) {
  useEffect(() => {
    let cancelled = false;

    async function renderMermaid() {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>(
          ".prose-blog pre code.language-mermaid"
        )
      );

      if (nodes.length === 0) return;

      const mermaid = (await import("mermaid")).default;
      if (cancelled) return;

      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        securityLevel: "strict",
        fontFamily: "JetBrains Mono, ui-monospace, monospace",
        themeVariables: {
          primaryColor: "#eef0ff",
          primaryTextColor: "#1a1a1a",
          primaryBorderColor: "#6975f8",
          lineColor: "#7a7a7a",
          secondaryColor: "#fbfaf6",
          tertiaryColor: "#ffffff",
          background: "#fbfaf6",
          mainBkg: "#ffffff",
          nodeBorder: "#6975f8",
          clusterBkg: "#fbfaf6",
          titleColor: "#1a1a1a",
          edgeLabelBackground: "#fbfaf6",
        },
      });

      for (const [index, code] of nodes.entries()) {
        const pre = code.closest("pre");
        if (!pre || pre.dataset.mermaidRendered === "true") continue;

        const source = code.textContent?.trim() ?? "";
        if (!source) continue;

        const id = `mermaid-${contentKey}-${index}`.replace(
          /[^a-zA-Z0-9_-]/g,
          "-"
        );

        try {
          const { svg } = await mermaid.render(id, source);
          if (cancelled) return;

          const wrapper = document.createElement("div");
          wrapper.className = "mermaid-diagram";
          wrapper.setAttribute("role", "img");
          wrapper.setAttribute("aria-label", "Diagram");
          wrapper.innerHTML = svg;
          pre.dataset.mermaidRendered = "true";
          pre.replaceWith(wrapper);
        } catch (error) {
          console.error("Mermaid render failed:", error);
        }
      }
    }

    void renderMermaid();

    return () => {
      cancelled = true;
    };
  }, [contentKey]);

  return null;
}
