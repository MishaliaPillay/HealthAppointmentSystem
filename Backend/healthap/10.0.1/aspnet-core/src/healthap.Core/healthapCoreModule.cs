using Abp.Localization;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Runtime.Security;
using Abp.Timing;
using Abp.Zero;
using Abp.Zero.Configuration;
using healthap.Authorization.Roles;
using healthap.Authorization.Users;
using healthap.Configuration;
using healthap.Domain.Location;
using healthap.Localization;
using healthap.MultiTenancy;
using healthap.Timing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Polly;
using Polly.Extensions.Http;
using System;
using System.Net.Http;

namespace healthap;

[DependsOn(typeof(AbpZeroCoreModule))]
public class healthapCoreModule : AbpModule
{
    public override void PreInitialize()
    {
        Configuration.Auditing.IsEnabledForAnonymousUsers = true;
        
        // Declare entity types
        Configuration.Modules.Zero().EntityTypes.Tenant = typeof(Tenant);
        Configuration.Modules.Zero().EntityTypes.Role = typeof(Role);
        Configuration.Modules.Zero().EntityTypes.User = typeof(User);
        
        healthapLocalizationConfigurer.Configure(Configuration.Localization);
        
        // Enable this line to create a multi-tenant application.
        Configuration.MultiTenancy.IsEnabled = healthapConsts.MultiTenancyEnabled;
        
        // Configure roles
        AppRoleConfig.Configure(Configuration.Modules.Zero().RoleManagement);
        
        Configuration.Settings.Providers.Add<AppSettingProvider>();
        
        Configuration.Localization.Languages.Add(new LanguageInfo("fa", "فارسی", "famfamfam-flags ir"));
        
        Configuration.Settings.SettingEncryptionConfiguration.DefaultPassPhrase = healthapConsts.DefaultPassPhrase;
        SimpleStringCipher.DefaultPassPhrase = healthapConsts.DefaultPassPhrase;
    }
    
    public override void Initialize()
    {
        IocManager.RegisterAssemblyByConvention(typeof(healthapCoreModule).GetAssembly());
    }
    
    public override void PostInitialize()
    {
        IocManager.Resolve<AppTimes>().StartupTime = Clock.Now;
    }

    // Add this to configure location-related services
    public void ConfigureServices(IServiceCollection services)
    {
        // Get configuration
        var configuration = IocManager.Resolve<IConfiguration>();

        // Add distributed memory cache for development/testing
        // In production, consider using Redis or other distributed cache
        services.AddDistributedMemoryCache(options =>
        {
            options.SizeLimit = 1024 * 1024 * 50; // 50 MB cache limit
        });
        
        // Register HttpClientFactory with resilience policies
        services.AddHttpClient("GeolocationApi")
            .AddPolicyHandler(GetRetryPolicy())
            .AddPolicyHandler(GetCircuitBreakerPolicy())
            .ConfigureHttpClient(client =>
            {
                // Set timeout from configuration or default to 5 seconds
                int timeoutSeconds = 5;
                if (int.TryParse(configuration["GeolocationApi:TimeoutSeconds"], out int configTimeout) && configTimeout > 0)
                {
                    timeoutSeconds = configTimeout;
                }
                client.Timeout = TimeSpan.FromSeconds(timeoutSeconds);
            });
        
        // Register the geolocation service
        services.AddTransient<IGeolocationService, GeolocationService>();
    }
    
    // Retry policy for transient HTTP errors
    private static IAsyncPolicy<HttpResponseMessage> GetRetryPolicy()
    {
        return HttpPolicyExtensions
            .HandleTransientHttpError() // HttpRequestException, 5XX, and 408 status codes
            .OrResult(msg => msg.StatusCode == System.Net.HttpStatusCode.TooManyRequests) // 429 status code
            .WaitAndRetryAsync(3, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));
    }
    
    // Circuit breaker policy to prevent overwhelming a failing service
    private static IAsyncPolicy<HttpResponseMessage> GetCircuitBreakerPolicy()
    {
        return HttpPolicyExtensions
            .HandleTransientHttpError()
            .CircuitBreakerAsync(5, TimeSpan.FromMinutes(1));
    }
}