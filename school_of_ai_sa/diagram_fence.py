"""Render Mermaid fences with their source retained for the diagram viewer."""

import base64
from html import escape

from pymdownx.superfences import fence_code_format


def mermaid_fence(source, language, class_name, options, md, **kwargs):
    """Wrap Material's native Mermaid block in an interactive viewer trigger."""
    diagram = fence_code_format(source, language, class_name, options, md, **kwargs)
    encoded_source = base64.b64encode(source.encode("utf-8")).decode("ascii")

    return (
        '<div class="diagram-viewer" role="button" tabindex="0" '
        'aria-label="Open diagram viewer" '
        f'data-mermaid-source="{escape(encoded_source, quote=True)}">'
        f"{diagram}"
        '<span class="diagram-viewer-hint" aria-hidden="true">'
        "Click to enlarge"
        "</span>"
        "</div>"
    )
