using System.Text.Json;

namespace API.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response, int currentPage, int itemsPerPage, int totalItems, int totalPages)
        {
            var paginationHeader = new
            {
                currentPage = currentPage,
                itemsPerPage = itemsPerPage,
                totalItems = totalItems,
                totalPages = totalPages
            };

            response.Headers.Add("Pagination", JsonSerializer.Serialize(paginationHeader));
        }
    }
}