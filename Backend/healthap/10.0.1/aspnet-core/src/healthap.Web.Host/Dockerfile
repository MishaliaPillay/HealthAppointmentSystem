FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY ["src/healthap.Web.Host/healthap.Web.Host.csproj", "src/healthap.Web.Host/"]
COPY ["src/healthap.Web.Core/healthap.Web.Core.csproj", "src/healthap.Web.Core/"]
COPY ["src/healthap.Application/healthap.Application.csproj", "src/healthap.Application/"]
COPY ["src/healthap.Core/healthap.Core.csproj", "src/healthap.Core/"]
COPY ["src/healthap.EntityFrameworkCore/healthap.EntityFrameworkCore.csproj", "src/healthap.EntityFrameworkCore/"]
WORKDIR "/src/src/healthap.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/healthap.Web.Host", "src/healthap.Web.Host"]
COPY ["src/healthap.Web.Core", "src/healthap.Web.Core"]
COPY ["src/healthap.Application", "src/healthap.Application"]
COPY ["src/healthap.Core", "src/healthap.Core"]
COPY ["src/healthap.EntityFrameworkCore", "src/healthap.EntityFrameworkCore"]
WORKDIR "/src/src/healthap.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "healthap.Web.Host.dll"]
