import os
import django
import shutil
from django.utils.text import slugify
from django.core.files import File
from pathlib import Path

# Configuração do Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from apps.products.models import Products

def normalize_to_set(text):
    """Retorna um set de palavras normalizadas."""
    ignore_terms = ['de', 'para', 'sabor', 'sem', 'fundo', '2', 'com', 'e', 'derivados', 'orquidea', 'mf', 'extra']
    s = slugify(text).replace('-', ' ')
    words = {w for w in s.split() if w not in ignore_terms and len(w) > 1}
    return words

def run_bulk_upload():
    base_path = Path("c:/OrquideaProfissional-Dev/3d/3D")
    if not base_path.exists():
        print(f"Erro: Pasta {base_path} não encontrada.")
        return

    print("Iniciando mapeamento de imagens melhorado...")
    
    products = list(Products.objects.all())
    # Mapeia sets de palavras para produtos
    product_data = [(normalize_to_set(p.name), p) for p in products]
    
    results = []
    matches_found = 0
    
    # Coleta todos os arquivos primeiro
    all_files = list(base_path.rglob("*.png"))
    print(f"Total de arquivos encontrados: {len(all_files)}")

    for file_path in all_files:
        filename = file_path.stem
        clean_filename = filename.replace('_', ' ').replace('-', ' ')
        file_words = normalize_to_set(clean_filename)
        
        best_match = None
        highest_score = 0
        
        for p_words, product in product_data:
            if not p_words or not file_words:
                continue
                
            # Calcula interseção de palavras
            intersection = p_words.intersection(file_words)
            # Score baseado no quanto as palavras do produto estão no arquivo (ou vice-versa)
            score = len(intersection) / max(len(p_words), len(file_words))
            
            if score > highest_score:
                highest_score = score
                best_match = product
        
        # Considera um match se o score for alto (ex: 60%)
        if best_match and highest_score >= 0.6:
            print(f"OK ({highest_score:.2f}): {file_path.name} --> {best_match.name}")
            
            with open(file_path, 'rb') as f:
                best_match.image_url.save(file_path.name, File(f), save=True)
            
            results.append({"file": file_path.name, "product": best_match.name, "status": "Sucesso", "score": f"{highest_score:.2f}"})
            matches_found += 1
        else:
            print(f"ERRO: {file_path.name} (Palavras: {file_words})")
            results.append({"file": file_path.name, "product": "Não encontrado", "status": "Falha", "score": "0.00"})

    # Salva relatório em Markdown
    report_path = "c:/OrquideaProfissional-Dev/bulk_upload_report.md"
    with open(report_path, "w", encoding="utf-8") as r:
        r.write("# Relatório de Importação de Imagens\n\n")
        r.write(f"Total de arquivos: {len(all_files)} | Sucessos: {matches_found}\n\n")
        r.write("| Arquivo | Produto Vinculado | Status | Precisão |\n")
        r.write("| :--- | :--- | :--- | :--- |\n")
        for res in results:
            r.write(f"| {res['file']} | {res['product']} | {res['status']} | {res['score']} |\n")

    print(f"\nConcluído! {matches_found} imagens vinculadas. Relatório salvo em bulk_upload_report.md")

if __name__ == "__main__":
    run_bulk_upload()
