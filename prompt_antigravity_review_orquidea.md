# Prompt para Antigravity — Review e Profissionalização do Site Linha Profissional Orquídea

Você é um agente sênior de produto, UI/UX, copywriting, SEO técnico, acessibilidade e engenharia front-end. Trabalhe diretamente neste repositório do **Site Linha Profissional Orquídea** para transformar o sistema em um site profissional, confiável, elegante e orientado à conversão.

O objetivo não é apenas “deixar bonito”. O objetivo é remover aparência genérica de site feito por IA/vibe coding e entregar uma experiência com cara de marca real de cosméticos profissionais.

---

## 1. Contexto do projeto

Este projeto é o site da **Linha Profissional Orquídea**, voltado para produtos profissionais de beleza/cabelo, com foco em apresentação de marca, catálogo de produtos, contato comercial e conversão via WhatsApp/formulário/catálogo.

O site precisa transmitir:

- Profissionalismo.
- Confiança.
- Sofisticação.
- Clareza comercial.
- Boa experiência mobile.
- Sensação de marca real, não template genérico.
- Foco em salões, profissionais da beleza, distribuidores e clientes interessados nos produtos.

---

## 2. Missão principal

Analise o projeto inteiro, identifique pontos com aparência genérica ou amadora e implemente melhorias reais no código para deixar o site mais profissional.

Você deve atuar em quatro frentes ao mesmo tempo:

1. **UX e conversão** — deixar a jornada mais clara e com CTAs melhores.
2. **UI e identidade visual** — remover cara de template/IA e padronizar componentes.
3. **Copywriting comercial** — substituir textos genéricos por textos mais específicos, elegantes e persuasivos.
4. **Qualidade técnica** — melhorar responsividade, SEO, acessibilidade, performance e organização do código.

---

## 3. Regras obrigatórias

Antes de alterar qualquer coisa:

1. Leia a estrutura do projeto.
2. Identifique o stack usado: Next.js, React, Vite, Astro, Vue, Laravel, HTML puro ou outro.
3. Leia arquivos importantes como `package.json`, `README`, arquivos de rotas, componentes, estilos e dados.
4. Entenda como o site está organizado antes de editar.
5. Rode, quando possível, os comandos existentes de lint, build e testes.

Durante a implementação:

- Não quebre rotas existentes.
- Não remova funcionalidades sem necessidade.
- Não invente depoimentos, avaliações, números, certificações, registros, prêmios ou promessas médicas/químicas que não existam no projeto.
- Não use “Lorem ipsum”.
- Não encha o site de animações sem propósito.
- Não adicione bibliotecas pesadas sem motivo forte.
- Não reescreva o projeto inteiro se melhorias incrementais resolverem.
- Priorize mobile-first.
- Preserve a identidade da marca Orquídea, mas refine a execução.
- Se faltar alguma informação real, use textos neutros e editáveis, ou deixe comentários claros indicando onde o cliente deve inserir dados reais.

---

## 4. Diagnóstico inicial obrigatório

Crie ou atualize um arquivo chamado:

```txt
REVIEW_ORQUIDEA.md
```

Nele, registre uma análise objetiva do estado atual do site com notas de 0 a 10 para:

| Área | Nota | Problemas encontrados | Melhorias feitas |
|---|---:|---|---|
| Posicionamento da marca |  |  |  |
| Copywriting |  |  |  |
| UI/Design visual |  |  |  |
| UX/Jornada |  |  |  |
| Mobile |  |  |  |
| Catálogo/produtos |  |  |  |
| Confiança/prova institucional |  |  |  |
| SEO |  |  |  |
| Performance |  |  |  |
| Acessibilidade |  |  |  |
| Qualidade do código |  |  |  |
| Conversão |  |  |  |

Depois do diagnóstico, implemente as melhorias mais importantes diretamente no projeto.

---

## 5. Melhorias de posicionamento e copy

Revise os textos principais para evitar frases genéricas como:

- “Qualidade e inovação”.
- “Produtos de alta performance”.
- “Soluções completas para seus cabelos”.
- “Beleza, cuidado e tecnologia”.

Substitua por mensagens mais concretas, comerciais e alinhadas com uma linha profissional.

### Direção de copy sugerida

Use uma linguagem elegante, clara e profissional. Exemplos de tom:

```txt
Tratamentos profissionais Orquídea para salões que buscam resultado visível, fragrância marcante e acabamento de alto padrão desde a primeira aplicação.
```

```txt
Fórmulas pensadas para a rotina de salão: aplicação prática, bom rendimento e acabamento perceptível no toque, brilho e alinhamento dos fios.
```

```txt
Conheça a linha profissional desenvolvida para valorizar protocolos de tratamento, finalização e cuidado capilar com apresentação premium.
```

### CTAs recomendados

Troque botões genéricos por ações claras:

- `Conhecer a linha profissional`
- `Ver produtos`
- `Solicitar catálogo`
- `Falar com um consultor`
- `Chamar no WhatsApp`
- `Quero informações para salão`
- `Quero ser distribuidor`
- `Montar pedido pelo WhatsApp`

### Mensagem padrão para WhatsApp

Quando houver CTA para WhatsApp, use uma mensagem pronta parecida com:

```txt
Olá, vim pelo site da Linha Profissional Orquídea e gostaria de receber mais informações sobre os produtos profissionais.
```

Se o projeto já tiver número de WhatsApp configurado, reutilize. Se não tiver, crie uma constante/configuração fácil de editar, por exemplo:

```txt
WHATSAPP_NUMBER = "INSERIR_NUMERO_AQUI"
```

Não invente número real.

---

## 6. Melhorias de UI e identidade visual

Remova a aparência de template genérico. Ajuste o design para parecer uma marca real.

Avalie e melhore:

- Hierarquia visual.
- Espaçamentos.
- Tipografia.
- Botões.
- Cards.
- Badges.
- Seções.
- Grids.
- Imagens.
- Header.
- Footer.
- Estados de hover/focus.
- Consistência entre páginas.

### Criar ou organizar design tokens

Se o projeto permitir, centralize padrões como:

- Cores.
- Fontes.
- Tamanhos de título.
- Espaçamentos.
- Border radius.
- Sombras.
- Breakpoints.
- Estilos de botão.
- Estilos de card.

Evite estilos soltos e repetidos.

### Direção visual desejada

O visual deve ser:

- Premium, mas não exagerado.
- Limpo, mas não vazio.
- Feminino/elegante, mas profissional.
- Comercial, mas não agressivo.
- Sofisticado, mas rápido e funcional.

Use detalhes discretos de acabamento, como melhor espaçamento, melhor contraste, badges elegantes, divisores sutis e cards mais bem estruturados.

---

## 7. Home page

A home deve responder em poucos segundos:

1. O que é a Linha Profissional Orquídea?
2. Para quem ela é?
3. Qual benefício principal ela entrega?
4. O que o usuário deve fazer agora?

### Estrutura sugerida para a home

Implemente ou reorganize a home com uma estrutura próxima desta:

1. **Hero premium**
   - Headline forte.
   - Subheadline clara.
   - CTA principal.
   - CTA secundário.
   - Imagem/visual de produto ou marca.

2. **Bloco de confiança rápida**
   - Exemplo: linha profissional, atendimento comercial, catálogo, produtos para rotina de salão.
   - Não inventar números ou selos.

3. **Benefícios da linha**
   - Resultado percebido.
   - Rendimento profissional.
   - Fragrância/apresentação.
   - Protocolos de uso.
   - Cuidado para salões e profissionais.

4. **Produtos ou categorias principais**
   - Cards com nome, indicação, benefício e CTA.

5. **Bloco para salões/profissionais**
   - Explicar como a linha ajuda na rotina profissional.

6. **Sobre a Orquídea**
   - Breve, concreto e confiável.

7. **FAQ comercial**
   - Como comprar?
   - Tem catálogo?
   - Atende salão?
   - Como falar com consultor?
   - Posso ser distribuidor?

8. **CTA final**
   - Chamada forte para WhatsApp, catálogo ou contato.

---

## 8. Produtos e catálogo

Se o projeto tiver catálogo, produtos ou cards de produtos, melhore a estrutura.

Cada produto deve apresentar, quando possível:

- Nome.
- Imagem.
- Categoria.
- Indicação.
- Benefícios.
- Ativos principais, somente se já existirem no conteúdo real.
- Modo de uso, se já existir ou se puder ser descrito de forma neutra.
- Volume/tamanho, se existir.
- CTA para contato.

### Estrutura sugerida de card de produto

```txt
Nome do produto
Categoria ou linha
Indicado para: [tipo de cabelo/necessidade]
Benefícios principais: [2 a 4 benefícios]
CTA: Quero este produto
```

### Regra importante

Não invente propriedades técnicas, ativos, registros, promessas de alisamento, cura, tratamento médico ou resultados garantidos. Quando faltar dado real, deixe o campo preparado para preenchimento.

---

## 9. Página “Sobre” ou bloco institucional

Evite textos genéricos.

A seção institucional deve responder:

- Quem é a Orquídea.
- Qual é a proposta da linha profissional.
- Que tipo de público atende.
- Por que a marca é confiável.
- Como o cliente pode entrar em contato.

Texto-base que pode ser adaptado:

```txt
A Linha Profissional Orquídea foi criada para atender rotinas de cuidado capilar com apresentação premium, comunicação clara e foco em quem trabalha com beleza todos os dias. Nosso objetivo é aproximar profissionais e clientes de produtos com experiência de uso marcante, bom acabamento e suporte comercial acessível.
```

Ajuste conforme o conteúdo real existente no projeto.

---

## 10. Confiança e prova social

Adicione ou melhore blocos de confiança sem inventar informações.

Elementos permitidos:

- Contato claro.
- WhatsApp visível.
- Instagram/redes sociais, se já existirem.
- Informações institucionais reais.
- FAQ.
- Política de privacidade, se existir.
- Termos básicos, se existirem.
- CTA para catálogo.
- Bloco “Atendimento para profissionais”.
- Bloco “Fale com um consultor”.

Elementos proibidos sem fonte real:

- Depoimentos falsos.
- Antes/depois fictício.
- Números inventados de clientes, salões ou distribuidores.
- Selos/certificações não comprovados.
- Registro Anvisa inventado.
- Prêmios inexistentes.

---

## 11. Mobile-first

Revise cuidadosamente a experiência em celular.

Corrija:

- Textos grandes demais.
- Botões pequenos demais.
- Cards muito longos.
- Espaçamentos exagerados.
- Menu mobile confuso.
- Hero com altura excessiva.
- Imagens cortadas de forma ruim.
- CTA fixo atrapalhando conteúdo.
- Quebras de linha ruins.
- Grid mal adaptado.

A experiência mobile deve permitir que o usuário:

1. Entenda a marca rapidamente.
2. Veja produtos.
3. Chame no WhatsApp.
4. Acesse contato/catálogo sem esforço.

---

## 12. SEO técnico

Implemente ou melhore, conforme o stack:

- `title` das páginas.
- `meta description`.
- H1 único por página.
- Hierarquia correta de H2/H3.
- URLs amigáveis.
- Alt text em imagens.
- Open Graph básico.
- Sitemap, se aplicável.
- Robots, se aplicável.
- Dados estruturados básicos, somente se fizer sentido.

Sugestões de titles:

```txt
Linha Profissional Orquídea | Produtos Profissionais para Cabelos
```

```txt
Produtos Orquídea Professional | Catálogo Profissional
```

Sugestão de meta description:

```txt
Conheça a Linha Profissional Orquídea: produtos para cuidados capilares, rotina de salão e atendimento comercial para profissionais da beleza.
```

Ajuste conforme o conteúdo real do projeto.

---

## 13. Acessibilidade

Corrija problemas de acessibilidade:

- Contraste adequado.
- Botões com texto claro.
- Links identificáveis.
- Labels em formulários.
- Estados de foco visíveis.
- Alt text nas imagens relevantes.
- HTML semântico.
- Navegação por teclado.
- Não depender apenas de cor.
- `aria-label` quando necessário.

---

## 14. Performance

Melhore performance sem prejudicar o visual.

Verifique:

- Imagens pesadas.
- Lazy loading.
- Imports desnecessários.
- Bibliotecas não usadas.
- CSS duplicado.
- Fontes externas em excesso.
- JavaScript desnecessário.
- Componentes pesados.
- Build warnings.

Quando possível:

- Use formatos modernos de imagem.
- Defina width/height nas imagens.
- Evite layout shift.
- Carregue imagens abaixo da dobra com lazy loading.
- Remova código morto.

---

## 15. Qualidade do código

Organize o código para manutenção.

Melhore:

- Componentização.
- Nomes de arquivos.
- Nomes de variáveis.
- Separação de dados e UI.
- Repetição de estilos.
- Repetição de componentes.
- Tipagem, se o projeto usar TypeScript.
- Tratamento de estados vazios.
- Tratamento de erro.
- Configuração central de links, WhatsApp, redes sociais e contatos.

Se houver conteúdo hardcoded repetido, centralize em algo como:

```txt
src/data/products.ts
src/data/site.ts
src/config/site.ts
```

Adapte ao padrão real do projeto.

---

## 16. Analytics e conversão

Se o projeto já tiver Google Analytics, Meta Pixel, GTM ou outro sistema, preserve e melhore eventos.

Se não tiver, não instale nada pesado sem necessidade. No mínimo, deixe CTAs com atributos fáceis de rastrear, por exemplo:

```html
<a data-event="whatsapp_click" data-source="hero">...</a>
```

Eventos importantes:

- Clique no WhatsApp.
- Clique em produto.
- Clique para solicitar catálogo.
- Envio de formulário.
- Clique em Instagram.
- Clique em “quero ser distribuidor”.

---

## 17. Checklist de aparência profissional

Ao final, o site deve cumprir estes critérios:

- A primeira dobra explica a proposta da marca.
- O CTA principal é claro.
- O texto não parece genérico de IA.
- O visual não parece template padrão.
- A identidade é consistente.
- O mobile está refinado.
- Os produtos estão melhor apresentados.
- Existe caminho claro para contato.
- WhatsApp/catálogo/formulário estão fáceis de acessar.
- O site transmite confiança.
- O SEO básico está implementado.
- Acessibilidade básica está correta.
- O build roda sem erros.
- O código ficou mais organizado do que antes.

---

## 18. Critérios de aceite

Considere o trabalho concluído somente quando:

1. Você tiver criado/atualizado `REVIEW_ORQUIDEA.md`.
2. A home tiver sido revisada em UX, copy e UI.
3. CTAs principais estiverem mais claros.
4. A experiência mobile tiver sido revisada.
5. O catálogo/produtos, se existirem, estiverem mais comerciais.
6. SEO básico tiver sido revisado.
7. Acessibilidade básica tiver sido revisada.
8. O código tiver sido limpo onde havia repetição óbvia.
9. O projeto passar no build/lint/testes disponíveis, ou você explicar exatamente por que algum comando falhou.
10. Você entregar um resumo final das alterações feitas.

---

## 19. Resultado final esperado

Ao terminar, apresente um resumo com:

```txt
Resumo das alterações:
- [alteração 1]
- [alteração 2]
- [alteração 3]

Arquivos alterados:
- [arquivo]
- [arquivo]

Comandos executados:
- [comando]

Resultado dos testes/build:
- [resultado]

Pendências ou dados que o cliente precisa fornecer:
- Número real de WhatsApp, se estiver faltando.
- Fotos reais de produto, se estiverem faltando.
- Dados reais de empresa, se estiverem faltando.
- Depoimentos reais, se quiser adicionar prova social.
```

---

## 20. Prioridade de execução

Siga esta ordem de prioridade:

1. Corrigir o que mais prejudica a percepção profissional.
2. Melhorar a home e primeira dobra.
3. Melhorar CTAs e conversão.
4. Refinar mobile.
5. Melhorar cards/páginas de produto.
6. Ajustar copy genérica.
7. Melhorar SEO e acessibilidade.
8. Limpar código e estilos repetidos.
9. Documentar tudo no `REVIEW_ORQUIDEA.md`.

Faça alterações reais no projeto. Não entregue apenas sugestões.
