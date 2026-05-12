<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->


## Uso de skills

A skill de UI já instalada em `agent/skills` continua sendo a fonte principal para interface, layout, componentes visuais e animações.

Use `agent/skills-external` apenas como apoio complementar:

- Para bugs: debugging-strategies
- Para validação antes de finalizar: lint-and-validate
- Para segurança: security-auditor
- Para APIs: api-design-principles
- Para frontend não visual: react/nextjs/tailwind quando aplicável
- Para documentação: docs/readme-related skills

Não altere, sobrescreva ou reorganize `agent/skills` sem pedido explícito.