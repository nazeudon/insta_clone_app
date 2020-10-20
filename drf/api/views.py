from rest_framework import generics
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from . import serializers
from .models import Profile, Post, Comment


# createに特化した汎用APIViewを継承
# settingsでPermissionをdefaultでJWT認証を通らないとViewにアクセスできないようにしている
# アカウント作成画面は誰でもアクセスできるようにしたいのでAllowAnyを用いる
class CreateUserView(generics.CreateAPIView):
    serializer_class = serializers.UserSerializer
    permission_classes = (AllowAny, )


# profileSerializerでuserProfileをread_onlyにカスタムしたのでperform_createをオーバーライト
# userProfileにログインユーザーを割り当てる
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(userProfile=self.request.user)


# get_queryset関数のfilterでログインしているユーザーのみのプロフィールを返す
class MyProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer

    def get_queryset(self):
        return self.queryset.filter(userProfile=self.request.user)


# postSerializerでuserPostをread_onlyにカスタムしたのでperform_createをオーバーライト
# userPostにログインユーザーを割り当てる
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = serializers.PostSerializer

    def perform_create(self, serializer):
        serializer.save(userPost=self.request.user)


# commentSerializerでuserCommentをread_onlyにカスタムしたのでperform_createをオーバーライト
# userCommentにログインユーザーを割り当てる
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = serializers.CommentSerializer

    def perform_create(self, serializer):
        serializer.save(userComment=self.request.user)
