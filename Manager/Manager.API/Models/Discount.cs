namespace Manager.API.Models
{
    public class Discount
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string DiscountType { get; set; }
        public float DiscountValue { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; } = DateTime.Now;
    }
}
