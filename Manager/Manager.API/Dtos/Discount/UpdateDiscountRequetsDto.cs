namespace Manager.API.Dtos.Discount
{
    public class UpdateDiscountRequetsDto
    {
        public string Name { get; set; }
        public string DiscountType { get; set; }
        public float DiscountValue { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public bool IsActive { get; set; }
    }
}
