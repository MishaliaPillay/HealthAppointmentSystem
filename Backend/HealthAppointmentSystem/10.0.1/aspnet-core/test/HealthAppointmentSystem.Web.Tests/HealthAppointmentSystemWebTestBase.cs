using Abp.AspNetCore.TestBase;
using Abp.Authorization.Users;
using Abp.Extensions;
using Abp.Json;
using Abp.MultiTenancy;
using Abp.Web.Models;
using HealthAppointmentSystem.EntityFrameworkCore;
using HealthAppointmentSystem.Models.TokenAuth;
using HealthAppointmentSystem.Web.Startup;
using AngleSharp.Html.Dom;
using AngleSharp.Html.Parser;
using Microsoft.AspNetCore.Hosting;
using Shouldly;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace HealthAppointmentSystem.Web.Tests;

public abstract class HealthAppointmentSystemWebTestBase : AbpAspNetCoreIntegratedTestBase<Startup>
{
    protected static readonly Lazy<string> ContentRootFolder;

    static HealthAppointmentSystemWebTestBase()
    {
        ContentRootFolder = new Lazy<string>(WebContentDirectoryFinder.CalculateContentRootFolder, true);
    }

    protected override IWebHostBuilder CreateWebHostBuilder()
    {
        return base
            .CreateWebHostBuilder()
            .UseContentRoot(ContentRootFolder.Value)
            .UseSetting(WebHostDefaults.ApplicationKey, typeof(HealthAppointmentSystemWebMvcModule).Assembly.FullName);
    }

    #region Get response

    protected async Task<T> GetResponseAsObjectAsync<T>(string url,
        HttpStatusCode expectedStatusCode = HttpStatusCode.OK)
    {
        var strResponse = await GetResponseAsStringAsync(url, expectedStatusCode);
        return JsonSerializer.Deserialize<T>(strResponse, new JsonSerializerOptions()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });
    }

    protected async Task<string> GetResponseAsStringAsync(string url,
        HttpStatusCode expectedStatusCode = HttpStatusCode.OK)
    {
        var response = await GetResponseAsync(url, expectedStatusCode);
        return await response.Content.ReadAsStringAsync();
    }

    protected async Task<HttpResponseMessage> GetResponseAsync(string url,
        HttpStatusCode expectedStatusCode = HttpStatusCode.OK)
    {
        var response = await Client.GetAsync(url);
        response.StatusCode.ShouldBe(expectedStatusCode);
        return response;
    }

    #endregion

    #region Authenticate

    /// <summary>
    /// /api/TokenAuth/Authenticate
    /// TokenAuthController
    /// </summary>
    /// <param name="tenancyName"></param>
    /// <param name="input"></param>
    /// <returns></returns>
    protected async Task AuthenticateAsync(string tenancyName, AuthenticateModel input)
    {
        if (tenancyName.IsNullOrWhiteSpace())
        {
            var tenant = UsingDbContext(context => context.Tenants.FirstOrDefault(t => t.TenancyName == tenancyName));
            if (tenant != null)
            {
                AbpSession.TenantId = tenant.Id;
                Client.DefaultRequestHeaders.Add("Abp-TenantId", tenant.Id.ToString());  //Set TenantId
            }
        }

        var response = await Client.PostAsync("/api/TokenAuth/Authenticate",
            new StringContent(input.ToJsonString(), Encoding.UTF8, "application/json"));
        response.StatusCode.ShouldBe(HttpStatusCode.OK);
        var result = JsonSerializer.Deserialize<AjaxResponse<AuthenticateResultModel>>(await response.Content.ReadAsStringAsync(), new JsonSerializerOptions()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });
        Client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", result.Result.AccessToken);

        AbpSession.UserId = result.Result.UserId;
    }

    #endregion

    #region Login

    protected void LoginAsHostAdmin()
    {
        LoginAsHost(AbpUserBase.AdminUserName);
    }

    protected void LoginAsDefaultTenantAdmin()
    {
        LoginAsTenant(AbpTenantBase.DefaultTenantName, AbpUserBase.AdminUserName);
    }

    protected void LoginAsHost(string userName)
    {
        AbpSession.TenantId = null;

        var user =
            UsingDbContext(
                context =>
                    context.Users.FirstOrDefault(u => u.TenantId == AbpSession.TenantId && u.UserName == userName));
        if (user == null)
        {
            throw new Exception("There is no user: " + userName + " for host.");
        }

        AbpSession.UserId = user.Id;
    }

    protected void LoginAsTenant(string tenancyName, string userName)
    {
        var tenant = UsingDbContext(context => context.Tenants.FirstOrDefault(t => t.TenancyName == tenancyName));
        if (tenant == null)
        {
            throw new Exception("There is no tenant: " + tenancyName);
        }

        AbpSession.TenantId = tenant.Id;

        var user =
            UsingDbContext(
                context =>
                    context.Users.FirstOrDefault(u => u.TenantId == AbpSession.TenantId && u.UserName == userName));
        if (user == null)
        {
            throw new Exception("There is no user: " + userName + " for tenant: " + tenancyName);
        }

        AbpSession.UserId = user.Id;
    }

    #endregion

    #region UsingDbContext

    protected void UsingDbContext(Action<HealthAppointmentSystemDbContext> action)
    {
        using (var context = IocManager.Resolve<HealthAppointmentSystemDbContext>())
        {
            action(context);
            context.SaveChanges();
        }
    }

    protected T UsingDbContext<T>(Func<HealthAppointmentSystemDbContext, T> func)
    {
        T result;

        using (var context = IocManager.Resolve<HealthAppointmentSystemDbContext>())
        {
            result = func(context);
            context.SaveChanges();
        }

        return result;
    }

    protected async Task UsingDbContextAsync(Func<HealthAppointmentSystemDbContext, Task> action)
    {
        using (var context = IocManager.Resolve<HealthAppointmentSystemDbContext>())
        {
            await action(context);
            await context.SaveChangesAsync(true);
        }
    }

    protected async Task<T> UsingDbContextAsync<T>(Func<HealthAppointmentSystemDbContext, Task<T>> func)
    {
        T result;

        using (var context = IocManager.Resolve<HealthAppointmentSystemDbContext>())
        {
            result = await func(context);
            await context.SaveChangesAsync(true);
        }

        return result;
    }

    #endregion

    #region ParseHtml

    protected IHtmlDocument ParseHtml(string htmlString)
    {
        return new HtmlParser().ParseDocument(htmlString);
    }

    #endregion
}
