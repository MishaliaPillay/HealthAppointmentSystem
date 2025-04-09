FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY ["src/HealthAPP.Web.Host/HealthAPP.Web.Host.csproj", "src/HealthAPP.Web.Host/"]
COPY ["src/HealthAPP.Web.Core/HealthAPP.Web.Core.csproj", "src/HealthAPP.Web.Core/"]
COPY ["src/HealthAPP.Application/HealthAPP.Application.csproj", "src/HealthAPP.Application/"]
COPY ["src/HealthAPP.Core/HealthAPP.Core.csproj", "src/HealthAPP.Core/"]
COPY ["src/HealthAPP.EntityFrameworkCore/HealthAPP.EntityFrameworkCore.csproj", "src/HealthAPP.EntityFrameworkCore/"]
WORKDIR "/src/src/HealthAPP.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/HealthAPP.Web.Host", "src/HealthAPP.Web.Host"]
COPY ["src/HealthAPP.Web.Core", "src/HealthAPP.Web.Core"]
COPY ["src/HealthAPP.Application", "src/HealthAPP.Application"]
COPY ["src/HealthAPP.Core", "src/HealthAPP.Core"]
COPY ["src/HealthAPP.EntityFrameworkCore", "src/HealthAPP.EntityFrameworkCore"]
WORKDIR "/src/src/HealthAPP.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "HealthAPP.Web.Host.dll"]
