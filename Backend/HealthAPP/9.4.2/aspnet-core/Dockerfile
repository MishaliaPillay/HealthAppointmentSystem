


FROM mcr.microsoft.com/dotnet/sdk:8.0.201 AS build
 
WORKDIR /src
COPY *.sln ./
COPY src/ ./src/
RUN dotnet restore ./src/HealthAPP.Web.Host/HealthAPP.Web.Host.csproj
RUN dotnet publish ./src/HealthAPP.Web.Host/HealthAPP.Web.Host.csproj -c Release -o /app/publish
 
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
 
ENV ASPNETCORE_ENVIRONMENT=Docker
ENV ASPNETCORE_URLS=http://+:80
 
EXPOSE 80
ENTRYPOINT ["dotnet", "HealthAPP.Web.Host.dll"]