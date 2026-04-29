import os
import django
from django.utils import timezone
from django.utils.text import slugify

# Configurar o ambiente Django para rodar scripts standalone
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from apps.products.models import ProductCategories, Products

catalog = {
    "FARINHAS ESPECIAIS 5KG": [
        "Farinha de Trigo Pães 5kg",
        "Farinha de Trigo Pizza 5kg",
        "Farinha de Trigo Massa Fresca 5kg",
        "Farinha Confeitaria 5kg",
        "Farinha Pastel, MF e derivados 5kg"
    ],
    "FARINHAS PANIFICAÇÃO": [
        "Farinha de Trigo Confeitaria 25kg",
        "Farinha de Trigo Pastel, Massas Frescas 25kg",
        "Farinha de Trigo Panificação 25kg",
        "Farinha de Trigo Panificação forte 25kg",
        "Farinha de Trigo Panificação Extrapan 25kg",
        "Farinha de Trigo Integral Fina 25kg",
        "Farinha de Trigo Centeio integral 25kg",
        "Farinha de Trigo Integral grossa 25kg"
    ],
    "MISTURA PARA PÃO FRANCÊS": [
        "Mistura para Pão Francês 25kg",
        "Mistura para Pão Francês Longa Fermentação 25kg",
        "Mistura para Pão Francês com Fibras 25kg",
        "Mistura para Pão Frances Extrapan 25kg",
        "Mistura para Pão Francês Congelado 25kg"
    ],
    "MISTURA PARA CAKES": [
        "Mistura Cake Chocolate 2kg",
        "Mistura Cake Laranja 2kg",
        "Mistura Cake Milho 2kg",
        "Mistura Cake Neutro 2kg",
        "Mistura Cake Cenoura 2kg"
    ],
    "MISTURA PARA BOLOS 5KG": [
        "Mistura para Bolo Sabor Chocolate 5kg",
        "Mistura para Bolo Sabor Chocolate Cremoso 5kg",
        "Mistura para Bolo Sabor Aipim 5kg",
        "Mistura para Bolo Sabor Milho Cremoso 5kg",
        "Mistura para Bolo Sabor Abacaxi 5kg",
        "Mistura para Bolo Sabor Baunilha 5kg",
        "Mistura para Bolo Sabor Cenoura 5kg",
        "Mistura para Bolo Sabor Coco 5kg",
        "Mistura para Bolo Sabor Cuca 5kg",
        "Mistura para Bolo Sabor Fubá 5kg",
        "Mistura para Bolo Sabor Laranja 5kg",
        "Mistura para Bolo Sabor Limão 5kg",
        "Mistura para Bolo Sabor Neutro 5kg"
    ],
    "RECHEIOS E COBERTURAS": [
        "Mistura Sonho 5kg",
        "Mistura Creme Confeiteiro 400g",
        "Mistura Creme Confeiteiro Instantâneo 1kg"
    ],
    "MISTURA PARA PÃES ESPECIAIS": [
        "Mistura Pão Mandioquinha 5kg",
        "Mistura Pão de Queijo 1kg",
        "Mistura Pão Batata 5kg",
        "Mistura Pão Centeio 5kg",
        "Mistura Pão Integral 34% 5kg",
        "Mistura Pão Multigrãos 5kg",
        "Mistura Pão de Ló 5kg",
        "Mistura Multi Receitas 5kg",
        "Mistura Pão Ciabatta 5kg",
        "Mistura Pão Italiano e Baguete 5kg",
        "Mistura Pão Brioche 5kg",
        "Mistura Pão Panetone 5kg",
        "Mistura Pão de ló e Chocolate 5kg",
        "Mistura Pão Pão Australiano 5kg",
        "Mistura Pão Integral (61%) 5kg",
        "Mistura Pão Hamburguer, Hot Dog e Forma 25kg",
        "Mistura Pão Hot Dog 25kg",
        "Mistura Pão Forma 25kg",
        "Mistura Pão Doce Especial 25kg"
    ],
    "FARINHA PANKO": [
        "Farinha Panko 1kg",
        "Farinha Panko Oriental 1020g"
    ],
    "FARINHA DE ROSCA": [
        "Farinha de Rosca 5kg",
        "Farinha de Rosca 25 Kg"
    ]
}

def run_import():
    print("Iniciando importação do catálogo...")
    sort_cat = 1
    sort_prod = 1
    total_cats = 0
    total_prods = 0
    
    for cat_name, products in catalog.items():
        # Busca ou cria a categoria
        category, created = ProductCategories.objects.get_or_create(
            name=cat_name,
            defaults={
                'is_active': True,
                'sort_order': sort_cat,
                'created_at': timezone.now()
            }
        )
        if created:
            print(f"[NOVA CATEGORIA] {cat_name}")
            total_cats += 1
        
        sort_cat += 1
        
        for prod_name in products:
            # Garante que o slug seja limpo e único
            base_slug = slugify(prod_name)
            slug = base_slug
            
            # Checa se o slug já existe caso o nome seja muito similar
            counter = 1
            while Products.objects.filter(slug=slug).exists() and not Products.objects.filter(name=prod_name).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
                
            # Cria ou pega o produto
            prod, p_created = Products.objects.get_or_create(
                name=prod_name,
                defaults={
                    'slug': slug,
                    'category': category,
                    'is_active': True,
                    'is_featured': False,
                    'sort_order': sort_prod,
                    'created_at': timezone.now()
                }
            )
            if p_created:
                print(f"  --> [NOVO PRODUTO] {prod_name}")
                total_prods += 1
            sort_prod += 1

    print(f"\n✅ Importação concluída! Categorias inseridas: {total_cats} | Produtos inseridos: {total_prods}")

if __name__ == '__main__':
    run_import()
