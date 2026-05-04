from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import HomePageSettings
from .serializers import HomePageSettingsSerializer

class HomePageDataView(APIView):
    permission_classes = [AllowAny] # Público! Não precisa de token.

    def get(self, request):
        settings = HomePageSettings.objects.first()
        if not settings:
            # Retorna dados default se ainda não foi criado no admin
            settings = HomePageSettings.objects.create()
        
        serializer = HomePageSettingsSerializer(settings)
        return Response(serializer.data)
