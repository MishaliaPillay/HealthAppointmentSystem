FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY ["src/HealthAppointmentSystem.Web.Host/HealthAppointmentSystem.Web.Host.csproj", "src/HealthAppointmentSystem.Web.Host/"]
COPY ["src/HealthAppointmentSystem.Web.Core/HealthAppointmentSystem.Web.Core.csproj", "src/HealthAppointmentSystem.Web.Core/"]
COPY ["src/HealthAppointmentSystem.Application/HealthAppointmentSystem.Application.csproj", "src/HealthAppointmentSystem.Application/"]
COPY ["src/HealthAppointmentSystem.Core/HealthAppointmentSystem.Core.csproj", "src/HealthAppointmentSystem.Core/"]
COPY ["src/HealthAppointmentSystem.EntityFrameworkCore/HealthAppointmentSystem.EntityFrameworkCore.csproj", "src/HealthAppointmentSystem.EntityFrameworkCore/"]
WORKDIR "/src/src/HealthAppointmentSystem.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/HealthAppointmentSystem.Web.Host", "src/HealthAppointmentSystem.Web.Host"]
COPY ["src/HealthAppointmentSystem.Web.Core", "src/HealthAppointmentSystem.Web.Core"]
COPY ["src/HealthAppointmentSystem.Application", "src/HealthAppointmentSystem.Application"]
COPY ["src/HealthAppointmentSystem.Core", "src/HealthAppointmentSystem.Core"]
COPY ["src/HealthAppointmentSystem.EntityFrameworkCore", "src/HealthAppointmentSystem.EntityFrameworkCore"]
WORKDIR "/src/src/HealthAppointmentSystem.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "HealthAppointmentSystem.Web.Host.dll"]
