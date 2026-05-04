from django.db import models

class HomePageSettings(models.Model):
    # Hero
    hero_title = models.CharField("Título Principal", max_length=200, default="Excelência Técnica e Prática")
    hero_subtitle = models.TextField("Subtítulo", default="Bem-vindo à plataforma definitiva para profissionais de panificação, confeitaria e culinária.")
    
    # Quem Somos
    about_title = models.CharField("Título Quem Somos", max_length=200, default="Tradição e Qualidade desde o início")
    about_text1 = models.TextField("Texto Quem Somos (Parágrafo 1)")
    about_text2 = models.TextField("Texto Quem Somos (Parágrafo 2)", blank=True, null=True)
    about_stat1_title = models.CharField("Estatística 1 - Título", max_length=50, default="+60 Anos")
    about_stat1_desc = models.CharField("Estatística 1 - Descrição", max_length=100, default="de tradição no mercado")
    about_stat2_title = models.CharField("Estatística 2 - Título", max_length=50, default="Alta Tecnologia")
    about_stat2_desc = models.CharField("Estatística 2 - Descrição", max_length=100, default="nas unidades produtivas")
    
    # Onde Comprar
    where_to_buy_title = models.CharField("Título Onde Comprar", max_length=200, default="Onde Comprar")
    where_to_buy_text = models.TextField("Texto Onde Comprar")
    where_to_buy_phone = models.CharField("Telefone de Vendas", max_length=50, default="0800 000 0000")
    where_to_buy_hours = models.CharField("Horário de Atendimento", max_length=100, default="Segunda a Sexta, das 08h às 18h")

    class Meta:
        verbose_name = "Configuração da Home"
        verbose_name_plural = "Configurações da Home"

    def save(self, *args, **kwargs):
        # Garante que só exista uma instância (Singleton)
        if self.__class__.objects.exists() and not self.pk:
            self.pk = self.__class__.objects.first().pk
        super().save(*args, **kwargs)

    def __str__(self):
        return "Configurações Globais da Página Inicial"


class Tip(models.Model):
    title = models.CharField("Título", max_length=150)
    description = models.TextField("Descrição Curta")
    image_url = models.URLField("URL da Imagem", blank=True, null=True, help_text="Link para a imagem da dica")
    link = models.URLField("Link para Leitura Completa", blank=True, null=True)
    is_active = models.BooleanField("Ativo", default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Dica de Uso"
        verbose_name_plural = "Dicas de Uso"
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


class Brand(models.Model):
    name = models.CharField("Nome da Marca", max_length=100)
    link = models.URLField("Link do Site", blank=True, null=True)
    sort_order = models.IntegerField("Ordem de Exibição", default=0)
    is_active = models.BooleanField("Ativo", default=True)

    class Meta:
        verbose_name = "Marca Parceira"
        verbose_name_plural = "Marcas Parceiras"
        ordering = ["sort_order"]

    def __str__(self):
        return self.name
